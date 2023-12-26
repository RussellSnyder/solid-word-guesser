import XRegExp from "xregexp";

const letterRegEx = XRegExp("^\\p{L}*$");

export const isLetter = (letter: string) => {
  if (letter.length > 1) return;

  return letterRegEx.test(letter);
};
