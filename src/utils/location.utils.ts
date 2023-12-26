import { LetterInfo } from "../types";

export const areLocationsEqual = (
  location1: LetterInfo,
  location2: LetterInfo
) => {
  return location1[0] === location2[0] && location1[1] === location2[1];
};
