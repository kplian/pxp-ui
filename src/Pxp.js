/**
 * This singleton contains common pxp-ui functionality and information such as:
 * Config
 * ApiClient
 * EventsHandler
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * */
import config from './config';

class Pxp {
  constructor() {
    if (!Pxp.instance) {
      Pxp.instance = this;
      // envents callbacks
      this.callbacks = {};

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
   * @param {string} eventName name of event
   * @param {string} id callback identifier
   */
  unlistenEvent(eventName, id) {
    delete this.callbacks[eventName][id];
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
        case 'googleSignUp':
          this.nativeSignUp(data);
          break;
        case 'facebookSignIn':
          this.nativeSignIn(data);
          break;
        case 'facebookSignUp':
          this.nativeSignUp(data);
          break;
        case 'vouzSignIn':
          this.vouzSignIn(data);
          break;
        case 'userCurrentPosition':
          this.getCurrentPosition(data);
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
      if (res.success && isWebView && window.Mobile) {
        window.Mobile.hideLoadingDialog();
        window.Mobile.saveWebSocketURL(
          `ws://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}?sessionIDPXP=${res.phpsession}`,
          res.id_usuario,
          res.nombre_usuario,
        );
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
        if (
          isWebView &&
          window.Mobile &&
          process.env.REACT_APP_WEB_SOCKET === 'YES'
        ) {
          window.Mobile.saveWebSocketURL(
            `ws://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}?sessionIDPXP=${res.phpsession}`,
            res.id_usuario,
            res.nombre_usuario,
          );
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getCurrentPosition(data) {
    localStorage.setItem('currentLocation', data);
  }
}

const pxp = new Pxp();
export default pxp;
