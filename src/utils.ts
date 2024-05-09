export const getURL = (path: string, name: string, extension: string) => {
  return new URL(
    path + name.toLocaleLowerCase().split(" ").join("").trim() + extension,
    import.meta.url,
  ).href;
};
