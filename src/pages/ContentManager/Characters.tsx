const Characters: React.FC = () => (
    <>
        <label htmlFor="upload">
            Upload Image:
            <input type="file" id="upload" accept="image/*" />
        </label>
        <br />
        <label htmlFor="characterId">
            CharacterId:
            <input type="input" name="characterId" id="characterId" required />
        </label>
        <br />
        <label htmlFor="name">
            Name:
            <input type="input" name="name" id="name" required />
        </label>
        <br />
        <label htmlFor="color">
            Color:
            <input type="input" name="color" id="color" required />
        </label>
        <br />
        <label htmlFor="isGuest">
            isGuest:
            <input type="checkbox" name="isGuest" id="isGuest" />
        </label>
    </>
);

export default Characters;
