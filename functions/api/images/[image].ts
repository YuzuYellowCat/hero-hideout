import { defaultResponse } from "../../utils/defaultResponse";
import { jsonResponse } from "../../utils/jsonResponse";
import { isAuthorized } from "../../utils/checkAuth";

export const onRequest: PagesFunction<{
    POSTS: R2Bucket;
    AUTH: string;
}> = async ({ request, env, params }) => {
    if (request.method === "GET") {
        if (!params.image || Array.isArray(params)) {
            return jsonResponse({});
        }
        const test = await env.POSTS.get(params.image as string);
        console.log(await env.POSTS.list());
        if (!test) {
            return jsonResponse({});
        }
        return defaultResponse(test.body, {
            headers: {
                "Content-Type": "image/*",
            },
        });
    }
    if (request.method === "POST") {
        if (!isAuthorized({ secret: env.AUTH, request })) {
            return new Response("Unauthorized", { status: 401 });
        }
        const blob = await request.blob();
        await env.POSTS.put(params.image as string, blob);
        return jsonResponse({ message: "Did it!" });
    }
    return jsonResponse({});
};
