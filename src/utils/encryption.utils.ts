// I know, not real encryption
// To really encrypt, we need a backend
// this just makes urls no readablee (which is good for our case)
import { GameCreationData } from "../types";

// just makes the words not human readable so you can't cheat :-)
export const encodeGameCreationData = (gameCreationData: GameCreationData) => {
  const { chosenWord, introMessage } = gameCreationData;

  let gameCreationDataString = chosenWord;
  gameCreationDataString += `?im=${introMessage}`;

  const encrypedUrlDataString = encodeText(gameCreationDataString);
  const urlString = encodeURI(encrypedUrlDataString);
  return urlString;
};
export const decodeGameCreationString = (
  encryptedDataString: string
): GameCreationData => {
  const gameCreationString = decodeText(decodeURI(encryptedDataString));
  const parsedUrl = new URL(`http://www.whatever/${gameCreationString}`);
  const chosenWord = parsedUrl.pathname.substring(1, parsedUrl.pathname.length);
  const introMessage = parsedUrl.searchParams.get("im");

  return {
    chosenWord: chosenWord.toUpperCase(),
    introMessage:
      introMessage && introMessage.length > 0 ? introMessage : undefined,
  };
};

export const encodeText = (text: string): string => {
  // Step 1: instantiate the text encoder:
  const enc = new TextEncoder();

  // Step 2: encode the string into a Uint8 array buffer
  const encStr = enc.encode(text);

  // Step 3: convert Uint8 array to 'normal' array
  // and change each code point into hexidecimal notation.
  // `Array.from()` takes 2 args: the array-like obj to convert to an array
  // and a map function. This map function turns the number points
  // to a hex string
  const arrStr = Array.from(encStr, (point) => point.toString(16));

  // Step 4: go from array to string
  const returnString = arrStr.join("");

  // Step 5: give back the string!
  return returnString;

  // of course, this can all be done in one line, combining all the above:
  // return Array.from(enc.encode(string), point => point.toString(16)).join('');
};

//this function does the conversion the other way: from hex string to word
export const decodeText = (encodedText: string): string => {
  // Step 1: instantiate the text decoder
  const dec = new TextDecoder();

  // Step 2: split the string into a hex array
  // this uses a regex to split into 2-character groups
  const hexArr = encodedText.match(/../g)!;

  // Step 3: Convert the 'normal' array to a Uint8 array.
  // As above, the `.from()` method takes a map function as
  // the second parameter, this time converting the hex string
  // to a number
  const buffer = Uint8Array.from(hexArr, (point) => parseInt(point, 16));

  // Step 4: Decode the buffer into text
  const text = dec.decode(buffer);

  // Step 5: return the decoded string
  return text;

  //also, as above, this can be boiled down to one line:
  // return dec.decode(Uint8Array.from(string.match(/../g), point => parseInt(point, 16)));
};
