import Mock from 'mockjs';


Mock.mock('/api/addGoods', 'post', function (option) {
  //请求相关的参数
  let context = JSON.parse(option.body);
  if (context.account == 'admin@gmail.com' && context.password == 'admin') {
    return Mock.mock({
      status: 200,
      message: 'success'
    })
  } else {
    return Mock.mock({
      status: 401,
      message: 'fail'
    })
  }

})