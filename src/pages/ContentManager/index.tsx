import React from "react";
import PageWrapper from "components/PageWrapper";
import { Posts, Characters, Credits } from "./EndpointForms";
import "./index.css";
import fetch from "utils/fetch";
import { PasswordInput, Select, TextInput } from "./BaseComponents";

const Endpoints = ["Posts", "Characters", "Credits"] as const;

type EndpointsType = (typeof Endpoints)[number];

const EndpointContent: {
    [key in EndpointsType]: React.FC;
} = {
    Posts,
    Characters,
    Credits,
};

const ELEMENT_PARSERS = {
    FILE: (
        elements: FormElementsType,
        key: string,
        body: { [key: string]: unknown }
    ) => {
        const formElement = elements[key];
        if (!formElement || !(formElement instanceof HTMLInputElement)) {
            return body;
        }
        if (!formElement.files?.length) {
            return body;
        }
        body[key] = formElement?.files?.[0];
        return body;
    },
    STRING: (
        elements: FormElementsType,
        key: string,
        body: { [key: string]: unknown }
    ) => {
        const formElement = elements[key];
        if (!formElement?.value) {
            return body;
        }
        body[key] = formElement.value;
        return body;
    },
    DATE_STRING: (
        elements: FormElementsType,
        key: string,
        body: { [key: string]: unknown }
    ) => {
        const formElement = elements[key];
        if (!formElement?.value || !(formElement instanceof HTMLInputElement)) {
            return body;
        }
        body[key] = Math.floor(Date.parse(formElement.value) / 1000);
        return body;
    },
    BOOLEAN: (
        elements: FormElementsType,
        key: string,
        body: { [key: string]: unknown }
    ) => {
        const formElement = elements[key];
        if (!formElement || !(formElement instanceof HTMLInputElement)) {
            return body;
        }
        body[key] = formElement.checked ?? false;
        return body;
    },
    SELECT: (
        elements: FormElementsType,
        key: string,
        body: { [key: string]: unknown }
    ) => {
        const formElement = elements[key];
        if (!formElement?.value) {
            return body;
        }
        body[key] = formElement.value;
        return body;
    },
    MAP: (
        elements: FormElementsType,
        key: string,
        body: { [key: string]: unknown }
    ) => {
        let obj: { [key: string]: unknown } = {};
        for (let i = 0; i < 999; i++) {
            const keyElement = elements[`${key}-key-${i}`];
            const valueElement = elements[`${key}-value-${i}`];
            if (!keyElement?.value || !valueElement?.value) {
                break;
            }
            obj[keyElement.value] = valueElement.value;
        }
        if (Object.keys(obj).length > 0) {
            body[key] = obj;
        }
        return body;
    },
    ARRAY: (
        elements: FormElementsType,
        key: string,
        body: { [key: string]: unknown }
    ) => {
        const arr: string[] = [];
        for (let i = 0; i < 999; i++) {
            const arrElement = elements[`${key}-${i}`];
            if (!arrElement?.value) {
                break;
            }
            arr.push(arrElement.value);
        }
        if (arr.length > 0) {
            body[key] = arr;
        }
        return body;
    },
};

type ElementParserType = (
    elements: FormElementsType,
    key: string,
    body: { [key: string]: unknown }
) => { [key: string]: unknown };

type HTMLElementType =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | undefined;

const _parseFormElement = (
    elements: FormElementsType,
    key: string,
    body: { [key: string]: unknown }
) => {
    return FORM_ELEMENTS[key](elements, key, body);
};

type FormElementsType = HTMLFormControlsCollection & {
    [key: string]: HTMLElementType;
};

const FORM_ELEMENTS: {
    [key: string]: ElementParserType;
} = {
    file: ELEMENT_PARSERS.FILE,
    postId: ELEMENT_PARSERS.STRING,
    title: ELEMENT_PARSERS.STRING,
    date: ELEMENT_PARSERS.DATE_STRING,
    description: ELEMENT_PARSERS.STRING,
    tags: ELEMENT_PARSERS.STRING,
    type: ELEMENT_PARSERS.SELECT,
    isNSFW: ELEMENT_PARSERS.BOOLEAN,
    characterId: ELEMENT_PARSERS.STRING,
    color: ELEMENT_PARSERS.STRING,
    isGuest: ELEMENT_PARSERS.BOOLEAN,
    creditId: ELEMENT_PARSERS.STRING,
    name: ELEMENT_PARSERS.STRING,
    links: ELEMENT_PARSERS.MAP,
    characterIds: ELEMENT_PARSERS.ARRAY,
    credits: ELEMENT_PARSERS.MAP,
    altText: ELEMENT_PARSERS.STRING,
    createCharacter: ELEMENT_PARSERS.BOOLEAN,
    characterName: ELEMENT_PARSERS.STRING,
};

const ContentManager: React.FC = () => {
    const [endpoint, setEndpoint] = React.useState<EndpointsType>("Posts");
    const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
        async (event) => {
            event.preventDefault();
            const elements = event.currentTarget.elements as FormElementsType;
            const authString = btoa(
                `${elements.username?.value}:${elements.password?.value}`
            );

            let bodyObj = {};
            let form = null;

            try {
                for (const name of Object.keys(FORM_ELEMENTS)) {
                    bodyObj = _parseFormElement(elements, name, bodyObj);
                }

                if (endpoint === "Posts" || endpoint === "Characters") {
                    form = new FormData();
                    for (const [key, value] of Object.entries(bodyObj)) {
                        if (value instanceof File) {
                            form.set(key, value);
                        } else if (
                            typeof value === "object" ||
                            value instanceof Array
                        ) {
                            form.set(key, JSON.stringify(value));
                        } else {
                            if (value === undefined || value === null) {
                                continue;
                            }
                            form.set(key, value?.toString?.() ?? value);
                        }
                    }
                }

                // UNCOMMENT BELOW LINE TO SEE BODY W/O POSTING
                // console.log(
                //     bodyObj,
                //     form && Object.fromEntries(form.entries())
                // );

                await fetch(`/${endpoint.toLowerCase()}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${authString}`,
                    },
                    body: form ?? JSON.stringify(bodyObj),
                });
            } catch (e) {
                console.error(e);
            }
        },
        [endpoint]
    );

    const onChange: React.ChangeEventHandler<HTMLSelectElement> =
        React.useCallback((e) => {
            setEndpoint(e.target.value as EndpointsType);
        }, []);

    const Content = EndpointContent[endpoint];

    return (
        <PageWrapper
            color="#ffffff"
            title="Content Manager"
            alignItems="center"
        >
            <div className="content-manager-wrapper">
                <form onSubmit={onSubmit}>
                    <TextInput name="username" required />
                    <br />
                    <PasswordInput name="password" required />
                    <br />
                    <Select
                        name="endpoint"
                        onChange={onChange}
                        options={Endpoints}
                        required
                    />
                    <br />
                    ---
                    <br />
                    <Content />
                    <br />
                    ---
                    <br />
                    <input type="submit" value="Post" />
                </form>
            </div>
        </PageWrapper>
    );
};

export default ContentManager;
