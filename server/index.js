const express = require('express')
const cors = require('cors')
const moment = require('moment');
const app = express()

// 配置允许跨域
app.use(cors())
// 让客户端识别json数据
app.use(express.json())

// 配置数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog_element');

// 创建文章表
const Article = mongoose.model('Article', new mongoose.Schema({
    title: {
        type: String
    },
    list: {
        type: String
    },
    body: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    } // 默认值为当前时间
}))

// 创建用户表
const User = mongoose.model('User', new mongoose.Schema({
    nickname: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    list: {
        type: String
    },
    introduce: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    } // 默认值为当前时间
}))

// 创建日志表
const Log = mongoose.model('Log', new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    list: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    } // 默认值为当前时间
}))


app.get('/', async (req, res) => {
    res.send('index')
})

/*  文章管理的接口  */
// 新增文章
app.post('/api/articles', async (req, res) => {
    req.body.time = new Date(); // 设置当前时间  
    const article = await Article.create(req.body); // 创建文章
    article.time = moment(article.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
    res.send(article);
});
// 文章列表
app.get('/api/articles', async (req, res) => {
    const articles = await Article.find() // 查询数据
    const formattedArticles = articles.map(article => {
        return {
            ...article._doc, // // 展开文章的所有字段 
            time: moment(article.time).format('YYYY年MM月DD日 HH:mm:ss') // 格式化时间  
        };
    });
    res.send(formattedArticles); //// 返回格式化后的文章列表  
})
// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id) // 删除数据
    res.send({
        status: true
    }) //返回true给前端
})
// 文章详情
app.get('/api/articles/:id', async (req, res) => {
    const article = await Article.findById(req.params.id) // 查看文章详细内容
    if (article) {
        article.time = moment(article.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
        res.send(article);
    } else {
        res.status(404).send({
            error: '文章没有创建'
        });
    }
})
// 修改文章
app.put('/api/articles/:id', async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body) // 修改文章
    res.send(article) //返回给前端
})


/*  用户管理的接口  */
// 用户列表
app.get('/api/users', async (req, res) => {
    const users = await User.find() // 查询用户数据
    const formattedUsers = users.map(user => {
        return {
            ...user._doc, // // 展开用户的所有字段 
            time: moment(user.time).format('YYYY年MM月DD日 HH:mm:ss') // 格式化时间  
        };
    });
    res.send(formattedUsers); //// 返回格式化后的文章列表
})
// 添加用户
app.post('/api/users', async (req, res) => {
    req.body.time = new Date(); // 设置当前时间  
    const user = await User.create(req.body); // 创建用户
    user.time = moment(user.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
    res.send(user);
});
// 删除用户
app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id) // 删除数据
    res.send({
        status: true
    }) //返回true给前端
})
// 修改用户
app.put('/api/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body) // 修改用户
    res.send(user) //返回给前端
})
// 用户详情
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id) // 查看文章详细内容
    if (user) {
        user.time = moment(user.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
        res.send(user);
    } else {
        res.status(404).send({
            error: '用户没有创建'
        });
    }
})




/*  日志管理的接口  */
// 日志文章
app.post('/api/logs', async (req, res) => {
    req.body.time = new Date(); // 设置当前时间  
    const log = await Log.create(req.body); // 创建日志
    log.time = moment(log.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
    res.send(log);
});
// 日志列表
app.get('/api/logs', async (req, res) => {
    const logs = await Log.find() // 查询数据
    const formattedLogs = logs.map(log => {
        return {
            ...log._doc, // // 展开日志的所有字段 
            time: moment(log.time).format('YYYY年MM月DD日 HH:mm:ss') // 格式化时间  
        };
    });
    res.send(formattedLogs); //// 返回格式化后的日志列表  
})
// 删除日志
app.delete('/api/logs/:id', async (req, res) => {
    await Log.findByIdAndDelete(req.params.id) // 删除数据
    res.send({
        status: true
    }) //返回true给前端
})
// 日志详情
app.get('/api/logs/:id', async (req, res) => {
    const log = await Log.findById(req.params.id) // 查看日志内容
    if (log) {
        log.time = moment(log.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
        res.send(log);
    } else {
        res.status(404).send({
            error: '文章没有创建'
        });
    }
})
// 修改日志
app.put('/api/logs/:id', async (req, res) => {
    const log = await Log.findByIdAndUpdate(req.params.id, req.body) // 修改日志
    res.send(log) //返回给前端
})






app.listen(3001, () => {
    console.log('http://localhost:/3001/')
})