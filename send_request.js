/**
 * @param {string} url of the request
 * @param {string} method of the request
 * @param {JSON} header of the request
 * @param {string} bodyMode raw vs fromData
 * @param {JSON} body of the request
 * @param {Function} callback The Function can handle err and response
 * @param {boolean} [verbose=false] Optional. If true, the function logs the validation process and errors.
 */
let sendRequest = (url, method, header, bodyMode, body, callback, verbose = false) => {
    let request = {};
    request['url'] = url;
    request['method'] = method.toUpperCase();
    request['header'] = header

    if (bodyMode.toUpperCase() === "RAW") {
        if (verbose) console.log("Raw mode active", url)
        request = {
            body: {
                mode: 'raw',
                raw: JSON.stringify(body)
            }
        };
    } else if (bodyMode.toUpperCase() === 'FORMDATA') {
        if (verbose) console.warn("Formdata mode active")
        request = {
            body: {
                mode: 'formdata',
                formdata: body
            }
        };
    } else if (verbose) console.error("Body mode not supported!")
    pm.sendRequest(request, callback);
}
pm.environment.set('function_send_request', sendRequest.toString())