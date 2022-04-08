export default {
  pages: [
    // 'pages/mySubPages/myOrders/myOrders',
    'pages/home/home',
    'pages/searchResult/searchResult',
    'pages/generatePhoto/generatePhoto',
    'pages/my/my',
    'pages/photo/photo',
    'pages/postAddress/postAddress',
    'pages/photoDetail/photoDetail',
    'pages/changeBg/changeBg',
    'pages/customSize/customSize',
    'pages/payResult/payResult',
    'pages/mySubPages/channelCooperation/channelCooperation',
    'pages/mySubPages/myBalance/myBalance',
    'pages/mySubPages/myOrders/myOrders',
    'pages/mySubPages/problems/problems',
    'pages/mySubPages/address/address',
    'pages/mySubPages/pointsRecord/pointsRecord',
    'pages/webview/webview',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    color: "#333333",
    selectedColor: "#0d96d6",
    backgroundColor: "#fff",
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/home',
        iconPath: 'assets/tabBar/store.png',
        selectedIconPath: 'assets/tabBar/store-selected.png',
        text: '首页'
      },
      {
        pagePath: 'pages/photo/photo',
        iconPath: 'assets/tabBar/all.png',
        selectedIconPath: 'assets/tabBar/all-selected.png',
        text: '证件照'
      },
      // {
      //   pagePath: 'pages/index/index',
      //   iconPath: 'assets/tabBar/cart.png',
      //   selectedIconPath: 'assets/tabBar/cart-selected.png',
      //   text: '购物车'
      // },
      {
        pagePath: 'pages/my/my',
        iconPath: 'assets/tabBar/smile.png',
        selectedIconPath: 'assets/tabBar/smile-selected.png',
        text: '我的'
      }
    ]
  }
}
