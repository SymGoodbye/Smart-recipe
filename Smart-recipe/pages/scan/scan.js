var app = getApp()
Page({
  data: {
    show: "",
  },

  onLoad: function () {
    console.log(this.data.show)
  },

/*   tryTap: function (event) {
    wx.request({
      url: "http://192.168.137.1:8000/show/",
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  giveTap:function(event){
    var formData="ni hao a"
    wx.request({
      url: 'http://192.168.137.1:8000/insert/',
      method: "POST",
      data: {
        data: formData
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }, */

  click: function () {
    wx.scanCode({
      success: (res) => {
        /*             this.show = "--result:" + res.result + "--scanType:" + res.scanType + 
                "--charSet:" + res.charSet + "--path:" + res.path;   */
        this.data.show = JSON.parse(res.result);
        console.log(this.data.show)
        /*          console.log(res.result);  */
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  }

})
