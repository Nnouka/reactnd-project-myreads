// Methods to manage strings

export const camelCaseToWords = (camelCase) => camelCase === undefined || null ? camelCase : camelCase.replace(/([A-Z])/g, ' $1');