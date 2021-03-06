// @ts-nocheck
/**
 * This singleton contains common pxp-ui functionality and information such as:
 * Config
 * ApiClient
 * EventsHandler
 * @copyright Kplian Ltda 2020
 * @author Jaime Rivera
 * */
import config from './config';

class Pxp {
  constructor() {
    if (!Pxp.instance) {
      Pxp.instance = this;
      // events callbacks
      this.callbacks = {};
      this.callbacksMobileFocus = {};

      // config
      this.config = config;

      //
      this.apiClient = null;
    }
    return Pxp.instance;
  }

  /**
   * @param {string} eventName
   * @param {*} data
   */
  triggerEvent(eventName, data = null) {
    if (this.callbacks[eventName]) {
      Object.keys(this.callbacks[eventName]).forEach((id) => {
        this.callbacks[eventName][id](data);
      });
    }
  }

  /**
   * @param {string} eventName name of event
   * @param {string} id callback identifier
   * @param {Function} callback
   */
  listenEvent(eventName, id, callback) {
    this.callbacks[eventName] = { [id]: callback };
  }

  /**
   * @param {string} id callback identifier
   * @param {Function} callback
   */
  listenMobileFocus(id, callback) {
    this.callbacksMobileFocus[id] = callback;
  }

  /**
   * @param {string} eventName name of event
   * @param {string} id callback identifier
   */
  unlistenEvent(eventName, id) {
    delete this.callbacks[eventName][id];
  }

  /**
   * @param {string} eventName name of event
   * @param {string} id callback identifier
   */
  unListenMobileFocus(id) {
    delete this.callbacksMobileFocus[id];
  }

  /**
   * @param {Object} client api client to be used in the application
   */
  setApiClient(client) {
    this.apiClient = client;
    global.callMethodFromDevice = (method, data) => {
      switch (method) {
        case 'googleSignIn':
          this.nativeSignIn(data);
          break;
        case 'facebookSignIn':
          this.nativeSignIn(data);
          break;
        case 'vouzSignIn':
          this.vouzSignIn(data);
          break;
        case 'userCurrentPosition':
          this.getCurrentPosition(data);
          break;
        case 'onMobileFocusIn':
          this.onMobileFocusIn();
          break;
        case 'userFirebaseToken':
          this.setUserFirebaseToken(data);
          break;
        default:
          break;
      }
    };
  }

  vouzSignIn(data) {
    const response = JSON.parse(data);
    this.apiClient.login(response.username, response.password).then((res) => {
      const isWebView = navigator.userAgent.includes('wv');

      const userAgent = window.navigator.userAgent.toLowerCase();
      const safari = /safari/.test(userAgent);
      const ios = /iphone|ipod|ipad/.test(userAgent);

      const iOSWebView = ios && !safari;

      if (res.success && isWebView && window.Mobile) {
        window.Mobile.hideLoadingDialog();
        window.Mobile.saveWebSocketURL(
          `wss://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}/wss?sessionIDPXP=${res.phpsession}`,
          res.id_usuario,
          res.nombre_usuario,
        );
      } else if (res.success && iOSWebView && window.webkit) {
        window.webkit.messageHandlers.hideLoadingDialog.postMessage({
          data: '',
        });
        window.webkit.messageHandlers.saveWebSocketURL.postMessage({
          socket: `wss://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}/wss?sessionIDPXP=${res.phpsession}`,
          id_usuario: res.id_usuario,
          nombre_usuario: res.nombre_usuario,
        });
      }
    });
  }

  nativeSignIn(data) {
    const response = JSON.parse(data);
    this.apiClient
      .oauthLogin(
        response.userId,
        response.token,
        response.name,
        response.surname,
        response.email,
        response.url_photo,
        response.type,
        response.device,
        response.language,
      )
      .then((res) => {
        const isWebView = navigator.userAgent.includes('wv');

        const userAgent = window.navigator.userAgent.toLowerCase();
        const safari = /safari/.test(userAgent);
        const ios = /iphone|ipod|ipad/.test(userAgent);

        const iOSWebView = ios && !safari;

        if (
          isWebView &&
          window.Mobile &&
          process.env.REACT_APP_WEB_SOCKET === 'YES'
        ) {
          window.Mobile.saveWebSocketURL(
            `wss://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}/wss?sessionIDPXP=${res.phpsession}`,
            res.id_usuario,
            res.nombre_usuario,
          );
        } else if (
          iOSWebView &&
          window.webkit &&
          process.env.REACT_APP_WEB_SOCKET === 'YES'
        ) {
          window.webkit.messageHandlers.saveWebSocketURL.postMessage({
            socket: `wss://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}/wss?sessionIDPXP=${res.phpsession}`,
            id_usuario: res.id_usuario,
            nombre_usuario: res.nombre_usuario,
          });
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getCurrentPosition(data) {
    localStorage.setItem('currentLocation', data);
  }

  onMobileFocusIn() {
    Object.keys(this.callbacksMobileFocus).forEach((id) => {
      this.callbacksMobileFocus[id]();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  setUserFirebaseToken(data) {
    const response = JSON.parse(data);
    localStorage.setItem('deviceID', response.token);
  }
}

const pxp = new Pxp();
export default pxp;
