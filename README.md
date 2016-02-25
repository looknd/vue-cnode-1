# vue-cnode

=====

[demo](http://project.fanlinfeng.com/vue-cnode)

=====

此vue-cnode是一个使用 vue实现 和 webpack 打包的 html5 web 应用, 使用 ES6 进行编写. 后端使用的是 [cnodejs社区](https://cnodejs.org/) 提供的API, 需要手动复制cnode社区的accesstoken方可登录. 

此项目具备 cnodejs 社区提供的所有api的功能, 包含 用户登录(通过accesstoken), 帖子列表, 分类(精华, 分享, 问答等), 主题页面, 点赞, 回复帖子, 个人消息, 用户中心, 发表新帖子. 另外还增加代码高亮功能和 markdown排版美化.

技术上部分借鉴了[Vue-cnodejs](https://github.com/shinygang/Vue-cnodejs) 和 [vue-hackernews](https://github.com/vuejs/vue-hackernews). ```代码完全重写, UI完全重做```, 无任何复制粘贴. webpack插件配置部分借鉴[webpack官网](http://webpack.github.io/docs/webpack-dev-server.html). 并且对 **PC** 和 **移动端** 做了响应式设计. 

####此项目是纯练习项目.


###协议
MIT



======
This vue-node is a html5 webapp which is accomplished in Vue.js and packed in Webpack. In back-end, using the APIs supplied by [cnode](https://cnodejs.org/). Set the accesstoken then you can login.