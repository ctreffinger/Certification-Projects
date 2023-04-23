// Palindrome Checker -- Ignores all non-alphanumeric characters and ignores case

function palindrome(str) {
    const newString = str.replace(/\W*_*/g, '').toLowerCase();            // this converts the string to alphanumeric and lowercase
    let revString = '';                               // this string will get added to

    console.log(str + " - Original String");
    console.log(newString + " - Original string after regex and lowercase"); // print string after conversion
  
    for (let i = newString.length - 1; i >= 0; i--) { // this loop reverses newString
      revString += newString[i].toLowerCase();        // adds i position character to revString
    }
    console.log(revString + " - String reversed");    // print revString to console
  
    console.log("String is palindrome: " + (newString === revString));             // print boolean result to console comparing strings
    return (newString === revString);
  }
  
  palindrome("!123Eye321___?$.");