// Author: Sagar Paresh Shah (B00930009)

const extractKeysFromObject = (obj, keys) => {
  const extractedObj = {};
  for (const key of keys) {
    extractedObj[key] = obj[key];
  }
  return extractedObj;
};

module.exports = extractKeysFromObject;
