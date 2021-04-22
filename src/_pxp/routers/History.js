/**
 * Returns history object
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { createBrowserHistory } from 'history';

// if you want to integrate in subfile in producction you need to put base name
//export default createBrowserHistory({ basename: '/boa-kiu' });
export default createBrowserHistory({ basename: process.env.PUBLIC_URL });
