const express = require('express')
let port = process.env.PORT || 3000;
const app = express()

// 设置视图的根目录
app.set('views', './views')

// 设置默认的模板引擎
app.set('view engine', 'jade')

// index page
// 给视图文件定义路由
app.get('/', function(req, res){
    // 第一个参数是视图文件名
    // 第二个参数是给这个视图文件传的参数对象
    res.render('index', {
        title: 'imooc 首页'
    })
})
// admin page
app.get('/admin/movie', function(req, res){
    res.render('admin', {
        title: 'imooc 后台录入页'
    })
})
// detail page
app.get('/movie/:id', function(req, res){
    res.render('detail', {
        title: 'imooc 详情页'
    })
})
// list page
app.get('/admin/list', function(req, res){
    res.render('list', {
        title: 'imooc 列表页'
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))