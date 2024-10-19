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
        type: String,
    },
    image: {
        type: String // 存储头像的URL或路径
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

// 创建简历表
const Resume = mongoose.model('Resume', new mongoose.Schema({
    name: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    github: {
        type: String
    },
    school: {
        type: String
    },
    major: {
        type: String
    },
    entryYear: {
        type: String
    },
    graduationYear: {
        type: String
    },
    certificates: {
        type: String
    },
    skills: {
        type: String
    },
    project_name: {
        type: String
    },
    project_site: {
        type: String
    },
    project_job: {
        type: String
    },
    project_time: {
        type: String
    },
    project_skills: {
        type: String
    },
    project_content: {
        type: String
    },
    firm_name: {
        type: String
    },
    firm_address: {
        type: String
    },
    firm_content: {
        type: String
    },
    firm_time: {
        type: String
    },
    firm_job: {
        type: String
    },
    statement: {
        type: String
    }
}))

// 创建友链表
const Friend = mongoose.model('Friend', new mongoose.Schema({
    site_ico: {
        type: String
    },
    site_name: {
        type: String
    },
    site_content: {
        type: String
    },
    site_address: {
        type: String
    },
    site_state: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    } // 默认值为当前时间
}))

// 创建网站表
const Website = mongoose.model('Website', new mongoose.Schema({
    ico: {
        type: String
    },
    name: {
        type: String
    },
    content: {
        type: String
    },
    site: {
        type: String
    },
    type: {
        type: String
    },
    state: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    } // 默认值为当前时间
}))

// 创建每日一句
const WordDay = mongoose.model('WordDay', new mongoose.Schema({
    phrase: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    } // 默认值为当前时间
}))

module.exports = {
    Article,
    User,
    Log,
    Resume,
    Friend,
    Website,
    WordDay
};