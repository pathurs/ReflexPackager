
const functionCodeExtractionRegExp = /^function\s+\w*\s*\([\w\W]*?\)\s*\{\s*([\w\W]*)\s*\}$/;
const lambdaCodeExtractionRegExp = /^\([\w\W]*?\)\s*=>\s*\{\s*([\w\W]*)\s*\}$/;

export function extractCode(code: Function) {
    let result = '';

    const functionString = code.toString();

    result = `(${functionString})(args);`.replace(/\r/g, '');

    if (functionCodeExtractionRegExp.test(functionString)) {
        const innerCode: string | undefined = (functionString.match(functionCodeExtractionRegExp) || [])[1];

        if (innerCode !== undefined) {
            result = innerCode;
        }
    }
    else if (lambdaCodeExtractionRegExp.test(functionString)) {
        const innerCode: string | undefined = (functionString.match(lambdaCodeExtractionRegExp) || [])[1];

        if (innerCode !== undefined) {
            result = innerCode;
        }
    }

    return result;
}
