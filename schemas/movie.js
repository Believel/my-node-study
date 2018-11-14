var mongoose = require('mongoose')
// 定义模式
var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    year: Number,
    summary: String,
    flash: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
    poster: String
})
// 每次存储数据之前都会调用这个方法
MovieSchema.pre('save', function(next) {
    // 数据是否是新加的
    if (this.isNew) {
        // 是新加的，就把创建时间和更新时间设置为当前时间
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

// 静态方法
MovieSchema.statics = {
    // 取出数据库中所有的数据
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    // 查询单条数据
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = MovieSchema
