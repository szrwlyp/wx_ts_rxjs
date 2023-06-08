// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

import userStore from "../../stores/demo/user-store";

Page({
  data: userStore.data,
  userLoginData: {},

  onLoad() {
    userStore.bind("userPage", this);
  },
  onShow() {},

  getUserProfile() {
    userStore.getUserProfile();
  },
});
