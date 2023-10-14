/**
 * Decode a JWT token
 * @param {string} jwtToken The JWT token to decode
 * @param {boolean} [verbose=false] Optional. If true, the function logs the validation process and errors.
 * @returns {Object} The decoded JWT token
 */
let jwtDecoder = (jwtToken, verbose = false) => {
    if (verbose) console.log('JWT Decoder started!');
    let jwtTokenDecoded = JSON.parse(atob(jwtToken.split('.')[1]));
    if (verbose) console.info('Token', jwtTokenDecoded);
    if (verbose) console.log('JWT Decoder ended!');
    return jwtTokenDecoded;
}
pm.environment.set('function_jwt_decoder', jwtDecoder.toString());