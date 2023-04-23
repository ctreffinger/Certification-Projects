// US phone number validation -- checks for valid US number and valid format

function telephoneCheck(str) {
    let phoneNumber = str.replace(/\D*/g, '');
    let remaining = str;
    
    console.log("Original string: " + str);
    console.log("Numbers only: " + phoneNumber);
    console.log("Number of digits: " + phoneNumber.length);
  
    if (/[^0-9\-\ ()]/.test(str)) {                       // return false if unallowed character
      console.error("Incorrect character detected");
      return false;
    }
  
    else if (phoneNumber.length > 11) {                   // phone number greater than 11 digits
      console.error('Number is too long')
      return false;
    }
    else if (phoneNumber.length === 10 && str[1] === ' ') {     // catches case where 10 digit number starts with '1 '
      console.error('Incorrect format');
      return false;
    }
    else if (phoneNumber.length !== 11 && phoneNumber.length !== 10) {                 // returns false if not enough digits
      console.error('Number was less than 10 digits');
      return false;
    }
  
    else {                 // phone number is 10-11 digits
      if (phoneNumber.length === 11 && /^1/.test(str) === false) {                      // 11 digit number does not begin with 1
        console.error('11 digit number does not begin with 1');
        return false;
      }
    
      else {                                              // 11 digit number begins with 1 or 10 digit number
        if (phoneNumber.length === 11 && str[0] === '1') console.log("Begins with US code '1'");
        if (phoneNumber.length === 11) {
            remaining = remaining.replace(/^\d/, '');      // if 11 digits, remove first digit, which is '1'
          }
      console.log('(1)Remaining to analyze: ' + remaining);
  // Begin character tests
  
        if (remaining[0] === ' ') {
            remaining = remaining.replace(/^\s/, '');       // if next character is a space, it is removed
            console.log('First space removed');
          }

        if (remaining[0] === '-') {
          console.error("Hyphen format is not correct");
          return false;
        }

        if (/[()]+/g.test(remaining)) {                     // proceeds if a parenthesis is present in the string
          console.log('At least one parenthesis is present');
          if ((remaining[0] === '(' && remaining[4] !== ')')      // checks for valid parentheses formatting
          || remaining.match(/[()]/g).length > 2
          || remaining[0] !== '(') {
            console.error("Parenthesis format is not correct");
            return false;
          }
          else {                  // once parentheses formatting is correct, removes remaining from string
          remaining = remaining.replace(/[()]/g, '');
          console.log('Parentheses have been removed');
          }
        }
        
        console.log('(2)Remaining to analyze: ' + remaining);
  
        if (/[^0-9]/.test(remaining.slice(0, 3)) === true) {    // returns false if next 3 characters are not all digits
            console.error('Following 3 were not all numbers: ' + remaining.slice(0, 3));
            return false;                                 
          }
        
        remaining = remaining.replace(/^\d{3}/, '');            // if next 3 characters were all digits, they are removed from string here
        console.log('(3)Remaining to analyze: ' + remaining);
  
        if (remaining[0] === '-' && remaining[4] !== '-') {     // returns false if hyphen formatting is incorrect
          console.error('Hyphen formatting is incorrect');
          return false;
        }
  
        if (remaining [1] === '-' || remaining[1] === ' ') {    // returns false if there is an extra hyphen or space here
          console.error('Incorrect Format');
          return false;
        }
        if (remaining[0] === '-' || remaining[0] === ' ') {     // removes following hyphen or space from the string if present
          remaining = remaining.replace(/^[-]*\s*/, '');
        }
        console.log('(4)Remaining to analyze: ' + remaining);
  
        if (/[^0-9]/.test(remaining.slice(0, 3)) === true) {    // returns false if next 3 characters are not all digits
            console.error('Following 3 were not all numbers: ' + remaining.slice(0, 3));
            return false;                                 
          }
  
        remaining = remaining.replace(/^\d{3}/, '');            // if next 3 characters were all digits, they are removed from string here
        console.log('(5)Remaining to analyze: ' + remaining);
  
        if (remaining [1] === '-' || remaining[1] === ' ') {    // returns false if there is an extra hyphen or space here
          console.error('Incorrect Format');
          return false;
        }
        if (remaining[0] === '-' || remaining[0] === ' ') {     // removes following hyphen or space from the string if present
          remaining = remaining.replace(/^[-]*\s*/, '');
        }
        console.log('(6)Remaining to analyze: ' + remaining);
  
        if (/[^0-9]/.test(remaining.slice(0, 4)) === true) {    // returns false if next 4 characters are not all digits
            console.error('Following 4 were not all numbers: ' + remaining.slice(0, 4));
            return false;                                 
        }
        remaining = remaining.replace(/^\d{4}/, '');      // removes 4 more digits from the string
        if (remaining === '') {                           // if no additional characters, returns true
          console.log('Analysis finished')
          console.log('Returning value of: true')
          return true;
        }
        else {                                            // catches any potential extra characters and returns false
          console.log('(7)Remaining to analyze: ' + remaining);
          console.error('Additional character(s) remaining')
          return false;
        }
      }
      // End character tests
    }
  }
  
  telephoneCheck("1 (555) 555-5555");