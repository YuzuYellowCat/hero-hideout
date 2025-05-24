const Posts: React.FC = () => (
    <>
        <label htmlFor="upload">
            Upload Image:
            <input type="file" id="upload" accept="image/*" required />
        </label>
        <br />
        <label htmlFor="name">
            Name:
            <input type="input" name="name" id="name" required />
        </label>
        <br />
        <label htmlFor="description">
            Description:
            <textarea name="description" id="description" required />
        </label>
        <br />
        <label htmlFor="isNSFW">
            isNSFW:
            <input type="checkbox" name="isNSFW" id="isNSFW" />
        </label>
    </>
);

export default Posts;
