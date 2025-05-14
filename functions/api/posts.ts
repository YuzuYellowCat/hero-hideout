import { jsonResponse } from "../utils/jsonResponse";

export const onRequest: PagesFunction<{
    POSTS: R2Bucket;
    AUTH: string;
}> = async ({ request, env }) => {
    if (request.method === "GET") {
        const authSecret = await env.AUTH;
        const requestAuth = request.headers.get("Authorization")?.split(" ")[1];
        if (authSecret !== requestAuth) {
            return jsonResponse({
                error: 404,
                message: "Auth not valid",
            });
        }
        const test = await env.POSTS.list();
        return jsonResponse(test.objects);
    }
    return jsonResponse({});
};
