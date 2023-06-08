import { of, switchMap } from "rxjs";
import Http from "../http/index";
import { HttpParameter } from "../http/types";

export function login(data: any) {
  let params: HttpParameter = {
    data,
    url: "wxService/wxLogin",
    method: "POST",
  };
  return new Http(params).request();
}
export function getSubscribeDevices(data?: any) {
  let params: HttpParameter = {
    data,
    url: "wxSubscribeService/getSubscribeDevices",
    method: "POST",
  };
  return new Http(params).request();
}

export function getPeripheralTypes(data?: any) {
  let params: HttpParameter = {
    data,
    url: "deviceService/getPeripheralTypes",
    method: "POST",
  };
  return new Http(params).request();
}
