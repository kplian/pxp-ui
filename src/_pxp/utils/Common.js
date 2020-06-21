/**
 * Common functions for use in another components
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * */
export const getUrlForView = ({ nameFile, folder, extension }) => {
  let urlFile = '';
  if (nameFile) {
    urlFile = folder;
    urlFile = urlFile.split('./../../../')[1];
    urlFile = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}/${urlFile}${nameFile}.${extension}`;
  }
  return urlFile;
};
