export const getTwentyFirstLetters = (data: string): string => {
  var text: string = "";

  var letters: string[] = data.split("");

  for (let index = 0; index < letters.length; index++) {
    text += letters[index];
    if (index == 30) {
      text += "...";
      break;
    }
  }

  return text;
};
