import { Observable, retry, timer, delay } from "rxjs";
import { BASE_URL } from "../config/index";
import { HttpAttribute, HttpParameter, HttpMethod } from "./types";
import userStore from "../stores/demo/user-store";

/**
 * Http状态码有：1xx，2xx，3xx，4xx，5xx。
 * 根据状态码第一个字符来执行相应的函数。函数内部还能具体，比如：403，404等等。
 */
// 未登录
const NotLogin = -3;
let NotLoginNum = 0;
const HttpStatus = new Map([
  [
    "1",
    (subscriber: any, res: any) => {
      subscriber.next(res);
      subscriber.complete();
    },
  ],
  [
    "2",
    (subscriber: any, res: any) => {
      // console.log(res);

      if (res.code === 0) {
        subscriber.next(res);
        subscriber.complete();
      }
      if (res.code === NotLogin) {
        ++NotLoginNum;
        if (NotLoginNum === 1) {
          userStore.user.wxLogin().subscribe({
            next: (res) => {
              console.log(res);
              subscriber.error("用户未登录");
              NotLoginNum = 0;
            },
            error: (err) => {
              subscriber.next(err);
              subscriber.complete();
            },
          });
        } else {
          subscriber.error();
        }
      }
    },
  ],
  [
    "3",
    (subscriber: any, res: any) => {
      subscriber.next(res);
      subscriber.complete();
    },
  ],
  [
    "4",
    (subscriber: any, res: any) => {
      console.log(404);
      // subscriber.next(res);
      // subscriber.complete();
      subscriber.error(res);
    },
  ],
  [
    "5",
    (subscriber: any, err: any) => {
      subscriber.error(err);
      subscriber.complete();
    },
  ],
  [
    "error",
    (subscriber: any, err: any) => {
      subscriber.error(err);
      subscriber.complete();
    },
  ],
]);

console.log(BASE_URL());

// https://vpascare.com/api/
export default class Http {
  private base_url = BASE_URL();
  private url = "";
  private data = {};
  private method: HttpMethod = "GET";
  private header = {
    "content-type": "application/json",
  };
  constructor(parameter: HttpParameter) {
    let { data, url, method } = parameter;
    this.data = data;
    this.url = url;
    this.method = method;
  }

  public request() {
    let { base_url, url, data, method, header } = this;
    return new Observable((subscriber) => {
      wx.request({
        url: base_url + url,
        data: { ...data, sessionid: wx.getStorageSync("sessionId") },
        timeout: 30000,
        method,
        header,
        success(res) {
          // console.warn("接口请求成功1：", res);

          let statusToString = res.statusCode.toString(),
            firstStr = statusToString.charAt(0);

          if (HttpStatus.has(firstStr)) {
            HttpStatus.get(firstStr)!(subscriber, res.data);
          } else {
            HttpStatus.get("error")!(subscriber, res.data);
          }
        },
        fail(err) {
          console.warn("接口请求失败：", err);
          HttpStatus.get("error")!(subscriber, err);
        },
      });
    }).pipe(
      retry({
        count: 2,
        delay: (_error, retryCount) => {
          console.warn(
            `第${retryCount}次重试。重试的时间间隔${Math.pow(2, retryCount)}秒`
          );

          // const random_number_milliseconds = Math.floor(Math.random() * 1000);
          // console.log(
          //   Math.pow(2, retryCount) * 1000 + random_number_milliseconds
          // );
          // 返回再次执行的通知函数（必须）
          return timer(Math.pow(2, retryCount) * 1000);
        },
      })
    );
  }
}
