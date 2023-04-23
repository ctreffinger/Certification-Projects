/* Roman Numeral Converter
convertToRoman() will convert a number to roman numerals if the number is valid, else will return 'N/A'
convertFromRoman() will convert roman numerals to a number if the numerals are valid, else will return -1
*/

function convertToRoman(num) {
  let remaining = num;                  // This number will be subtracted from as the string is added to
  let roman = '';                       // This string will be added to

  const lookUp = [                      // lookUp array for numeral values
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  if (typeof(num) !== 'number' && typeof(num) !== 'string') {
    console.error("Input must be a number");
    return 'N/A';
  }

  if (num > 100000) {
    console.error("Number is too large to convert");
    return 'N/A';
  }

  if (/\D/.test(num)) {                       // return 'N/A' if non-digit is detected
    console.error("Invalid character detected");
    return 'N/A';
  }

  if (num <= 0 || num > Math.floor(num)) {                         // return 'N/A' if num is 0, negative or not a whole number
    console.error("Number must be a whole number greater than zero");
    return 'N/A';
  }

  for (let i = 0; i < lookUp.length; i++) {   // for loop that will cycle through the values of the lookUp array
    while (remaining >= lookUp[i][1]) {           // proceed while remaining number is greater than or equal to the numeral value at position i in the lookUp array
      roman += lookUp[i][0];                      // adds numerals from array to the end of the string
      remaining -= lookUp[i][1];                  // number value of numeral is subtracted from the remaining number
    }
  }
  
  console.log(num + " is converted to: " + roman);    // log the conversion to the console
  return roman;                                   // return the completed string
}

function convertFromRoman(roman) {
  let remaining = roman;                // This string will be reduced as the number is added to
  let num = 0;                          // This number will be added to
  let isValid = true;                   // condition that will get set to false if numerals are not in descending order
  let tempVal = 1000;

  const lookUp = {                      // lookUp object for numeral values
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  if (typeof(roman) !== 'string') {
    console.error("Input must be a string");
    return -1;
  }

  if (roman === '') {                                   // return -1 if string is empty
    console.error("String is empty");
    return -1;
  }

  if (/[^MDCLXVI]/.test(roman)) {                       // return -1 if unallowed character is detected
    console.error("Invalid character detected");
    return -1;
  }

  while (remaining.length >= 2 && isValid === true) {        // proceed while at least 2 characters remain in the string (and numeral is not yet invalidated)
    
    if (lookUp.hasOwnProperty(remaining[0] + remaining[1])) {   // proceed if next 2 characters exist in lookUp
      if (lookUp[remaining[0] + remaining [1]] > tempVal) {     // check for roman numeral formatting, exit while loop if invalid
        isValid = false;
      }
      else {
        num += lookUp[remaining[0] + remaining[1]];               // add lookUp value to num
        tempVal = lookUp[remaining[0] + remaining[1]];
        remaining = remaining.replace(/^\w{2}/, '');         // remove first two characters from remaining string
      }  
    }
    else {
      if (lookUp[remaining[0]] > tempVal) {               // check for roman numeral formatting, exit while loop if invalid
        isValid = false;
      }
      else {
        num += lookUp[remaining[0]];                      // add lookUp value to num        
        tempVal = lookUp[remaining[0]];                   // set tempVal to current numeral value
        remaining = remaining.replace(/^\w/, '');         // remove first character from remaining string
      }
    }
  }
  // length of remaining is now 1 or 0
  if (remaining.length === 1 && isValid === true) {         // proceed if character remains
    if (lookUp[remaining[0]] > tempVal) {                 // check for roman numeral formatting
      isValid = false;
    }
    else {
      num += lookUp[remaining[0]];                        // add lookUp value to num        
      tempVal = lookUp[remaining[0]];                     // set tempVal to current numeral value
      remaining = remaining.replace(/^\w/, '');           // remove first character from remaining string
    }
  }
  
  if (isValid === false) {                                // if isValid is false, return -1
    console.error("String is not a valid roman numeral");
    return -1;
  }
  else {                                                  // if isValid is not false, print conversion to console and return the num result
    console.log(roman + " is converted to: " + num);
    return num;
  }
}

convertToRoman(3999);
convertFromRoman('DCCXCVIII');