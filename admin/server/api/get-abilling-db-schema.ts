export default defineEventHandler(async () => {
    // const schema = await mySQLSchema.getSchema()
    // const refs = []
    // console.log('schema: ', schema);
    // const tables = schema.tables
    // for (const tableName in tables) {
    //     const table = tables[tableName];
    //     const foreignKeys = table.foreignKeys;
    //     if (foreignKeys) {
    //         for (const fkName in foreignKeys) {
    //             const fk = foreignKeys[fkName];
    //             console.log(`Table ${tableName} has foreign key ${fkName} that references table ${fk.referencesTable}`);
    //             refs.push({
    //                 tableName,
    //                 references: fk.referencesTable,
    //                 field: fkName
    //             })
    //         }
    //     }
    // }
    return 'schemaRefs'
})
