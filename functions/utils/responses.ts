import { env } from "cloudflare:workers";

export const optionsResponse = (
    allowedMethods = "GET,HEAD,OPTIONS,POST,PUT"
) => {
    const res = defaultResponse(undefined, { status: 204 });
    res.headers.set("Connection", "keep-alive");
    res.headers.set("Access-Control-Allow-Methods", allowedMethods);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    res.headers.set("Access-Control-Max-Age", "86400");
    return res;
};

export const defaultResponse = (value: any, init: ResponseInit = {}) => {
    const res = new Response(value, init);
    res.headers.set("Access-Control-Allow-Origin", (env as Env).ALLOWED_ORIGIN);

    return res;
};

/**
 * Error Responses
 */

export const genericErrorResponse = () => {
    return defaultResponse(
        "The application has encountered an unknown error.",
        { status: 400 }
    );
};

export const authErrorResponse = () => {
    return defaultResponse("Unauthorized", { status: 401 });
};

export const notFoundResponse = () => {
    return defaultResponse("Not Found", { status: 404 });
};

export const invalidInputResponse = () => {
    return defaultResponse("Invalid Input", { status: 422 });
};

export const jsonResponse = (value: any, init: ResponseInit = {}) => {
    return defaultResponse(JSON.stringify(value), {
        headers: {
            "Content-Type": "application/json",
            ...init.headers,
        },
        ...init,
    });
};
