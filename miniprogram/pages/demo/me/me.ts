import meStore from "../../../stores/demo/me-store";

Page({
  data: meStore.data,
  onLoad() {
    meStore.bind("me", this);
  },
  onShow() {
    meStore.getData();
    meStore.getTypeData();
  },
});
