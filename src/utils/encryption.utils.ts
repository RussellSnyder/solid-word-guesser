// Not real encryptions
// just makes the words not human readable so you can't cheat :-)
export const encrypt = (word: string) => {
  return window.btoa(word);
};
export const decrypt = (word: string) => {
  return window.atob(word);
};
