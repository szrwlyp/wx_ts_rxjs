import { Store } from "westore";
import { User, UserOptions } from "../../models/demo/user";

class UserStore extends Store<Pick<User, "motto" | "userInfo">> {
  options: UserOptions | undefined;
  user: User;
  constructor(options?: UserOptions) {
    super();
    this.options = options;
    this.data = {
      motto: "1111",
      userInfo: {},
    };

    this.user = new User({
      onUserInfoLoaded: () => {
        console.log(this.user);
        this.data.motto = this.user.motto;
        this.data.userInfo = this.user.userInfo;
        console.log(this.user.userInfo);
        this.update();
        // this.update("userPage");
      },
    });
    console.log(this.user);
  }

  async getUserProfile() {
    let user: any = await this.user.getUserProfile1();
    this.data.userInfo = user.userInfo;
    this.update();
  }
}

const userStore = new UserStore();
export default userStore;
