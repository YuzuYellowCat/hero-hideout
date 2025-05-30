import {
    FileInput,
    CheckBoxInput,
    FormContentsWrapper,
    TextInput,
    TextArea,
    Select,
    MapInput,
    ArrayInput,
} from "./BaseComponents";

export const Posts: React.FC = () => (
    <FormContentsWrapper
        components={[
            <TextInput key="postId" name="postId" required />,
            <FileInput key="file" name="file" label="Upload Image" required />,
            <TextArea key="altText" name="altText" required />,
            <TextInput key="title" name="title" required />,
            <TextInput key="date" name="date" />,
            <TextArea key="description" name="description" />,
            <TextInput key="tags" name="tags" />,
            <Select
                name="type"
                label="Post Type"
                options={["Commission", "Art", "Fursuit"]}
                required
            />,
            <ArrayInput
                name="characterIds"
                componentCreator={(name) => (
                    <TextInput name={name} key={name} required />
                )}
            />,
            <ArrayInput
                name="creditIds"
                componentCreator={(name) => (
                    <TextInput name={name} key={name} required />
                )}
            />,
            <CheckBoxInput key="isNSFW" name="isNSFW" />,
        ]}
    />
);

export const Characters: React.FC = () => (
    <FormContentsWrapper
        components={[
            <FileInput
                key="file"
                name="file"
                label="Upload Avatar for Character"
                required
            />,
            <TextInput key="characterId" name="characterId" required />,
            <TextInput key="name" name="name" required />,
            <TextInput key="color" name="color" required />,
            <CheckBoxInput key="isGuest" name="isGuest" />,
        ]}
    />
);

export const Credits: React.FC = () => (
    <FormContentsWrapper
        components={[
            <TextInput key="creditId" name="creditId" required />,
            <TextInput key="name" name="name" required />,
            <MapInput
                key="links"
                name="links"
                componentCreator={(key, value) => [
                    <TextInput
                        key={key}
                        name={key}
                        label="LinkType"
                        required
                    />,
                    <TextInput key={value} name={value} label="URL" required />,
                ]}
            />,
        ]}
    />
);
