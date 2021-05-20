/**
 *  interface ts接口  store 相关
 */

/**
 *  user store
 */
export interface userStore {
  user: string;
  status: string | number;
  code: string;
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: Array<any>;
  setting: {
    articlePlatform: Array<any>
  };
}