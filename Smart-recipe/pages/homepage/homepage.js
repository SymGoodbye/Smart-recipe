var app = getApp();
Page({
  data: {
    logining: true,
    loginSuccess: false,
    userName:'',
    password:'',
  },
  onLoad: function (options) {
    /*     var pageData=getCurrentPages();
      console.log(pageData); */
  },

  OnloginTap: function (event) {
    wx.navigateTo({
      url: 'login/login',
    })
    /*     this.setData({
          logining: false,
          loginSuccess: true,
        }) */
  },
  OnBindTap: function (event) {
    console.log(app.globalData.userName + app.globalData.password)
    this.setData({
      userName: app.globalData.userName,
      password: app.globalData.password,
    })
    if (app.globalData.loginSuccess) {
      this.setData({
        logining: false,
        loginSuccess: true,
      })
    }
    else{
      wx.showModal({
        title: '登录失败',
        content: '您还没有注册！',
      })
    }
  },
  onCollectedTap :function(event){
    wx.navigateTo({
      url: 'collected/collected',
    })
  }

})
