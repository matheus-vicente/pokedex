export const titleCase = (str: string) => {
  const lowered = str.toLowerCase();

  const splited = lowered.split(" ");

  for (var i = 0; i < splited.length; i++) {
    splited[i] = splited[i].charAt(0).toUpperCase() + splited[i].slice(1);
  }

  return splited.join(" ");
};
