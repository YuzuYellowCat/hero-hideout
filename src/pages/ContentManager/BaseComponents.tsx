import React from "react";

type BaseComponentProps = {
    label?: string;
    name: string;
    required?: boolean;
};

const LabelWrapper: React.FC<React.PropsWithChildren<BaseComponentProps>> = ({
    label,
    name,
    children,
}) => {
    return (
        <label key={name} htmlFor={name}>
            {label ??
                String(name).charAt(0).toUpperCase() + String(name).slice(1)}
            :{children}
        </label>
    );
};

export const CheckBoxInput: React.FC<BaseComponentProps> = ({
    label,
    name,
}) => {
    return (
        <LabelWrapper name={name} label={label}>
            <input type="checkbox" name={name} id={name} />
        </LabelWrapper>
    );
};

export const PasswordInput: React.FC<BaseComponentProps> = ({
    label,
    name,
    required,
}) => {
    return (
        <LabelWrapper name={name} label={label}>
            <input type="password" name={name} id={name} required={required} />
        </LabelWrapper>
    );
};

export const TextInput: React.FC<BaseComponentProps> = ({
    label,
    name,
    required,
}) => {
    return (
        <LabelWrapper name={name} label={label}>
            <input type="text" name={name} id={name} required={required} />
        </LabelWrapper>
    );
};

export const FileInput: React.FC<BaseComponentProps> = ({
    label,
    name,
    required,
}) => {
    return (
        <LabelWrapper name={name} label={label}>
            <input
                type="file"
                name={name}
                id={name}
                accept="image/*"
                required={required}
            />
        </LabelWrapper>
    );
};

export const TextArea: React.FC<BaseComponentProps> = ({
    label,
    name,
    required,
}) => {
    return (
        <LabelWrapper name={name} label={label}>
            <textarea name={name} id={name} required={required} />
        </LabelWrapper>
    );
};

type SelectProps = BaseComponentProps & {
    options: string[];
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Select: React.FC<SelectProps> = ({
    label,
    name,
    required,
    options,
    onChange,
}) => {
    return (
        <LabelWrapper name={name} label={label}>
            <select
                name={name}
                id={name}
                onChange={onChange}
                required={required}
            >
                {options.map((optn) => (
                    <option key={optn} value={optn}>
                        {optn}
                    </option>
                ))}
            </select>
        </LabelWrapper>
    );
};

type FormContentsWrapperProps = {
    components: React.ReactElement[];
};

export const FormContentsWrapper: React.FC<FormContentsWrapperProps> = ({
    components,
}) => {
    const [formContents, setFormContents] = React.useState<
        React.ReactElement[]
    >([]);
    React.useEffect(() => {
        const contents: React.ReactElement[] = [];

        for (const component of components) {
            contents.push(component);
            contents.push(
                <br
                    key={
                        (component.props as BaseComponentProps).name +
                        "-divider"
                    }
                />
            );
        }
        contents.pop();
        setFormContents(contents);
    }, [components]);

    return <>{formContents}</>;
};
