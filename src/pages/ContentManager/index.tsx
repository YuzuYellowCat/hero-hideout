import React from "react";
import PageWrapper from "components/PageWrapper";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}
interface PostFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

const ContentManager: React.FC = () => {
    const onSubmit: React.FormEventHandler<PostFormElement> = React.useCallback(
        async (event) => {
            event.preventDefault();
            const elements = event.currentTarget.elements;
            const authString = btoa(
                `${elements.username.value}:${elements.password.value}`
            );
            const test = await fetch(
                `${process.env.REACT_APP_ENDPOINT}/api/posts`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${authString}`,
                    },
                }
            );
        },
        []
    );

    return (
        <PageWrapper
            color="#ffffff"
            title="404 - Not Found"
            alignItems="center"
        >
            <div className="content-manager-wrapper">
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Auth:</label>
                    <input
                        type="input"
                        name="username"
                        id="username"
                        required
                    />
                    <label htmlFor="username">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                    <input type="submit" value="Do something" />
                </form>
            </div>
        </PageWrapper>
    );
};

export default ContentManager;
