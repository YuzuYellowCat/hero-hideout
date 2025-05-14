import {
    PagesFunction,
    R2Bucket,
    SecretsStoreSecret,
} from "@cloudflare/workers-types";
import { jsonResponse } from "../utils/jsonResponse";

export const onRequestGet: PagesFunction<{
    POSTS: R2Bucket;
    AUTH: SecretsStoreSecret;
}> = async ({ request, env }) => {
    const authSecret = await env.AUTH.get();
    const requestAuth = request.headers.get("Authorization")?.split(" ")[1];
    if (authSecret !== requestAuth) {
        return jsonResponse({
            error: 404,
            message: "Auth not valid",
        });
    }
    const test = await env.POSTS.list();
    return jsonResponse(test.objects);
};
