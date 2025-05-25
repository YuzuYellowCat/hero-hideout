import { jsonResponse, optionsResponse } from "../utils/responses";
import { authWrapper } from "../utils/wrappers";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    if (request.method === "OPTIONS") {
        return optionsResponse();
    }

    if (request.method === "GET") {
        const { results } = await env.DB.prepare(
            "SELECT * FROM Credits INNER JOIN CreditLinks ON Credits.CreditId = CreditLinks.CreditId"
        ).all();
        return jsonResponse(results);
    }

    if (request.method === "POST") {
        authWrapper({ secret: env.AUTH, request }, async () => {
            const { name, links } = (await request.json()) as CreditsPOST;

            const [{ results }] = await Promise.all([
                env.DB.prepare(
                    "INSERT INTO Credits (Name) VALUES (s?) RETURNING CreditId"
                )
                    .bind(name)
                    .all(),
            ]);

            const creditId = results[0].CreditId;

            for (const link of links) {
                await env.DB.prepare(
                    "INSERT OR REPLACE INTO CreditLinks (CreditId, Type, Link) VALUES (?, ?, ?)"
                )
                    .bind(creditId, link.type, link.url)
                    .all();
            }

            return jsonResponse({});
        });
    }

    return jsonResponse({});
};
