function toSnakeCase(str: string): string {
  return (
    str
      // Add an underscore before all uppercase letters, then convert the string to lowercase
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      // Replace spaces and other non-word characters with an underscore
      .replace(/[\W_]+/g, "_")
      // Remove leading and trailing underscores that may have been added
      .replace(/^_+|_+$/g, "")
  );
}

function toSlug(src: string) {
  return src
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const words = {
  toSnakeCase,
  toSlug,
};
