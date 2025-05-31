export const insertDbList = <T>(
    baseSQL: string,
    items: T[],
    itemMapper: (T) => unknown[]
) => {
    const paramsList = [];
    for (const item of items) {
        const itemMapperResult = itemMapper(item);
        const questionMarks = itemMapperResult.map(() => "?");
        baseSQL += ` (${questionMarks.join(", ")}),`;
        paramsList.push(...itemMapperResult);
    }
    baseSQL = baseSQL.replace(/.$/, ";");
    return {
        sql: baseSQL,
        params: paramsList,
    };
};
