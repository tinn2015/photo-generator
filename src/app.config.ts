export default {
  pages: [
    'pages/home/home',
    'pages/searchResult/searchResult',
    'pages/generatePhoto/generatePhoto',
    'pages/my/my',
    'pages/photo/photo',
    'pages/postAddress/postAddress',
    'pages/photoDetail/photoDetail',
    'pages/index/index',
    'pages/demo/index',
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
    selectedColor: "#69c0ff",
    backgroundColor: "#fff",
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/home',
        iconPath: 'assets/tabBar/home.png',
        selectedIconPath: 'assets/tabBar/home-selected.png',
        text: '首页'
      },
      {
        pagePath: 'pages/photo/photo',
        iconPath: 'assets/tabBar/photo.png',
        selectedIconPath: 'assets/tabBar/photo-selected.png',
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
        iconPath: 'assets/tabBar/my.png',
        selectedIconPath: 'assets/tabBar/my-selected.png',
        text: '我的'
      }
    ]
  }
}
