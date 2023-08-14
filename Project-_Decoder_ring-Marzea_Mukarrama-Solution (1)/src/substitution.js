// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function() {
  // Define a reference alphabet to maintain the order of characters
  const refAlp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // The main substitution function for encoding and decoding
  function substitution(input, alphabet, encode = true) {
      try {
          // Validate the custom alphabet
          if (!alphabet) { throw false };
          alphabet = alphabet.split('');
          if (alphabet.length !== 26) { throw false };

          // Check for duplicate characters in the custom alphabet
          alphabet.forEach((letter) => {
              let count = 0;
              for (let i = 0; i < alphabet.length; i++) {
                  if (letter === alphabet[i]) {
                      count++;
                  }
              }
              if (count > 1) { throw false };
          });
      } catch (error) {
          return error;
      }

      // Initialize an array to store the resulting characters
      const results = [];
      input = input.toLowerCase().split('');

      if (encode === true) {
          // Encoding logic
          input.forEach((char) => {
              if (refAlp.includes(char)) {
                  refAlp.find((letter, index) => {
                      if (char === letter) {
                          newChar = alphabet[index];
                          results.push(newChar);
                      }
                  });
              } else {
                  results.push(char);
              }
          });
      } else {
          // Decoding logic
          input.forEach((char) => {
              if (alphabet.includes(char)) {
                  alphabet.find((letter, index) => {
                      if (char === letter) {
                          newChar = refAlp[index];
                          results.push(newChar);
                      }
                  });
              } else {
                  results.push(char);
              }
          });
      }
      return results.join('');
  }

  return {
      substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
