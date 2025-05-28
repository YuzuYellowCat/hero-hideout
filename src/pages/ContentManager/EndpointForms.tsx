import {
    FileInput,
    CheckBoxInput,
    FormContentsWrapper,
    TextInput,
    TextArea,
    Select,
    MapInput,
} from "./BaseComponents";

export const Posts: React.FC = () => (
    <FormContentsWrapper
        components={[
            <TextInput key="postId" name="postId" required />,
            <FileInput key="file" name="file" label="Upload Image" required />,
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
                key="credits"
                name="credits"
                componentCreator={(key, value) => [
                    <TextInput key={key} name={key} label="CreditType" />,
                    <TextInput key={value} name={value} label="URL" />,
                ]}
            />,
        ]}
    />
);
