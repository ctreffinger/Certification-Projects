// ROT13 cipher decoder -- 

function rot13(str) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = 13;                                     // this number could be changed for a different cipher value
  let val = 0;                                        // will be used to look up character value
  let char = '';                                      // will be used to take character from string
  let newString = '';                                 // this string will get returned

  console.log("CODED STRING: " + str);

  for (let i = 0; i < str.length; i++) {              // loop to run for length of string
    char = str[i];                                    // char gets the next character from input string

    if (/^[A-Z]/i.test(char) === false) {             // proceeds if char is not letter
      newString += char;                              // adds character to newString
      console.log("'" + char + "' -> '" + char + "'");
    }
    else {                                            // proceeds if char is letter
      val = alphabet.indexOf(char);                   // looks up value for character
      val -= num;                                     // translates character to correct value
      if (val < 0) val = val + 26;                    // adds 26 to negative value
      console.log(char + " -> " + alphabet[val]);
      newString += alphabet[val];                     // adds appropriate character to newString
    }
  }

  console.log("DECODED STRING: " + newString);        // prints decoded string to console
  return newString;                                   // returns decoded value
}

rot13("SERR PBQR PNZC");