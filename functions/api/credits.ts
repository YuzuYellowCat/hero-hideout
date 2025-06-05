import { insertDbList } from "../utils/db";
import {
    genericErrorResponse,
    jsonResponse,
    optionsResponse,
} from "../utils/responses";
import { authWrapper } from "../utils/wrappers";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    if (request.method === "OPTIONS") {
        return optionsResponse();
    }

    if (request.method === "GET") {
        try {
            const { results } = await env.DB.prepare(
                "SELECT * FROM Credits INNER JOIN CreditLinks ON Credits.CreditId = CreditLinks.CreditId"
            ).all();
            let body = {};
            results.forEach(
                (result: {
                    CreditId: string;
                    Name: string;
                    Type: string;
                    Url: string;
                    Color: string;
                }) => {
                    if (!body[result.CreditId]) {
                        body[result.CreditId] = {
                            creditId: result.CreditId,
                            name: result.Name,
                            links: {
                                [result.Type]: result.Url,
                            },
                            color: result.Color,
                        } as Credit;
                    } else {
                        body[result.CreditId].links[result.Type] = result.Url;
                    }
                }
            );
            return jsonResponse(Object.values(body));
        } catch (e) {
            return genericErrorResponse();
        }
    }

    if (request.method === "POST") {
        return authWrapper({ secret: env.AUTH, request }, async () => {
            try {
                const {
                    creditId,
                    name,
                    color,
                    links,
                    createCharacter,
                    characterName,
                } = (await request.json()) as CreditPOST;

                await env.DB.prepare(
                    "INSERT OR REPLACE INTO Credits (CreditId, Name, Color) VALUES (?, ?, ?)"
                )
                    .bind(creditId, name, color)
                    .all();

                const linksPost = insertDbList(
                    "INSERT OR REPLACE INTO CreditLinks (CreditId, Type, Url) VALUES",
                    Object.entries(links),
                    ([type, url]) => [creditId, type, url]
                );

                await env.DB.prepare(linksPost.sql)
                    .bind(...linksPost.params)
                    .all();

                if (createCharacter) {
                    await env.DB.prepare(
                        "INSERT INTO Characters (CharacterId, Name, Color, CreditId, IsGuest) VALUES (?, ?, ?, ?, 1)"
                    )
                        .bind(creditId, characterName ?? name, color, creditId)
                        .all();
                }
                return jsonResponse({});
            } catch (e) {
                console.error(e);
                return genericErrorResponse();
            }
        });
    }

    return jsonResponse({});
};
