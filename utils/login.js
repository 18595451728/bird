const app = getApp(),r = require('../utils/request.js'),u=app.globalData.url

function checkLogin(){
  wx.checkSession({
    success:function(){},
    fail:function(){
      login();
    }
  })
}
function login(callback){
  wx.login({
    success: function (res) {
      console.log(res.code)
      wx.getUserInfo({
        success:function(re){
          var data = {
            code: res.code,
            encryptedData: re.encryptedData,
            iv: re.iv
          }
          r.req(u + '/api/Wx/wxlogins', data, 'post').then(function (e) {
            console.log(e)
            callback(e.data.token)
          })
        }
      })
      
    }
  })

}
module.exports={
  checkLogin,
  login
}