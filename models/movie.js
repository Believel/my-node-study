var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')
// 对模式进行编译
// 参数1：模式名字，参数2： 模型
var Movie = mongoose.model(
    'Movie',
    MovieSchema
)
// 导出这个构造函数
module.exports = Movie
