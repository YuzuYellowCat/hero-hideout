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

            const [{ results }] = await Promise.all([
                env.DB.prepare(
                    "INSERT INTO Posts (Date, Title, Description, IsNSFW) VALUES (strftime('%s', 'now'), ?, ?, ?) RETURNING PostId"
                )
                    .bind(
                        validatedFormData.name,
                        validatedFormData.description,
                        validatedFormData.isNSFW ? 1 : 0
                    )
                    .all(),
                env.IMAGES.put(imageName, validatedFormData.file),
            ]);

            const postId = results[0].PostId;

            await env.DB.prepare(
                "INSERT INTO PostImages (PostId, ImageName, AltText, IsCover) VALUES (?, ?, ?, ?)"
            )
                .bind(postId, imageName, "Test Alt Text", 1)
                .all();

            return jsonResponse({});
        });
    }
    return jsonResponse({});
};
