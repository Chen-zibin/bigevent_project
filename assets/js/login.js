$(function () {
  //点击去注册账号链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  //从layui中获取form对象
  let form = layui.form;
  let layer = layui.layer;
  //通过form.verify()函数定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        console.log(pwd)
        return '两次输入的密码不一致！'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (ev) {
    ev.preventDefault()
    //发起ajax的post请求
    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        // return console.log(res.message);
        return layer.msg(res.message)
      }
      // console.log('注册成功了');
      layer.msg('注册成功')

      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  //监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'post',
      data: $(this).serialize(), //快速获取表单的数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token',res.token)
        //跳转后台主页
        location.href = './index.html';
      }
    })
  })
})