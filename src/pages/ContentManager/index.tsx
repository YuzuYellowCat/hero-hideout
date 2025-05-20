import React from "react";
import PageWrapper from "components/PageWrapper";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
    upload: HTMLInputElement;
    name: HTMLInputElement;
    description?: HTMLTextAreaElement;
    isNSFW: HTMLInputElement;
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

            const body = new FormData();

            const file = elements.upload?.files?.[0];
            if (!file) {
                return;
            }

            body.set("file", file);
            body.set("name", elements.name.value);
            body.set("description", elements.description?.value ?? "");
            body.set("isNSFW", (elements.isNSFW.checked ?? false).toString());

            await fetch(`${process.env.REACT_APP_ENDPOINT}/api/posts/`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authString}`,
                },
                body,
            });
        },
        []
    );

    return (
        <PageWrapper
            color="#ffffff"
            title="Content Manager"
            alignItems="center"
        >
            <div className="content-manager-wrapper">
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="input"
                        name="username"
                        id="username"
                        required
                    />
                    <br />
                    <label htmlFor="username">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                    <br />
                    -
                    <br />
                    <label htmlFor="upload">Upload Image</label>
                    <input type="file" id="upload" accept="image/*" required />
                    <br />
                    <label htmlFor="name">Name</label>
                    <input type="input" name="name" id="name" required />
                    <br />
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" />
                    <br />
                    <label htmlFor="isNSFW">isNSFW</label>
                    <input type="checkbox" name="isNSFW" id="isNSFW" />
                    <br />
                    <input type="submit" value="Do something" />
                </form>
            </div>
        </PageWrapper>
    );
};

export default ContentManager;
