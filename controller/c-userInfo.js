const userModel = require('../lib/mysql.js');
exports.userInfo = async (ctx) =>{
    let token = ctx.cookies.get('token');
    let {name} = ctx.request.body;
    let headerToken = ctx.request.header.token;
    if(token == headerToken){
        await userModel.findUserData(name).then((res)=>{
            ctx.body = {
                code: 200,
                message: '请求成功'
            }
        })
    }else{
        ctx.body = {
            code: 500,
            message: '请求失败'
        }
    }
    
}