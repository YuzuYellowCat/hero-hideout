import { jsonResponse } from "../../utils/responses";

export const onRequest: PagesFunction<Env> = async ({
    request,
    env,
    params,
}) => {
    if (request.method === "GET") {
        if (!params.credit || Array.isArray(params)) {
            return jsonResponse({});
        }

        const { results } = await env.DB.prepare(
            "SELECT * FROM Credits INNER JOIN CreditLinks ON Credits.CreditId = CreditLinks.CreditId WHERE Credits.CreditId = ?"
        )
            .bind(params.credit)
            .all();

        const returnValue: CreditsPOST = {
            name: results.at(0).name as string,
            links: results.map((result) => ({
                type: result.Type,
                url: result.Link,
            })) as CreditLink[],
        };

        return jsonResponse(returnValue);
    }
    return jsonResponse({});
};
