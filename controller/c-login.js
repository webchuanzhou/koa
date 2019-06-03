const userModel = require('../lib/mysql.js');
const md5 = require('md5')
const addtoken = require('../lib/addtoken');
exports.login = async ctx =>{
    let {name , password } = ctx.request.body;
    await userModel.findDataByName(name).then(res=>{
        if(res.length<=0){
            ctx.body = {
                code: 500,
                message: '用户名不存在'
            }
        }else if(res[0].pass == md5(password) ){
            ctx.cookies.set('userId', res[0].id,{maxAge:1000*60*60})
            // ctx.cookies.set('userName', res[0].name,{maxAge:1000*60*60})
            // ctx.cookies.set('token', res[0].name+res[0].id,{maxAge:1000*60*60});
            let tokens = addtoken({user:res[0].name,id:res[0].id})
            ctx.body = {
                code: 200,
                data:{
                    token:tokens,
                },
                message: '登录成功'
            }
        }else{
            ctx.body = {
                code: 500,
                message: '密码错误'
            }
        }
    })
}