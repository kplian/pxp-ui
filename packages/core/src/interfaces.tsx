export declare interface IPage {
  path: string,
  component: any;
  noExact?: boolean; 
  detailPages?: IPage[];
}

export declare interface IPages {
  [page: string]: IPage;
}

export declare enum TypeMenu {
  leaf='leaf',
  folder='folder',
}

export declare interface Menu {
  code?: string;
  component: string;
  children?: Menu[];
  description?: string;
  uiId?: number;
  icon: string;
  text: string;
  type: TypeMenu;
};

export declare interface ConfigPxpUi {
  host: string;
  baseUrl: string;
  mode: string;
  port: number;
  protocol: string;
  webSocket: string;
  portWebSocket: number;
  recaptchaKey?: string;
  backendVersion?: string;
  backendRestVersion?: string;
  urlLogin: string;
  fieldsLogin?: any;
  applicationName: string;
  privateInitRoute: string;
  notFoundRoute: string;
  translations: any;
  menu: any;
  date: any;
  dateTime: any;
  defaultTheme: string;
  darkTheme: string;
  accountManagement: any;
  inMaintenance: boolean;
  customThemes: any[];
  customThemesList: any[];
}
