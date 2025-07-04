import { insertDbList } from "../utils/db";
import {
    jsonResponse,
    invalidInputResponse,
    optionsResponse,
    genericErrorResponse,
} from "../utils/responses";
import { formDataValidator, Forms } from "../utils/validate";
import { authWrapper } from "../utils/wrappers";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    if (request.method === "OPTIONS") {
        return optionsResponse();
    }

    if (request.method === "GET") {
        const { results } = await env.DB.prepare(
            "SELECT * FROM Posts INNER JOIN PostImages ON Posts.PostId = PostImages.PostId"
        ).all();
        return jsonResponse(results);
    }

    if (request.method === "POST") {
        return authWrapper({ secret: env.AUTH, request }, async () => {
            let validatedFormData: PostsPOST;
            try {
                const formData = await request.formData();
                validatedFormData = formDataValidator<PostsPOST>(
                    Forms.POST,
                    formData
                );
            } catch {
                return invalidInputResponse();
            }
            const fileExtension = validatedFormData.file.name.split(".").pop();
            const imageName = crypto.randomUUID() + "." + fileExtension;

            try {
                await Promise.all([
                    env.DB.prepare(
                        `INSERT INTO Posts (PostId, Title, Date, Description, Tags, Type, IsNSFW) VALUES (?, ?, ?, ?, ?, ?, ?)`
                    )
                        .bind(
                            validatedFormData.postId,
                            validatedFormData.title,
                            validatedFormData.date ??
                                Math.floor(Date.now() / 1000),
                            validatedFormData.description ?? null,
                            validatedFormData.tags ?? null,
                            validatedFormData.type,
                            validatedFormData.isNSFW ? 1 : 0
                        )
                        .all(),
                    env.IMAGES.put(imageName, validatedFormData.file),
                ]);

                const creditsPost = insertDbList(
                    "INSERT INTO PostCredits (PostId, CreditId, Contribution) VALUES",
                    Object.entries(validatedFormData.credits),
                    ([creditId, contribution]) => [
                        validatedFormData.postId,
                        creditId,
                        contribution,
                    ]
                );

                const charactersPost = insertDbList(
                    "INSERT INTO PostCharacters (PostId, CharacterId) VALUES",
                    validatedFormData.characterIds ?? [],
                    (characterId: string) => [
                        validatedFormData.postId,
                        characterId,
                    ]
                );

                await Promise.all([
                    env.DB.prepare(
                        "INSERT INTO PostImages (PostId, ImageName, AltText, IsCover) VALUES (?, ?, ?, ?)"
                    )
                        .bind(
                            validatedFormData.postId,
                            imageName,
                            validatedFormData.altText,
                            1
                        )
                        .all(),
                    env.DB.prepare(creditsPost.sql)
                        .bind(...creditsPost.params)
                        .all(),
                    env.DB.prepare(charactersPost.sql)
                        .bind(...charactersPost.params)
                        .all(),
                ]);
            } catch (e) {
                console.error(e);
                return genericErrorResponse();
            }
            return jsonResponse({});
        });
    }
    return jsonResponse({});
};
