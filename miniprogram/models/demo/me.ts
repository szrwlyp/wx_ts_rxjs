import { forkJoin } from "rxjs";
import { getSubscribeDevices, getPeripheralTypes } from "../../api/index";

export interface MeOptions {
  onMeInfoLoaded: () => void;
}

export class Me {
  deviceList: Array<any>;
  options: MeOptions;
  peripherals: Object;
  constructor(options?: MeOptions) {
    this.options = options as MeOptions;
    this.deviceList = [];
    this.peripherals = {};
  }

  // 判断设备列表是否改变
  static isDeviceChange = false;
  static deviceChange() {
    Me.isDeviceChange = true;
  }
  static staticDeviceList = [];

  // 合并请求接口
  getMergeRequestApi() {
    forkJoin([getSubscribeDevices(), getPeripheralTypes()]).subscribe({
      next: (res: any[]) => {
        console.log(res);
        let [deviceList, PeripheralTypes] = res;
        if (deviceList.code === 0) {
          this.deviceList = deviceList.data.devices;
          Me.staticDeviceList = deviceList.data.devices;
          Me.isDeviceChange = false;
        }
        if (PeripheralTypes.code === 0) {
          this.peripherals = PeripheralTypes.data.peripherals;
        }
        this.options.onMeInfoLoaded && this.options.onMeInfoLoaded();
      },
      error: (err) => {
        console.log(err);

        this.getPeripheralTypes();
        this.getDeviceList();
      },
    });
  }

  // 获取设备列表
  getDeviceList() {
    let that = this;

    if (Me.staticDeviceList.length && !Me.isDeviceChange) {
      that.deviceList = Me.staticDeviceList;
      that.options.onMeInfoLoaded && that.options.onMeInfoLoaded();
      return;
    }
    getSubscribeDevices().subscribe({
      next: (res: any) => {
        let { code, data } = res;
        if (code === 0) {
          that.deviceList = data.devices;
          Me.staticDeviceList = data.devices;
          Me.isDeviceChange = false;
          that.options.onMeInfoLoaded && that.options.onMeInfoLoaded();
        }
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getPeripheralTypes() {
    let that = this;
    getPeripheralTypes().subscribe({
      next: (res: any) => {
        console.log(res);
        let { code, data } = res;
        if (code === 0) {
          that.peripherals = data.peripherals;
          that.options.onMeInfoLoaded && that.options.onMeInfoLoaded();
        }
      },
    });
  }
}
