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
  }
}
const pxp = new Pxp();
export default pxp;
