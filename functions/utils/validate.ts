type Validator = (input: string | File) => boolean;
type Mapper = (input: string | File) => any;

type Form = {
    [key: string]: FormType;
};

type FormType = {
    validator: Validator;
    mapper: Mapper;
    optional: boolean;
};

const FormTypes: {
    [key: string]: (...args: [...args: any, optional?: boolean]) => FormType;
} = {
    STRING: (optional: boolean = false) => ({
        validator: (input) => typeof input === "string",
        mapper: (input: string) => input,
        optional,
    }),
    FILE: (optional: boolean = false) => ({
        validator: (input) => input instanceof File,
        mapper: (input: File) => input,
        optional,
    }),
    BOOLEAN: (optional: boolean = false) => ({
        validator: (input) => input === "true" || input === "false",
        mapper: (input) => input === "true",
        optional,
    }),
    INTEGER: (optional: boolean = false) => ({
        validator: (input: string) => !isNaN(parseInt(input)),
        mapper: (input: string) => parseInt(input),
        optional,
    }),
    ENUM: (values: string[], optional: boolean = false) => ({
        validator: (input: string) => values.includes(input),
        mapper: (input: string) => input,
        optional,
    }),
    ARRAY: (optional: boolean = false) => ({
        validator: (input: string) => {
            const parsedInput = JSON.parse(input);
            return parsedInput instanceof Array && parsedInput.length > 0;
        },
        mapper: (input: string) => JSON.parse(input) as Array<unknown>,
        optional,
    }),
};

export const Forms: {
    [key: string]: Form;
} = {
    POST: {
        postId: FormTypes.STRING(),
        file: FormTypes.FILE(),
        title: FormTypes.STRING(),
        date: FormTypes.INTEGER(true),
        description: FormTypes.STRING(true),
        tags: FormTypes.STRING(true),
        type: FormTypes.ENUM(["Commission", "Art", "Fursuit"]),
        isNSFW: FormTypes.BOOLEAN(),
        characterIds: FormTypes.ARRAY(true),
        creditIds: FormTypes.ARRAY(true),
        altText: FormTypes.STRING(),
    },
    CHARACTER: {
        characterId: FormTypes.STRING(),
        file: FormTypes.FILE(true),
        name: FormTypes.STRING(),
        color: FormTypes.STRING(),
        isGuest: FormTypes.BOOLEAN(),
    },
};

export const formDataValidator = <T>(form: Form, formData: FormData) => {
    let output = {};
    for (const [key, formType] of Object.entries(form)) {
        const formEntry = formData.get(key);
        if (!formEntry || !formType.validator(formEntry)) {
            if (formType.optional) {
                continue;
            }
            throw new Error("Invalid FormData");
        }
        output[key] = formType.mapper(formEntry);
    }
    return output as T;
};
