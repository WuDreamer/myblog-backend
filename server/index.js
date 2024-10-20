const express = require('express')
const cors = require('cors')
const moment = require('moment');


const {
    Article,
    User,
    Log,
    Resume,
    Friend,
    Website,
    WordDay,
} = require('./db') // 引入db.js中的数据表
const app = express()
// 配置允许跨域
app.use(cors())
// 让客户端识别json数据
app.use(express.json())
// 实现将上传的静态文件能够在前端显示
app.use('/uploads', express.static(__dirname + '/uploads'))




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


const multer = require('multer');
const upload = multer({
    dest: __dirname + '/uploads'
}) //上传中间件
const path = require('path');
app.post('/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
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

    // 创建用户
    const user = await User.create(req.body);
    // 格式化时间
    user.time = moment(user.time).format('YYYY年MM月DD日 HH:mm:ss');
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
// 日志添加
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



// 简历详情  
app.get('/api/resumes/:id', async (req, res) => {
    const resume = await Resume.findById(req.params.id)
    if (resume) {
        res.send(resume);
    } else {
        res.status(404).send({
            error: '简历没有创建'
        });
    }
})
// 简历添加
app.post('/api/resumes', async (req, res) => {
    const resume = await Resume.create(req.body); // 创建用户 
    res.send(resume);
});
// 修改简历
app.put('/api/resumes/:id', async (req, res) => {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body) // 修改用户
    res.send(resume) //返回给前端
})
// 简历列表
app.get('/api/resumes', async (req, res) => {
    const resumes = await Resume.find() // 查询数据
    res.send(resumes); //// 返回格式化后的文章列表  
})
// 删除简历
app.delete('/api/resumes/:id', async (req, res) => {
    await Resume.findByIdAndDelete(req.params.id) // 删除数据
    res.send({
        status: true
    }) //返回true给前端
})


/*  友链管理的接口  */
// 新增友链
app.post('/api/friends', async (req, res) => {
    req.body.time = new Date(); // 设置新增当前时间  
    const friend = await Friend.create(req.body); // 创建友链
    friend.time = moment(friend.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
    res.send(friend);
});
// 友链列表
app.get('/api/friends', async (req, res) => {
    const friends = await Friend.find() // 查询数据
    const formattedFriends = friends.map(friend => {
        return {
            ...friend._doc, // // 展开文章的所有字段 
            time: moment(friend.time).format('YYYY年MM月DD日 HH:mm:ss') // 格式化时间  
        };
    });
    res.send(formattedFriends); //// 返回格式化后的文章列表  
})
// 删除友链
app.delete('/api/friends/:id', async (req, res) => {
    await Friend.findByIdAndDelete(req.params.id) // 删除数据
    res.send({
        status: true
    }) //返回true给前端
})
// 友链详情
app.get('/api/friends/:id', async (req, res) => {
    const friend = await Friend.findById(req.params.id) // 查看文章详细内容
    if (friend) {
        friend.time = moment(friend.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
        res.send(friend);
    } else {
        res.status(404).send({
            error: '文章没有创建'
        });
    }
})
// 修改友链
app.put('/api/friends/:id', async (req, res) => {
    const friend = await Friend.findByIdAndUpdate(req.params.id, req.body) // 修改文章
    res.send(friend) //返回给前端
})



/*  网站管理的接口  */
// 新增网站
app.post('/api/links', async (req, res) => {
    req.body.time = new Date(); // 设置新增当前时间  
    const link = await Website.create(req.body); // 创建网站
    link.time = moment(link.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
    res.send(link);
});
// 网站列表
app.get('/api/links', async (req, res) => {
    const links = await Website.find() // 查询数据
    const formattedLinks = links.map(link => {
        return {
            ...link._doc, // // 展开网站的所有字段 
            time: moment(link.time).format('YYYY年MM月DD日 HH:mm:ss') // 格式化时间  
        };
    });
    res.send(formattedLinks); //// 返回格式化后的文章列表  
})
// 删除网站
app.delete('/api/links/:id', async (req, res) => {
    await Website.findByIdAndDelete(req.params.id) // 删除数据
    res.send({
        status: true
    }) //返回true给前端
})
// 网站详情
app.get('/api/links/:id', async (req, res) => {
    const link = await Website.findById(req.params.id) // 查看网站详细内容
    if (link) {
        link.time = moment(link.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
        res.send(link);
    } else {
        res.status(404).send({
            error: '文章没有创建'
        });
    }
})
// 修改网站
app.put('/api/links/:id', async (req, res) => {
    const link = await Website.findByIdAndUpdate(req.params.id, req.body) // 修改网站
    res.send(link) //返回给前端
})


/*  每日一句的接口  */
// 句子添加
app.post('/api/words', async (req, res) => {
    req.body.time = new Date(); // 设置当前时间  
    const word = await WordDay.create(req.body); // 创建句子
    word.time = moment(word.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
    res.send(word);
});
// 句子列表
app.get('/api/words', async (req, res) => {
    const words = await WordDay.find() // 查询数据
    const formattedWords = words.map(word => {
        return {
            ...word._doc, // // 展开句子的所有字段 
            time: moment(word.time).format('YYYY年MM月DD日 HH:mm:ss') // 格式化时间  
        };
    });
    res.send(formattedWords); //// 返回格式化后的句子列表  
})
// 删除句子
app.delete('/api/words/:id', async (req, res) => {
    await WordDay.findByIdAndDelete(req.params.id) // 删除数据
    res.send({
        status: true
    }) //返回true给前端
})
// 句子详情
app.get('/api/words/:id', async (req, res) => {
    const word = await WordDay.findById(req.params.id) // 查看句子内容
    if (word) {
        word.time = moment(word.time).format('YYYY年MM月DD日 HH:mm:ss'); // 格式化时间  
        res.send(word);
    } else {
        res.status(404).send({
            error: '文章没有创建'
        });
    }
})
// 修改句子
app.put('/api/words/:id', async (req, res) => {
    const word = await WordDay.findByIdAndUpdate(req.params.id, req.body) // 修改句子
    res.send(word) //返回给前端
})





// 设置服务器监听端口
app.listen(3001, () => {
    console.log('http://localhost:/3001/')
})