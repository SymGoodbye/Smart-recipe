var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    menuDetail: {},
/*     collected : false, */
    currentMenuId :""
  },
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      currentMenuId: id
    })
    /*     console.log(id); */
    var menuId = id.substring(0, ) + "&";
    var detailUrl = app.globalData.menusBase + app.globalData.detailId + menuId + app.globalData.appkey;
    util.http(detailUrl, this.processMenusData);


    //缓存的代码
    var menusCollected = wx.getStorageSync("menus_collected");
    if (menusCollected) {
      var menuCollected = menusCollected[id]
/*       console.log(id) */
      this.setData({
        collected: menuCollected
      })
    }
    else {
      var menusCollected = {};
      menusCollected[id] = false;
      wx.setStorageSync("menus_collected", menusCollected)
    }

  },
  processMenusData: function (data) {
    /*     console.log(data); */
    if (!data) {
      return;
    }
    var result = data.result.result;
    //把 "mname"、"amount"两属性赋给material
    var amount = [];
    var mname = [];
    for (var idx in result.material) {
      amount[idx] = result.material[idx].amount;
      mname[idx] = result.material[idx].mname;
    }
    var material = {
      amount: amount,
      mname: mname
    }
    //把 "pcontent"、"pic"两属性赋给process
    var pcontent = [];
    var pic = [];
    for (var idx in result.process) {
      pcontent[idx] = result.process[idx].pcontent;
      pic[idx] = result.process[idx].pic;
    }
    var process = {
      pcontent: pcontent,
      pic: pic
    }
    var menuDetail = {
      content: result.content,
      cookingTime: result.cookingtime,
      name: result.name,
      peopleNum: result.peoplenum,
      pic: result.pic,
      prepareTime: result.preparetime,
      tag: result.tag,
      material: material,
      process: process,
    }
    this.setData({
      menuDetail: menuDetail
    })
/*     console.log(this.data.menuDetail); */
  },

  //收藏按钮的触发函数~
  onCollectionTap: function (event) {
    var menusCollected = wx.getStorageSync("menus_collected");
    var menuCollected = menusCollected[this.data.currentMenuId];
    menuCollected = !menuCollected;
    menusCollected[this.data.currentMenuId] = menuCollected;
    wx.setStorageSync("menus_collected", menusCollected);
/*     console.log(menuCollected);
    console.log(menusCollected); */
    this.setData({
      collected: menuCollected
    })
    wx.showToast({
      title: menuCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  //分享按钮的触发函数~
   onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户 " + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  }, 

/*   onShareTap: function (event){
     var data = wx.getStorageSync("menus_collected")
    console.log(Object.keys(data));
  } */
})