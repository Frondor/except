export const objToLogMessage = (obj: any) =>
  Object.entries(obj)
    .reduce((acc, [key, value]): string => {
      if (Array.isArray(value)) {
        return `${acc}[${key}:${value
          .map((v) => objToLogMessage(v))
          .join(",")}] `;
      } else if (typeof value === "object") {
        return `${acc}[${key}:${objToLogMessage(value)}] `;
      } else {
        return `${acc}[${key}:${value}] `;
      }
    }, "")
    .replace(/\s$/, "");
