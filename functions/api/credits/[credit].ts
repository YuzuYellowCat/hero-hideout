import { genericErrorResponse, jsonResponse } from "../../utils/responses";
import { convertDBBoolToBool } from "../../utils/types";

export const onRequest: PagesFunction<Env> = async ({
    request,
    env,
    params,
}) => {
    if (request.method === "GET") {
        if (!params.credit || Array.isArray(params)) {
            return jsonResponse({});
        }

        try {
            const [{ results }, { results: characterResults }] =
                await Promise.all([
                    env.DB.prepare(
                        "SELECT * FROM Credits INNER JOIN CreditLinks ON Credits.CreditId = CreditLinks.CreditId WHERE Credits.CreditId = ?"
                    )
                        .bind(params.credit)
                        .all(),
                    env.DB.prepare(
                        "SELECT * FROM Characters WHERE CreditId = ?"
                    )
                        .bind(params.credit)
                        .all(),
                ]);

            const links = {};
            results.forEach((result) => {
                links[result.Type as string] = result.Url;
            });

            const returnValue: Credit = {
                creditId: results.at(0).CreditId as string,
                name: results.at(0).Name as string,
                color: results.at(0).Color as string,
                links,
                characters: characterResults.map(
                    (character) =>
                        ({
                            characterId: character.CharacterId,
                            name: character.Name,
                            color: character.Color,
                            isGuest: convertDBBoolToBool(
                                character.IsGuest as 0 | 1
                            ),
                        } as Character)
                ),
            };

            return jsonResponse(returnValue);
        } catch (e) {
            console.error(e);
            return genericErrorResponse();
        }
    }
    return jsonResponse({});
};
