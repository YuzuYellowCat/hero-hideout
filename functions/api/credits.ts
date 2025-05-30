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
                }) => {
                    if (!body[result.CreditId]) {
                        body[result.CreditId] = {
                            creditId: result.CreditId,
                            name: result.Name,
                            links: {
                                [result.Type]: result.Url,
                            },
                        };
                    } else {
                        body[result.CreditId].links[result.Type] = result.Url;
                    }
                }
            );
            return jsonResponse(body);
        } catch (e) {
            return genericErrorResponse();
        }
    }

    if (request.method === "POST") {
        return authWrapper({ secret: env.AUTH, request }, async () => {
            const { creditId, name, links } =
                (await request.json()) as CreditsPOST;

            await env.DB.prepare(
                "INSERT INTO Credits (CreditId, Name) VALUES (?, ?)"
            )
                .bind(creditId, name)
                .all()
                .catch((e) => console.error(e));

            await Promise.all(
                Object.entries(links).map(([type, url]) =>
                    env.DB.prepare(
                        "INSERT OR REPLACE INTO CreditLinks (CreditId, Type, Url) VALUES (?, ?, ?)"
                    )
                        .bind(creditId, type, url)
                        .all()
                        .catch((e) => console.error(e))
                )
            );

            return jsonResponse({});
        });
    }

    return jsonResponse({});
};
