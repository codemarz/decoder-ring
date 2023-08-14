// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // Function to convert characters to their Unicode values or keep them unchanged
  function toUnicode(array) {
    return array.map((character) => {
      // Convert to lowercase and get Unicode value
      const unicode = character.toLowerCase().charCodeAt();
      // If the Unicode value is within the range of lowercase letters, return it
      // Otherwise, return the original character (non-alphabetic)
      return unicode >= 97 && unicode <= 122 ? unicode : character;
    });
  }

  // The main Caesar cipher function
  function caesar(input, shift, encode = true) {
    // Checks for given shift constraint
    if (shift < -25 || shift > 25 || !shift) {
      return false;
    }
    // Sets decode mode by inverting the shift
    if (encode === false) {
      shift = shift * -1;
    }

    // Split input into an array of characters
    let inputArray = input.split("");

    // Convert input characters to Unicode values (keeping non-alphabetic characters unchanged)
    let inputNumbers = toUnicode(inputArray);

    // Apply the Caesar cipher shift to Unicode values (ignoring non-alphabetic characters)
    let shiftedNumbers = inputNumbers.map((number) => {
      return typeof number === "number" ? number + shift : number;
    });

    // Loop correction handles case where the shift goes left of "a" or right of "z"
    let loopCorrectedNumbers = shiftedNumbers.map((number) => {
      if (typeof number === "number") {
        if (number < 97) {
          return number + 26;
        }
        if (number > 122) {
          return number - 26;
        }
      }
      return number;
    });

    // Convert corrected Unicode values back to characters
    let outputArray = loopCorrectedNumbers.map((number) => {
      return typeof number === "number" ? String.fromCharCode(number) : number;
    });

    // Join the output array to form the encoded/decoded string
    return outputArray.join("");
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
