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
    [key: string]: (optional?: boolean) => FormType;
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
};

export const Forms: {
    [key: string]: Form;
} = {
    POST: {
        file: FormTypes.FILE(),
        name: FormTypes.STRING(),
        description: FormTypes.STRING(),
        isNSFW: FormTypes.BOOLEAN(),
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
