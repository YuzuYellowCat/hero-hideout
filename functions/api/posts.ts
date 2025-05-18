import { jsonResponse } from "../utils/jsonResponse";

export const onRequest: PagesFunction<{
    POSTS: R2Bucket;
    AUTH: string;
}> = async ({ request, env }) => {
    const authSecret = env.AUTH;
    const requestAuth = request.headers.get("Authorization")?.split(" ")[1];
    if (authSecret !== requestAuth) {
        return jsonResponse({
            error: 404,
            message: "Auth not valid",
        });
    }
    if (request.method === "GET") {
        console.log("GET");
        const test = await env.POSTS.get("test-file.png");
        return jsonResponse(test);
    }
    if (request.method === "POST") {
        const body = request.body;
        const put = env.POSTS.put("test-file.png", body);
        return jsonResponse(put);
    }
    return jsonResponse({});
};
