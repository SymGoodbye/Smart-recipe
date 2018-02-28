var util = require("../../utils/util.js");
/* var processSearchData = require("menu-list/menu-list.js"); */
var local_database = require("../../data/data.js");
var app = getApp();

Page({
  data: {
    menus: {},
    containerShow: true,
    searchPanelShow: false,
    searchMenu :{},
  },
  onLoad: function (options) {
    var url_recipeClass = app.globalData.menusBase + "/recipe_class?" + app.globalData.appkey;
    util.http(url_recipeClass, this.processMenusData);
    /*     console.log(this.data.menus); */
  },

  processMenusData: function (data) {
/*      console.log(data); */
    if (!data) {
      return;
    }
    var cuisineName = new Array(9);
    var cuisineClass = new Array(9);
    for (var i = 0; i < cuisineName.length; i++) {
      cuisineName[i] = data.result.result[4].list[i].name;
      cuisineClass[i] = data.result.result[4].list[i].classid;
      //把从外部API获得 "cuisineName" "cuisineClass"属性赋值到本地地址 ""
      local_database.local_database[i].cuisineName = cuisineName[i];
      local_database.local_database[i].cuisineClass = cuisineClass[i];
    }
/*     console.log(local_database.local_database); */
    this.setData({
      menus: local_database.local_database
    });

  },

  //滑块试图容器触发函数，将cuisineClass传到 menu-list 中
  onSwiperTap: function (event) {
    var cuisineClass = event.target.dataset.cuisineclass;
    wx.navigateTo({
      url: 'menu-list/menu-list?id=' + cuisineClass
    })
  },
  onMenuListTap :function(event){
    var cuisineClass = event.currentTarget.dataset.cuisineclass;
    wx.navigateTo({
      url: 'menu-list/menu-list?id=' + cuisineClass
    })
  },

  //<input> bindfocus 触发函数
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },

  //<input> bindblur触发函数
  onBindBlur: function (event) {
    var scanner = event.detail.value;
    if(scanner){
      var searchBase = app.globalData.menusBase + "/search?keyword=" + scanner + "&num=20&" + app.globalData.appkey;
/*       console.log(searchBase); */
      util.http(searchBase, this.processSearchData);
    }
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
    })
  },

   processSearchData:function(data){
/*        console.log(data);   */
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
     this.setData({
       searchMenu: menu
     })

/*     console.log(menu); */
  },

    onMenuDetailTap: function (event) {
     var menuId = event.currentTarget.dataset.id;
     wx.navigateTo({
       url: 'menu-detail/menu-detail?id=' + menuId
     })
   },
});

