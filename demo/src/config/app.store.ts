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
  // login authentication
  login : '/services/basics/api/apilogon',
  userInfo: '/services/services/login/getuserinfo',
  companies: '/services/basics/company/getassignedcompanieswithroles',
  checkCompany: '/services/basics/company/checkcompany',
  getLanguages: '/services/cloud/common/getlanguages',
  LanguageInfo: '/services/cloud/common/getdatalanguageinfo',

  // project list
  getProjects: '/services/businesspartner/main/contact/mobility/getProjectSummaryItems',

  // defect list
  getDefectListByPid: '/services/defect/publicapi/main/1.0/getDefectListByProjectID',
  getDefectListByWord: '/services/defect/publicapi/main/1.0/getDefectListByKeyWord',

  // defect detail
  getDefectDetail: '/services/defect/publicapi/main/1.0/getDefectDetailByDefectId',
  getLookupEntity: '/services/defect/publicapi/main/1.0/getLookupEntityResult',

  // defect handle
  addDefect: '/services/defect/publicapi/main/1.0/insertDefect',
  editDefect: '/services/defect/publicapi/main/1.0/updateDefect',
  delDefect: '/services/defect/publicapi/main/1.0/deleteDefectById',
  defaultDefect: '/services/defect/publicapi/main/1.0/createRawDefect',

  // defect comments handle
  getComments: '/services/defect/publicapi/main/1.0/getCommentsByDefectId',
  getCommentChildren: '/services/defect/publicapi/main/1.0/getChildrenOfACommentById',
  addComment: '/services/defect/publicapi/main/1.0/insertComment',
  delComment: '/services/defect/publicapi/main/1.0/deleteComment',

  // defect images handle
  uploadImg: '/services/defect/publicapi/main/1.0/uploadImageForDefect',
  downloadImg: '/services/defect/publicapi/main/1.0/downloadAnImageOfADefect',
  getPicturesOfADefect: '/services/defect/publicapi/main/1.0/getPicturesOfADefect',
  delPicturesForDefect: '/services/defect/publicapi/main/1.0/deleteImagesForDefect'
};

const TIME = 10000;

export class AppStore extends CoreStore {
  api = API;
  time = TIME;
}



