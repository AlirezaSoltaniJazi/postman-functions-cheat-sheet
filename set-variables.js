/**
 * Set variables in a specified scope
 * @param {Object} variables An object containing variable names and values
 * @param {string} variableScope The scope in which to set the variables: e (environment), c (collection), or g (globals)
 * @param {boolean} [verbose=false] Optional. If true, the function logs the validation process and errors.
 */
let setVariables = (variables, variableScope, verbose = false) => {
    const environmentScope = ['e', 'environment', 'env'];
    const collectionScope = ['c', 'collection', 'coll'];
    const globalsScope = ['g', 'globals', 'glob'];
    for (let variableName in variables) {
        let variableValue = variables[variableName];
        if (environmentScope.includes(variableScope)) {
            pm.environment.set(variableName, variableValue);
            if (verbose) console.info(variableName, 'saved in environment!');
        } else if (collectionScope.includes(variableScope)) {
            pm.collectionVariables.set(variableName, variableValue);
            if (verbose) console.info(variableName, 'saved in collection!');
        } else if (globalsScope.includes(variableScope)) {
            pm.globals.set(variableName, variableValue);
            if (verbose) console.info(variableName, 'saved in globals!');
        } else {
            if (verbose) console.error('Wrong variable type!');
        }
    }
}
pm.globals.set('function_set_variables', setVariables.toString());