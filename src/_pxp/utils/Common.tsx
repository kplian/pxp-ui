import { useCallback } from 'react';
import moment from 'moment';
/**
 * Common functions for use in another components
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * */
export const getUrlForView = ({ nameFile, folder, extension, size = null }) => {
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

export const formatNumber = ({ value }) => {
  const num = parseFloat(value);
  return num.toLocaleString('en-US');
};

export const currencyFormat = ({ value, currencyCode, withCode = true }) => {
  const num = parseFloat(value);
  const currency = currencyCode || process.env.REACT_APP_CURRENCY || '$';
  return `${withCode ? currency : ''}${num
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export const handleMouseTriggerComponent = (event) => event.preventDefault();

export const formatDateNow = (date) => {
  const dateCurrent = moment(date);
  const dateNow = moment();
  const diff = dateNow.diff(dateCurrent, 'days', true);
  if (diff === 1) {
    return 'ayer';
  }
  if (diff < 1) {
    return dateCurrent.fromNow();
  }
  return dateCurrent.format('DD/MM/YYYY');
};

export const formatDate = (date, format) => moment(date).format(format);
