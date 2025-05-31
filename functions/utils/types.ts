type DBBool = 0 | 1;

export const convertDBBoolToBool = (dbBool: DBBool) => {
    return !!dbBool;
};

export const convertBoolToDBBool = (bool: boolean) => {
    return (bool ? 1 : 0) as DBBool;
};
