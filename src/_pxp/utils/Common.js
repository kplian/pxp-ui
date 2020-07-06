/**
 * Common functions for use in another components
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * */
export const getUrlForView = ({ nameFile, folder, extension, size }) => {
  let urlFile = '';
  if (nameFile) {
    urlFile = folder;
    urlFile = urlFile.split('./../../../')[1];
    if (size) {
      urlFile = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}/${size}/${urlFile}${nameFile}.${extension}`;
    } else {
      urlFile = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}/${urlFile}${nameFile}.${extension}`;
    }
  }
  return urlFile;
};

export const capitalizeFirst = (cad, separator = ' ') => {
  const capilatizeWord = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return cad
    ? cad
        .split(separator)
        .reduce((acc, curr) => acc + capilatizeWord(curr) + separator, '')
    : null;
};
