/**
 * 当前环境配置
 */
export const BASE_URL = () => {
  let {
    miniProgram: { envVersion },
  } = wx.getAccountInfoSync();
  console.log(envVersion);
  switch (envVersion) {
    case "develop": //开发版
      return `https://vpascare.com/api/`;

    case "trial": //体验版
      return `https://vpascare.com/api/`;

    case "release": //正式版
      return `https://vpascare.com/api/`;
  }
};

// appid
export const APP_ID = "wx546cf0535ad27d74";
