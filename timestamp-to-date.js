/**
 * Convert timestamps to formatted dates
 * @param {...number} timestamps The timestamps to convert
 * @param {boolean} [verbose=false] Whether to log messages to the console
 */
let timestampToDate = (verbose, ...timestamps) => {
    if (verbose) console.log('Timestamp to date started!');
    timestamps.forEach((timestamp, index) => {
        // Check if timestamp is in milliseconds
        if (timestamp.toString().length > 10) {
            timestamp = timestamp / 1000;
        }
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3/$2/$1');
        if (verbose) console.info(`Formatted date for index ${index + 1}`, formattedDate);
    });
    if (verbose) console.log('Timestamp to date ended!');
}
pm.environment.set('function_timestamp_to_date', timestampToDate.toString())
