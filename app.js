const express = require('express');
//引入中间件
// const bodyParser = require('body-parser');
//引入路由器
const userRouter = require('./router/pro.js');



//创建服务器
const app = express();
//设置端口
let port = 5050;
// app.listen(5050);
app.use(express.static('static'));
app.get('/user', (req, res) => {
    pool.query('SELECT * FROM xz_user', (err, result) => {
        if (err) throw err;
        // 来自任何客户端都允许访问
        res.set('Access-Control-Allow-Origin', "*");
        res.json(result);
    });

});
//托管到静态资源public目录
// app.use(express.static('./public'));
//应用body-parser中间件，将post请求解析为对象
// app.use(bodyParser.urlencoded({
// 	extended:false
// }));

//挂载到服务器
app.use('/pro', userRouter);