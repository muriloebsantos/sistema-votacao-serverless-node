export function defaultResult(defaultStatusCode: number, result: any) {
    if(result.error) {
        return {
            body: JSON.stringify({ error: result.error }),
            statusCode: result.status
        }
    } else {
        return {
            body: JSON.stringify(result),
            statusCode: defaultStatusCode
        }
    }
}