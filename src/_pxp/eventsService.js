/**
 * Singleton Events Service object
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
class EventsService {
  constructor() {
    if (!EventsService.instance) {
      EventsService.instance = this;
      this.callbacks = {};
    }
    return EventsService.instance;
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
}

const eventsService = new EventsService();
export default eventsService;
