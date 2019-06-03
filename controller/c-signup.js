const userModel = require('../lib/mysql.js');
const md5 = require('md5')
exports.postSignup = async ctx => {
    let { name, password, repeatpass } = ctx.request.body
    //第一次调用数据库查询名字是否存在
    await userModel.findDataCountByName(name)
        .then(async (result) => {
            if (name.trim() === '') {
                ctx.body = {
                    code: 500,
                    message: '手机号或者邮箱不能为空'
                };
            }else if (password !== repeatpass || password.trim() === '') {
                ctx.body = {
                    code: 500,
                    message: '两次输入的密码不一致'
                };
            } else if (result[0].count >= 1) {
                // 用户存在
                ctx.body = {
                    code: 500,
                    message: '用户存在'
                };
            }else {
                await userModel.insertData([name, md5(password),])
                    .then(res => {
                    console.log('注册成功', res)
                    //注册成功
                    ctx.body = {
                        code: 200,
                        message: '注册成功'
                    };
                })
            }
        })
}
