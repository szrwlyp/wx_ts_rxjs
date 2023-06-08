import { Store } from "westore";
import { User } from "../../models/demo/user";
import { Me } from "../../models/demo/me";

class MeStore extends Store<Pick<Me, "deviceList" | "peripherals">> {
  user: User;
  me: Me;
  constructor() {
    super();
    this.data = {
      deviceList: [],
      peripherals: {},
    };

    this.user = new User();
    console.log(this.user);
    this.me = new Me({
      onMeInfoLoaded: () => {
        console.log(this.me);
        this.data.deviceList = this.me.deviceList;
        this.data.peripherals = this.me.peripherals;
        this.update("me");
        wx.hideLoading();
      },
    });
  }

  getData() {
    wx.showLoading({ title: "加载中..." });

    this.me.getDeviceList();
  }

  getTypeData() {
    this.me.getPeripheralTypes();
  }
}

let meStore = new MeStore();
export default meStore;
