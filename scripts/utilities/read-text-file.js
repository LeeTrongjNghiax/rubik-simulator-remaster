/**
 * @async
 * @function
 * 
 * @param {string | URL} file - 
 * 
 * @returns {Promise<string>}
 */
const readTextFile = async (file) => {
  return new Promise((resolve, reject) => {
    const rawFile = new XMLHttpRequest();

    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          const allText = rawFile.responseText;

          resolve(allText);
        }

        reject(new Error(`Failed to read text file`));
      }
    }

    rawFile.send(null);
  });
};

export default readTextFile;
