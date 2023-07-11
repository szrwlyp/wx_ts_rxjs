import { Store } from "westore";
import { User } from "../../models/demo/user";
import { Me } from "../../models/demo/me";

class MeStore extends Store<{ deviceList: any[]; peripherals: object }> {
  user: User;
  me: Me;
  constructor() {
    super();
    this.data = {
      deviceList: [],
      peripherals: {},
    };

    this.user = new User({
      onUserInfoLoaded: () => {
        console.log(this.user);
      },
    });
    this.me = new Me({
      onMeInfoLoaded: () => {
        console.log(this.me);
        this.data.deviceList = this.me.deviceList;
        this.data.peripherals = this.me.peripherals;
        this.update("me");
      },
    });
  }
  // 初始化页面数据
  init() {
    this.user.wxLogin().subscribe((next) => {
      console.log(next);
      this.me.getMergeRequestApi();
    });
  }
  addDevice() {
    Me.deviceChange();
    setTimeout(() => {
      this.me.getDeviceList();
    }, 1000);
  }
}

let meStore = new MeStore();
export default meStore;
