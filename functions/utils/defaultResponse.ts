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
