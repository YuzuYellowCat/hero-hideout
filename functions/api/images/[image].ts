import {
    jsonResponse,
    defaultResponse,
    notFoundResponse,
} from "../../utils/responses";

export const onRequest: PagesFunction<Env> = async ({
    request,
    env,
    params,
}) => {
    if (request.method === "GET") {
        if (!params.image || Array.isArray(params)) {
            return jsonResponse({});
        }
        const test = await env.IMAGES.get(params.image as string);
        if (!test) {
            return notFoundResponse();
        }
        return defaultResponse(test.body, {
            headers: {
                "Content-Type": "image/*",
            },
        });
    }
    return jsonResponse({});
};
