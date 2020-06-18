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
          console.log(method)
          switch (method){
              case "googleLogin":
                  this.nativeLogin(data);
                  break;
              case "facebookSignIn":
                  this.nativeSignIn(data);
                  break;
              case "facebookSignUp":
                  this.nativeSignUp(data);
                  break;
          }
      }
  }

  nativeSignIn(data){
      let response = JSON.parse(data);
      this.apiClient.oauthLogin(response.usuario, response.code, response.type).then((data) => {
          console.log("************")
          console.log(data);
          console.log(JSON.stringify(data));
          console.log("************")
      });
  }


  nativeSignUp(data){
      data = JSON.parse(data);
      let formData = new FormData();
      formData.append("name", data['name']);
      formData.append("surname", data['surname']);
      formData.append("email", data['email']);
      formData.append("token", data['token']);
      formData.append("url_photo", data['url_photo']);
      formData.append("login_type", data['login_type']);

      let requestOptions = {
          method: 'POST',
          headers: [],
          body: formData,
          redirect: 'follow'
      };

      let url = "http://dev.pxp.citas.kplian.com/lib/rest/seguridad/Auten/createTokenUser?";
      let params =
          "name=" + data['name'].split(" ")[0] + "&" +
          "surname=" + data['surname'] + "&" +
          "email=" + data['email'] + "&" +
          "token=" + data['token'] + "&" +
          "url_photo=" + data['url_photo'] + "&" +
          "login_type=" + data['login_type']

      fetch(url + params)
          .then(response => {
              console.log("response: ", response)
              console.log("responseText: ", response.text())
              response.text()
          })
          .then(result => {
              console.log("--------");
              console.log("result: ", result);
          })
          .catch(error => console.log('error', error));


  }

}
const pxp = new Pxp();
export default pxp;



