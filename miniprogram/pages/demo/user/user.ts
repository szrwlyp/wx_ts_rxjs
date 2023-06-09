// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

import userStore from "../../../stores/demo/user-store";

Page({
  data: userStore.data,

  onLoad() {
    /* 绑定 view 到 store 
      也可以给 view 取名 userStore.bind('userPage', this)
      取名之后在 store 里可通过 this.update('userPage') 更新 view
      不取名可通过 this.update() 更新 view
    */
    // userStore.bind("userPage", this);
    userStore.bind(this);
  },
  onShow() {
    userStore.init();
  },

  getUserProfile() {
    userStore.getUserProfile();
  },
});
