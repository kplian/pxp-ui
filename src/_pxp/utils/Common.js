import { useCallback } from 'react';

/**
 * Common functions for use in another components
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * */
export const getUrlForView = ({ nameFile, folder, extension, size }) => {
  let urlFile = '';
  if (nameFile) {
    urlFile = folder;
    if (size) {
      urlFile = `${urlFile.split('./../../../')[1]}/${size}/`;
    } else {
      // eslint-disable-next-line prefer-destructuring
      urlFile = urlFile.split('./../../../')[1];
    }
    urlFile = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}/${urlFile}${nameFile}.${extension}`;
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

export const deleteNativeStorage = () => {
  console.log('[DELETE NATIVE STORAGE]');

  const isWebView = navigator.userAgent.includes('wv');

  const userAgent = window.navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

  const iOSWebView = ios && !safari;

  if (isWebView && window.Mobile) {
    window.Mobile.deleteUserCredentials();
  } else if (iOSWebView && window.webkit) {
    window.webkit.messageHandlers.deleteUserCredentials.postMessage({
      data: '',
    });
  }
};

export const handleMouseTriggerComponent = (event) => event.preventDefault();
