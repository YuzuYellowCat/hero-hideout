export const insertDbList = <T>(
    baseSQL: string,
    items: T[],
    itemMapper: (T) => unknown[]
) => {
    const paramsList = [];
    for (const item of items) {
        baseSQL += " (?, ?),";
        paramsList.push(...itemMapper(item));
    }
    baseSQL = baseSQL.replace(/.$/, ";");
    return {
        sql: baseSQL,
        params: paramsList,
    };
};
