// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // Define a map of letters to Polybius coordinates
  const alphabet = {
    a: "11", b: "21", c: "31", d: "41", e: "51",
    f: "12", g: "22", h: "32", i: "42", j: "42",
    k: "52", l: "13", m: "23", n: "33", o: "43",
    p: "53", q: "14", r: "24", s: "34", t: "44",
    u: "54", v: "15", w: "25", x: "35", y: "45", z: "55"
  };

  // Main Polybius function for encoding and decoding
  function polybius(input, encode = true) {
    // Convert the input to lowercase for consistency
    input = input.toLowerCase();

    // Initialize arrays to store the result message and the alphabet mapping
    const message = [];
    const key = Object.keys(alphabet);
    const value = Object.values(alphabet);

    if (encode === true) {
      // Encoding logic
      for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < key.length; j++) {
          if (input[i] == key[j]) {
            message.push(value[j]);
          }
        }
        if (input[i] === " ") {
          message.push(" ");
        }
      }
      return message.join("");
    } else {
      // Decoding logic
      let noSpaces = input.replace(" ", "");
      if (noSpaces.length % 2 !== 0) {
        return false;
      }

      // Create an array of pairs for decoding
      let decoderArray = [];
      for (let i = 0; i < input.length; i += 2) {
        let codex1 = input[i];
        let codex2 = input[i + 1];
        if (input[i] === " ") {
          decoderArray.push(" ");
          i--;
        } else {
          decoderArray.push(`${codex1}${codex2}`);
        }
      }

      // Decode the pairs back to letters
      for (let i = 0; i < decoderArray.length; i++) {
        if (decoderArray[i] === " ") {
          message.push(" ");
        }
        for (j = 0; j < value.length; j++) {
          if (decoderArray[i] === value[j]) {
            message.push(key[j]);
          }
        }
      }
      return message.join("");
    }
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };