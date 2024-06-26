const {BadRequestError} = require('../expressError')

//Export to helpers
function sqlForUpdate(data){
    const keys = Object.keys(data);
    if (keys.length === 0) throw new BadRequestError("No data");

    // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
    const cols = keys.map((colName, idx) =>
        `"${colName.toLowerCase()}"=$${idx + 1}`,
    );

    return {
        setCols: cols.join(", "),
        values: Object.values(data),
        lastIdx: Object.values(data).length + 1
    };
}

module.exports = {sqlForUpdate};