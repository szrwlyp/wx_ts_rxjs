import { Store } from "westore";
import { User, UserOptions } from "../../models/demo/user";
import { Me } from "../../models/demo/me";

class UserStore extends Store<{
  motto: string;
  userInfo: object;
  deviceList: any[];
  peripherals: object;
}> {
  options: UserOptions | undefined;
  user: User;
  me: Me;
  userLoginInfo: object;
  constructor(options?: UserOptions) {
    super();
    this.options = options;
    this.data = {
      motto: "1111",
      userInfo: {},
      deviceList: [],
      peripherals: {},
    };
    this.userLoginInfo = {};

    this.user = new User({
      onUserInfoLoaded: () => {
        console.log(this.user);
        this.data.motto = this.user.motto;
        this.data.userInfo = this.user.userInfo;
        this.userLoginInfo = this.user.userLoginInfo;
        console.warn("onUserInfoLoaded：", this.user);
        this.update();
        // this.update("userPage");
      },
    });
    this.me = new Me({
      onMeInfoLoaded: () => {
        console.log(this.me);
        this.data.deviceList = this.me.deviceList;
        this.data.peripherals = this.me.peripherals;
        this.update();
      },
    });
    console.log(this.user);
  }

  // 初始化页面数据
  init() {
    this.user.wxLogin().subscribe((next) => {
      console.log(next);
      this.me.getDeviceList();
      this.me.getPeripheralTypes();
    });
  }

  async getUserProfile() {
    let user: any = await this.user.getUserProfile1();
    this.data.userInfo = user.userInfo;
    this.update();
  }
}

const userStore = new UserStore();
export default userStore;
