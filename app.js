const express = require('express')
var path = require('path');
// 引入mongoose
var mongoose = require('mongoose')
// 加载movie模型
var Movie = require('./models/movie')
var _ = require('underscore')
let port = process.env.PORT || 3000;
const app = express()

// 建立数据库连接
// mongodb：连接的数据库类型
// localhost: 数据库地址
// imooc: 数据库名字
mongoose.connect('mongodb://localhost/imooc')

// 设置视图的根目录
app.set('views', './views/pages')

// 设置默认的模板引擎
app.set('view engine', 'jade')

// 将表单数据格式化
// app.use(express.bodyParser())
// 引用静态文件设置路径地址
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'public')))
// index page
// 给视图文件定义路由
app.get('/', function(req, res){
    // 第一个参数是视图文件名
    // 第二个参数是给这个视图文件传的参数对象
    // res.render('index', {
    //     title: 'imooc 首页',
    //     movies: [
    //         {_id: '1', poster: '/img/banner.png', title:'图片1'},
    //         {_id: '2', poster: '/img/banner.png', title:'图片2'},
    //         {_id: '3', poster: '/img/banner.png', title:'图片3'},
    //         {_id: '4', poster: '/img/banner.png', title:'图片4'},
    //         {_id: '5', poster: '/img/banner.png', title:'图片5'}
    //     ]
    // })

    // 动态从数据库中获取
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'imooc首页',
            movies: movies
        })
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
    var id = req.params.id
    Movie.findById(id, function(err, movie) {
        if (err) {
            console.log(err)
        }
        res.render('detail', {
            title: 'imooc 详情页',
            movie: movie
        })
    })
    // res.render('detail', {
    //     title: 'imooc 详情页',
    //     movie: {
    //         flash: '',
    //         title: '唐人街案',
    //         doctor: '陈思成',
    //         country: '中国',
    //         language:'中文',
    //         year:'2018年',
    //         summary: '搞笑，办案'
    //     }
    // })
})
// admin post movie
app.post('/admin/movie/new', function(req, res) {
    var id = res.body.movie._id
    var movieObj = req.body.movie
    var _movie
    if (id!== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err)
            }
            // movie: destination
            // movieObj: source
            // 赋值source对象中所有属性覆盖到destination对象上，并返回destination对象
            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            language: movieObj.language,
            country: movieObj.country,
            year: movieObj.year,
            summary: movieObj.summary,
            flash: movieObj.flash,
        })
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }

})

// list page
app.get('/admin/list', function(req, res){
    res.render('list', {
        title: 'imooc 列表页'
    })
})
// demo page
// app.get('/', function(req, res){
//     res.render('demo', {
//         title: 'imooc 练习jade语法',
//         book: {"name": "hello", "price": 12.99},
//         name: 'Bob',
//         fruits: ["Apple", "Orange", "Pie"]
//     })
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


