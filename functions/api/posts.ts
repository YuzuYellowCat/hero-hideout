import {
    jsonResponse,
    invalidInputResponse,
    optionsResponse,
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

            await Promise.all([
                env.DB.prepare(
                    `INSERT INTO Posts (PostId, Title, Date, Description, Tags, Type, IsNSFW) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING PostId`
                )
                    .bind(
                        validatedFormData.postId,
                        validatedFormData.title,
                        validatedFormData.date ?? Math.floor(Date.now() / 1000),
                        validatedFormData.description ?? null,
                        validatedFormData.tags ?? null,
                        validatedFormData.type,
                        validatedFormData.isNSFW ? 1 : 0
                    )
                    .all()
                    .catch((e) => console.error(e)),
                env.IMAGES.put(imageName, validatedFormData.file),
            ]);

            await env.DB.prepare(
                "INSERT INTO PostImages (PostId, ImageName, AltText, IsCover) VALUES (?, ?, ?, ?)"
            )
                .bind(validatedFormData.postId, imageName, "Test Alt Text", 1)
                .all();

            return jsonResponse({});
        });
    }
    return jsonResponse({});
};
