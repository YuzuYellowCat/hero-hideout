import React from "react";
import PageWrapper from "components/PageWrapper";
import Posts from "./Posts";
import Characters from "./Characters";
import "./index.css";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
    upload?: HTMLInputElement;
    name?: HTMLInputElement;
    description?: HTMLTextAreaElement;
    characterId?: HTMLInputElement;
    color?: HTMLInputElement;
    isNSFW?: HTMLInputElement;
    isGuest?: HTMLInputElement;
}
interface PostFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

type Endpoints = "Posts" | "Characters";

const EndpointContent: {
    [key in Endpoints]: React.FC;
} = {
    Posts,
    Characters,
};

const ContentManager: React.FC = () => {
    const [endpoint, setEndpoint] = React.useState<Endpoints>("Posts");
    const onSubmit: React.FormEventHandler<PostFormElement> = React.useCallback(
        async (event) => {
            event.preventDefault();
            const elements = event.currentTarget.elements;
            const authString = btoa(
                `${elements.username.value}:${elements.password.value}`
            );

            const body = new FormData();

            elements.upload?.files &&
                body.set("file", elements.upload?.files?.[0]);
            elements.name && body.set("name", elements.name.value);
            elements.description &&
                body.set("description", elements.description.value);
            elements.isNSFW &&
                body.set(
                    "isNSFW",
                    (elements.isNSFW.checked ?? false).toString()
                );
            elements.isGuest &&
                body.set(
                    "isGuest",
                    (elements.isGuest.checked ?? false).toString()
                );
            elements.characterId &&
                body.set("characterId", elements.characterId.value);

            elements.color && body.set("color", elements.color.value);

            await fetch(
                `${
                    process.env.REACT_APP_ENDPOINT
                }/api/${endpoint.toLowerCase()}/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${authString}`,
                    },
                    body,
                }
            );
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
                    <label htmlFor="username">
                        Username:
                        <input
                            type="input"
                            name="username"
                            id="username"
                            required
                        />
                    </label>
                    <br />
                    <label htmlFor="username">
                        Password:
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </label>
                    <br />
                    <label htmlFor="endpoint">
                        Endpoint:
                        <select
                            name="endpoint"
                            id="endpoint"
                            onChange={onChange}
                        >
                            <option value="Posts">Posts</option>
                            <option value="Characters">Characters</option>
                        </select>
                    </label>
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
