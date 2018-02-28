var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    collectedMenu: [],
    isEmpty: true, //用于判断collectedMenu是否为空，方便及时整合
  },
  onLoad: function (options) {
    var data = wx.getStorageSync("menus_collected");

    var collectedsId = new Array;
    var values = Object.values(data);
    console.log(values);
    var id = Object.keys(data);
    console.log(id);
    for (var i = 0; i < id.length; i++) {
      if (values[i]) {
        collectedsId.push(id[i])
      }
    }
/*     console.log(x); */


/*     var collectedsId = Object.keys(data); */
    var collectedUrl = new Array;
    for (var i = 0; i < collectedsId.length; i++) {
      collectedUrl[i] = app.globalData.menusBase + app.globalData.detailId + collectedsId[i] + "&" + app.globalData.appkey;
    }
    for (var i = 0; i < collectedsId.length; i++) {
      util.http(collectedUrl[i], this.processMenusData);
    }


  },
  processMenusData: function (data) {
    /*     console.log(data); */
    if (!data) {
      return;
    }
    var menu = [];
    var result = data.result.result;
    //判断tag 数据的长度
    var tag = result.tag;
    if (tag.length >= 10) {
      tag = tag.substring(0, 10) + "...";
    }
    //判断name数据的长度
    var name = result.name;
    if (name.length >= 6) {
      name = name.substring(0, 6) + "...";
    }
    var temp = {
      id: result.id,
      pic: result.pic,
      name: name,
      content: result.content,
      prepareTime: result.preparetime,
      cookingTime: result.cookingtime,
      peoplenum: result.peoplenum,
      tag: tag,
    }
    menu.push(temp);
    var totalMenu = [];
    if (this.data.isEmpty) {
      this.data.isEmpty = false;
      totalMenu = menu;
    }
    else {
      totalMenu = this.data.collectedMenu.concat(menu);
    }
    this.setData({
      collectedMenu: totalMenu
    })

  },
  onMenuDetailTap: function (event) {
    var menuId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../menus/menu-detail/menu-detail?id=' + menuId
    })
  },
  onTap: function (event) {
    console.log(this.data.collectedMenu);
  }
  /*     console.log(Object.keys(data)); //获取缓存Storage中的键名 即收藏的菜谱ID
      console.log(Object.keys(data).length); */

})