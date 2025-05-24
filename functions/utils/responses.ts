export const authErrorResponse = () => {
    return defaultResponse("Unauthorized", { status: 401 });
};

export const invalidInputResponse = () => {
    return defaultResponse("Invalid Input", { status: 422 });
};

export const genericErrorResponse = () => {
    return defaultResponse(
        "The application has encountered an unknown error.",
        { status: 400 }
    );
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

export const defaultResponse = (value: any, init: ResponseInit = {}) => {
    const res = new Response(value, init);
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT"
    );
    res.headers.set(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    return res;
};
