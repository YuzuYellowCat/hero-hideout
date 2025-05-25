import { jsonResponse } from "../../utils/responses";

export const onRequest: PagesFunction<Env> = async ({
    request,
    env,
    params,
}) => {
    if (request.method === "GET") {
        if (!params.post || Array.isArray(params)) {
            return jsonResponse({});
        }

        const { results } = await env.DB.prepare(
            "SELECT * FROM Posts INNER JOIN PostImages ON Posts.PostId = PostImages.PostId WHERE Posts.PostId = ?"
        )
            .bind(params.post)
            .all();
        return jsonResponse(results);
    }
    return jsonResponse({});
};
