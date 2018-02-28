var app = getApp();
Page({
  data: {
    formData: "",
    success: false
  },
  onLoad: function (opions) {
  },

  OnBackTap: function (event) {
    if (this.data.success) {
      app.globalData.loginSuccess = true;
      app.globalData.userName = this.data.formData.userName;
      app.globalData.password = this.data.formData.password;
      wx.showModal({
        title: '注册成功',
        content: '请返回登录！',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            }) 
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
/*       wx.showToast({
        title: '注册成功',
        duration: 5000,
        icon: "success",
           success:function(){
          wx.navigateBack({
            delta:1
          }) 
        }  
      }) */
/*          wx.navigateBack({
          delta: 1
        })  */
    }
  },

  formSubmit: function (event) {
    var that = this;
    var formData = event.detail.value;

    //"userName"和 "password"用正则表达式判断格式
    if (!/^[0-9a-zA-Z\_]{1,10}$/.test(formData.userName)) {
      wx.showModal({
        title: '注册失败',
        content: '用户名不符合规范',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      })
/*       console.log("userName 不符合规范"); */
    }
    else {
      if (!/^[0-9a-zA-Z\_]{6,12}$/.test(formData.password)) {
        wx.showModal({
          title: '注册失败',
          content: '密码不符合规范',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
        })
/*         console.log("password 不符合规范"); */
      }
      else {
        if (formData.password == formData.Next_password) {
          this.data.success = true;
          this.setData({
            formData: formData
          })
            var data="2";
          /* wx.request({
            url: 'http://192.168.137.1:8000/insert/',
            method:"POST",
            data: {
              data: formData
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log("老哥厉害了！成功！")
            }
          }) */
        }

        else {
          wx.showModal({
            title: '注册失败',
            content: '两次密码不一致',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
          })
/*           console.log("两次密码不一致"); */
        }
      }
    }
    /*     wx.request({
          url: '',
          data: formData,
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.modalTap();
          }
        }) */
  }
})  