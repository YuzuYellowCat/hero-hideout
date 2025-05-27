import React from "react";
import PageWrapper from "components/PageWrapper";
import { Posts, Characters } from "./EndpointForms";
import "./index.css";
import fetch from "utils/fetch";
import { PasswordInput, Select, TextInput } from "./BaseComponents";

type Endpoints = "Posts" | "Characters";

const EndpointContent: {
    [key in Endpoints]: React.FC;
} = {
    Posts,
    Characters,
};

const ELEMENT_PARSER = {
    FILE: "FILE",
    STRING: "STRING",
    DATE_STRING: "DATE_STRING",
    BOOLEAN: "BOOLEAN",
    SELECT: "SELECT",
};

type ElementParserType = (typeof ELEMENT_PARSER)[keyof typeof ELEMENT_PARSER];
type HTMLElementType =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | undefined;

const _parseFormElement = (
    element: HTMLElementType,
    key: string,
    form: FormData,
    parser: ElementParserType = ELEMENT_PARSER.STRING
) => {
    if (!element) {
        return;
    }
    switch (parser) {
        case ELEMENT_PARSER.FILE:
            if (!(element instanceof HTMLInputElement)) {
                return;
            }
            element.files &&
                element?.files.length &&
                form.set(key, element?.files?.[0]);
            break;
        case ELEMENT_PARSER.BOOLEAN:
            if (!(element instanceof HTMLInputElement)) {
                return;
            }
            form.set(key, (element.checked ?? false).toString());
            break;
        case ELEMENT_PARSER.DATE_STRING:
            if (!(element instanceof HTMLInputElement)) {
                return;
            }
            element.value &&
                form.set(
                    key,
                    Math.floor(Date.parse(element.value) / 1000).toString()
                );
            break;
        default:
            element.value && form.set(key, element.value);
            break;
    }
};

type FormElementsType = HTMLFormControlsCollection & {
    [key: string]: HTMLElementType;
};

const FORM_ELEMENTS: {
    [key: string]: ElementParserType;
} = {
    file: ELEMENT_PARSER.FILE,
    postId: ELEMENT_PARSER.STRING,
    title: ELEMENT_PARSER.STRING,
    date: ELEMENT_PARSER.DATE_STRING,
    description: ELEMENT_PARSER.STRING,
    tags: ELEMENT_PARSER.STRING,
    type: ELEMENT_PARSER.SELECT,
    isNSFW: ELEMENT_PARSER.BOOLEAN,
    characterId: ELEMENT_PARSER.STRING,
    color: ELEMENT_PARSER.STRING,
    isGuest: ELEMENT_PARSER.BOOLEAN,
};

const ContentManager: React.FC = () => {
    const [endpoint, setEndpoint] = React.useState<Endpoints>("Posts");
    const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
        async (event) => {
            event.preventDefault();
            const elements = event.currentTarget.elements as FormElementsType;
            const authString = btoa(
                `${elements.username?.value}:${elements.password?.value}`
            );

            const body = new FormData();

            try {
                for (const [name, parser] of Object.entries(FORM_ELEMENTS)) {
                    _parseFormElement(elements[name], name, body, parser);
                }
                // UNCOMMENT BELOW LINE TO SEE FORM W/O POSTING
                // console.log(Array.from(body.entries()));

                await fetch(`/${endpoint.toLowerCase()}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${authString}`,
                    },
                    body,
                });
            } catch (e) {
                console.error(e);
            }
        },
        [endpoint]
    );

    const onChange: React.ChangeEventHandler<HTMLSelectElement> =
        React.useCallback((e) => {
            setEndpoint(e.target.value as Endpoints);
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
                        options={["Posts", "Characters"]}
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
