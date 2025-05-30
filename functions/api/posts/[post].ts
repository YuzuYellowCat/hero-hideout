import { genericErrorResponse, jsonResponse } from "../../utils/responses";

export const onRequest: PagesFunction<Env> = async ({
    request,
    env,
    params,
}) => {
    if (request.method === "GET") {
        if (!params.post || Array.isArray(params)) {
            return jsonResponse({});
        }

        try {
            const [
                { results: postResults },
                { results: creditResults },
                { results: characterResults },
            ] = await Promise.all([
                await env.DB.prepare(
                    "SELECT * FROM Posts INNER JOIN PostImages ON Posts.PostId = PostImages.PostId WHERE Posts.PostId = ?"
                )
                    .bind(params.post)
                    .all(),
                await env.DB.prepare(
                    "SELECT * FROM PostCredits INNER JOIN Credits ON PostCredits.CreditId = Credits.CreditId WHERE PostCredits.PostId = ?"
                )
                    .bind(params.post)
                    .all(),
                await env.DB.prepare(
                    "SELECT * FROM PostCharacters INNER JOIN Characters ON PostCharacters.CharacterId = Characters.CharacterId WHERE PostCharacters.PostId = ?"
                )
                    .bind(params.post)
                    .all(),
            ]);
            console.log(postResults, creditResults, characterResults);
            return jsonResponse({});
        } catch (e) {
            return genericErrorResponse();
        }
    }
    return jsonResponse({});
};
