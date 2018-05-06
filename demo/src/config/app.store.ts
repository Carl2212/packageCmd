import { CoreStore } from "mobility-lib";
export const STORE_LIST = [
  'server',
  'clientContext',
  'authentication',
  'loginInfo',
  'user',
  'language',
  'isShowWelcome',
  'lastAppVersion',
  'enableProfile',
  'companyRole'
];

const API = {
};

const TIME = 10000;

export class AppStore extends CoreStore {
  api = API;
  time = TIME;
}



