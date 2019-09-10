import ApiUtils from './ApiUtils';

export default class TypeUtils {

  public static isUUID(val: string) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(val);
  }

  public static toBoolean(val: any) {
    return (typeof val === 'boolean') ? val : Boolean(val);
  }

  public static toIntPath(obj: any, path: string, def: number = 0) {
    return TypeUtils.toInt(ApiUtils.getValue(obj, path), def);
  }

  public static toInt(obj: any, def: number = 0) {
    return obj === null || isNaN(obj) ? def : Number(obj);
  }

  public static toFloat(num: any, def: number = 0) {
    return num === null || isNaN(num) ? def : parseFloat(num);
  }

  public static toFloatPath(obj: any, path: string, def: number = 0) {
    return TypeUtils.toFloat(ApiUtils.getValue(obj, path), def);
  }

  public static toStringPath(obj: any, path: string, def: string = '') {
    return TypeUtils.toString(ApiUtils.getValue(obj, path), def);
  }

  public static toString(str: any, def: string = '') {
    return str === null || str === undefined ? def : String(str);
  }

}
