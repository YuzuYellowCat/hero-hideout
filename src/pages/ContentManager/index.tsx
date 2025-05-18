import React from "react";
import PageWrapper from "components/PageWrapper";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
    operation: HTMLSelectElement;
    upload?: HTMLInputElement;
    imageId?: HTMLInputElement;
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

            const isPost = elements.operation.selectedIndex === 1;
            const file = elements.upload?.files?.[0];
            if (!file && isPost) {
                return;
            }

            const body = isPost ? file : undefined;
            const test = await fetch(
                `${process.env.REACT_APP_ENDPOINT}/api/posts`,
                {
                    method: isPost ? "POST" : "GET",
                    headers: {
                        Authorization: `Basic ${authString}`,
                    },
                    body,
                }
            );

            const testJson = await test.json();

            console.log(testJson);
        },
        []
    );

    const [operation, setOperation] = React.useState<"GET" | "POST">("GET");

    const content =
        operation === "GET" ? (
            <>
                <label htmlFor="imageId">Image ID:</label>
                <input type="input" name="imageId" id="imageId" />
            </>
        ) : (
            <>
                <label htmlFor="upload">Upload Image</label>
                <input type="file" id="upload" accept="image/*" />
            </>
        );

    return (
        <PageWrapper
            color="#ffffff"
            title="404 - Not Found"
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
                    <label htmlFor="operation">Operation</label>
                    <select
                        id="operation"
                        name="operation"
                        size={2}
                        onChange={(e) => {
                            const operation =
                                e.currentTarget.options[
                                    e.currentTarget.selectedIndex
                                ].text;
                            setOperation(operation as "GET" | "POST");
                        }}
                    >
                        <option value="get">GET</option>
                        <option value="post">POST</option>
                    </select>
                    <br />
                    {content}
                    <br />
                    <input type="submit" value="Do something" />
                </form>
            </div>
        </PageWrapper>
    );
};

export default ContentManager;
