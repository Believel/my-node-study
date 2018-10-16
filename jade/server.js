var http = require('http')
var jade = require('jade')
http.createServer(function(req, res){
    res.writeHead(200,{
        'Content-Type': 'text/plain'
    })
    // 1.jade.compile
    // var fn = jade.compile('div #{course}', {})
    // var html = fn({course: 'jade'})

    // 2. jade.render
    // var html = jade.render('div #{course}', {course: 'jade render'})

    // 3. jade.renderFile
    var html = jade.renderFile('mixin.jade', {course: 'jade renderFile', pretty:true})


    // 打印在浏览器页面中
    res.end(html)
}).listen(1337, '127.0.0.1')
console.log('server running 1337')