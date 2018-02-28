var app = getApp();
var util = require("../../../utils/util.js")
Page({
  data: {
    menu: {},
    totalCount: 0,
    isEmpty: true,
    urlBase: "",
  },
  onLoad: function (options) {
    //不同的菜系有不同的 cuisineClass 根据 “cuisineClass”获得对应菜系的菜
    var cuisineClass = options.id;
    var urlBase = app.globalData.menusBase + app.globalData.byclass + cuisineClass;
    this.setData({
      urlBase: urlBase
    })
    var url = urlBase + "&start=0&num=10&" + app.globalData.appkey;
    util.http(url, this.processMenusData);
  },

  //上拉加载更多数据
  onReachBottom: function (event) {
    var nextUrl = this.data.urlBase + "&start=" + this.data.totalCount + "&num=10&" + app.globalData.appkey
    /*     console.log(nextUrl); */
    util.http(nextUrl, this.processMenusData);
    wx.showNavigationBarLoading(); //开启loading
  },

//下拉刷新，需要在 .json文件中设置   <"enablePullDownRefresh": "true">才有效
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.urlBase + "&start=0&num=10&" + app.globalData.appkey;
    //数据制空，不然重复加载
    this.data.menu = {};
    this.data.totalCount = 0;
    this.data.isEmpty = true;
    util.http(refreshUrl, this.processMenusData);
    wx.showNavigationBarLoading(); 
  },

  processMenusData: function (data) {
/*          console.log(data);  */
    if (!data) {
      return;
    }
    var menu = [];
    var result = data.result.result.list;
    //通过“ for in 循环遍历list中的每条信息
    for (var idx in result) {
      var resultData = result[idx];
      //判断tag 数据的长度
      var tag = resultData.tag;
      if (tag.length >= 10) {
        tag = tag.substring(0, 10) + "...";
      }
      //判断name数据的长度
      var name = resultData.name;
      if (name.length >= 6) {
        name = name.substring(0, 6) + "...";
      }
      var temp = {
        id: resultData.id,
        pic: resultData.pic,
        name: name,
        content: resultData.content,
        prepareTime: resultData.preparetime,
        cookingTime: resultData.cookingtime,
        peoplenum: resultData.peoplenum,
        tag: tag,
      }
      menu.push(temp);
    }
/*     console.log(menu); */
    var totalMenu = [];  //定义 totalMenu 来重复整合加载上拉加载的更多数据
    //如果 isEmpty不是空的 totalMenu整合这一次加载的menu数据
    if (!this.data.isEmpty) {
      totalMenu = this.data.menu.concat(menu);
    }
    //如果是第一次加载 menu直接赋值给totalMenu 并使isEmpty为false
    else {
      totalMenu = menu;
      this.data.isEmpty = false;
    }
/*     console.log(totalMenu); */
    this.setData({
      menu: totalMenu
    })
    this.data.totalCount += 10;
    wx.hideNavigationBarLoading(); //关闭loading
    wx.stopPullDownRefresh();//关闭下拉刷新
  },

  onMenuDetailTap: function (event) {
    var menuId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../menu-detail/menu-detail?id=' + menuId
    })
  },

/*   onReady: function (event) {      //页面标题
    wx.setNavigationBarTitle({   //动态设置标题栏
      title: "caipu"
    })
  }, */
})

/* module.exports = {
  processMenusData: processMenusData
} */