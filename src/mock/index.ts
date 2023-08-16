import Mock from 'mockjs';
//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}
// 模拟登录接口
Mock.mock('/api/user/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
        //调用获取用户信息函数,用于判断是否有此用户
        const checkUser = createUserList().find(
            (item) => item.username === username && item.password === password,
        )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
});

// 模拟获取用户信息接口
Mock.mock('/api/user/info', 'get', (request:any) => {

    // const token = options.Authorization;
  // 验证token
 //查看用户信息是否包含有次token用户
  const checkUser = createUserList().find((item) => item.token === 'Admin Token')
  //没有返回失败的信息
  if (!checkUser) {
      return { code: 201, data: { message: '获取用户信息失败' } }
  }
  //如果有返回成功信息
  return { code: 200, data: {checkUser} }
});
// 导出Mock对象
export default Mock;