import {
    FileInput,
    CheckBoxInput,
    FormContentsWrapper,
    TextInput,
    TextArea,
    Select,
} from "./BaseComponents";

export const Posts: React.FC = () => (
    <FormContentsWrapper
        components={[
            <TextInput key="postId" name="postId" />,
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
            />,
            <TextInput key="characterId" name="characterId" />,
            <TextInput key="name" name="name" />,
            <TextInput key="color" name="color" />,
            <CheckBoxInput key="isGuest" name="isGuest" />,
        ]}
    />
);
