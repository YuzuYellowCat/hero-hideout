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
            <MapInput
                name="credits"
                componentCreator={(key, value) => [
                    <TextInput
                        name={key}
                        key={key}
                        label="CreditID"
                        required
                    />,
                    <TextInput
                        name={value}
                        key={value}
                        label="Contribution"
                        required
                    />,
                ]}
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
            />,
            <TextInput key="characterId" name="characterId" required />,
            <TextInput key="name" name="name" required />,
            <TextInput key="color" name="color" required />,
            <CheckBoxInput key="isGuest" name="isGuest" />,
            <TextInput key="creditId" name="creditId" />,
        ]}
    />
);

export const Credits: React.FC = () => (
    <FormContentsWrapper
        components={[
            <TextInput key="creditId" name="creditId" required />,
            <TextInput key="name" name="name" required />,
            <TextInput key="color" name="color" required />,
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
            <CheckBoxInput
                key="createCharacter"
                name="createCharacter"
                label="Create character from credit?"
            />,
            <TextInput key="characterName" name="characterName" />,
        ]}
    />
);
