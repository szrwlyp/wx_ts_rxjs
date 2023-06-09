import { User } from "./user";
import { getSubscribeDevices, getPeripheralTypes } from "../../api/index";

export interface MeOptions {
  onMeInfoLoaded: () => void;
}

export class Me {
  deviceList: Array<any>;
  options: MeOptions;
  user: User;
  peripherals: Object;
  constructor(options?: MeOptions) {
    this.options = options as MeOptions;
    this.deviceList = [];
    this.peripherals = {};
    this.user = new User();
  }

  getDeviceList() {
    let that = this;

    // forkJoin([getSubscribeDevices(), getPeripheralTypes()]).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    // });

    getSubscribeDevices().subscribe({
      next: (res: any) => {
        let { code, data } = res;
        if (code === 0) {
          that.deviceList = data.devices;
          that.options.onMeInfoLoaded && that.options.onMeInfoLoaded();
        }
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    // this.user.wxLogin().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     getSubscribeDevices().subscribe({
    //       next: (res: any) => {
    //         let { code, data } = res;
    //         if (code === 0) {
    //           that.deviceList = data.devices;
    //           that.options.onMeInfoLoaded && that.options.onMeInfoLoaded();
    //         }
    //         console.log(res);
    //       },
    //     });
    //   },
    // });
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
