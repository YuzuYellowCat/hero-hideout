import { genericErrorResponse, jsonResponse } from "../../utils/responses";
import { convertDBBoolToBool } from "../../utils/types";

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
                {
                    results: [postResult],
                },
                { results: imageResults },
                { results: creditResults },
                { results: characterResults },
            ] = await Promise.all([
                await env.DB.prepare(
                    "SELECT * FROM Posts WHERE Posts.PostId = ?"
                )
                    .bind(params.post)
                    .all(),
                await env.DB.prepare(
                    "SELECT * FROM PostImages WHERE PostImages.PostId = ?"
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

            return jsonResponse({
                ...postResult,
                IsNSFW: convertDBBoolToBool(postResult.IsNSFW),
                images: imageResults.map(
                    (imageResult) =>
                        ({
                            image: imageResult.ImageName,
                            postId: imageResult.PostId,
                            altText: imageResult.AltText,
                            isCover: convertDBBoolToBool(
                                imageResult.IsCover as 0 | 1
                            ),
                        } as PostImage)
                ),
                credits: creditResults.map(
                    (credit) =>
                        ({
                            creditId: credit.CreditId,
                            name: credit.Name,
                            contribution: credit.Contribution,
                        } as PostCredit)
                ),
                characters: characterResults.map(
                    (character) =>
                        ({
                            characterId: character.CharacterId,
                            name: character.Name,
                            color: character.Color,
                            image: character.ImageName,
                            isGuest: convertDBBoolToBool(
                                character.IsGuest as 0 | 1
                            ),
                        } as Character)
                ),
            });
        } catch (e) {
            return genericErrorResponse();
        }
    }
    return jsonResponse({});
};
