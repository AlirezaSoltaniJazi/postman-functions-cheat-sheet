/**
 * This function validates a given schema using the Ajv library.
 * It logs the validation process and errors if the verbose flag is set to true.
 *
 * @param {Object} schema - The schema to be validated.
 * @param {boolean} [verbose=false] - Optional. If true, the function logs the validation process and errors.
 */
let schemaValidatorHandler = (schema, verbose = false) => {
    if (verbose) console.log("schemaValidatorHandler started...")
    if (verbose) console.log('Schema', schema);
    const Ajv = require("ajv");
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(pm.response.json());
    if (verbose) console.log('Is valid?', valid);
    pm.test('Check schema is valid', () => {
        if (!valid) {
            if (verbose) console.error(validate.errors);
            let errorRoot = validate.errors[0];
            let keyword = errorRoot.keyword;
            let dataPath = errorRoot.dataPath;
            let schemaPath = errorRoot.schemaPath;
            let missingProperty = errorRoot.missingProperty;
            let message = errorRoot.message;
            keyword === undefined ? keyword = "" : keyword = "keyword: " + validate.errors[0].keyword;
            dataPath === undefined ? dataPath = "" : dataPath = " => dataPath: " + validate.errors[0].dataPath;
            schemaPath === undefined ? schemaPath = "" : schemaPath = " => schemaPath: " + validate.errors[0].schemaPath;
            missingProperty === undefined ? missingProperty = "" : missingProperty = " => missingProperty: " + validate.errors[0].missingProperty;
            message === undefined ? message = "" : message = " => message: " + validate.errors[0].message;
            if (verbose) console.log("AJV error is: " + keyword + dataPath + schemaPath + missingProperty + message);
            pm.expect.fail("AJV error is: " + keyword + dataPath + schemaPath + missingProperty + message);
        }
    });

    if (verbose) console.log("schemaValidatorHandler ended!")
}
pm.environment.set('function_check_schema', schemaValidatorHandler.toString())