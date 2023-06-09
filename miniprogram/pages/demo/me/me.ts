import meStore from "../../../stores/demo/me-store";

import userStore from "../../../stores/demo/user-store";
Page({
  data: meStore.data,
  onLoad() {
    meStore.bind("me", this);
  },
  onShow() {
    console.log("me-show");
    userStore.user.wxLogin().subscribe((next) => {
      console.log(next);
      meStore.getData();
      meStore.getTypeData();
    });
  },
});
