<template>
	<cn-header></cn-header>
	<div id="about-page">
		<base target="_blank">
		<h3>关于CNode社区</h3>
		<hr>
		<p>
			CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。
		</p>
		<p>
			CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。
		</p>
		<p>
			CNode 的 SLA 保证是，一个9，即 90.000000%。
		</p>
		<p>
			社区目前由 @alsotang 在维护，有问题请联系：<a href="https://github.com/alsotang">alsotang</a>
			请关注我们的官方微博：<a href="http://weibo.com/cnodejs">官方微博</a>
		</p>

		<h3>关于此项目</h3>
		<hr>
		<p>
			此项目由 <a href="https://github.com/flfwzgl">flfwzgl</a> 开发, 项目源码地址 <a href="https://github.com/flfwzgl/vue-cnode">源码地址</a>
		</p>
		<p>
			此vue-cnode是一个使用 vue实现 和 webpack 打包的 html5 web 应用, 使用 ES6 进行编写. 后端使用的是 cnodejs社区 提供的API, 需要手动复制cnode社区的accesstoken方可登录. 
		</p>
		
		<p>
			此项目具备 cnodejs 社区提供的所有api的功能, 包含 用户登录(通过accesstoken), 帖子列表, 分类(精华, 分享, 问答等), 主题页面, 点赞, 回复帖子, 个人消息, 用户中心, 发表新帖子. 另外还增加代码高亮功能和 markdown排版美化.
		</p>

		<p>
			技术上部分借鉴了 <a href="https://github.com/shinygang/Vue-cnodejs">Vue-cnodejs</a> 和 <a href="https://github.com/vuejs/vue-hackernews">vue-hackernews</a>. <strong>代码完全重写, UI完全重做, 无任何复制粘贴</strong>. webpack插件配置部分借鉴<a href="http://webpack.github.io/docs/webpack-dev-server.html">webpack官网</a>. 并且对 PC 和 移动端 做了响应式设计. 
		</p>

	</div>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store
			}
		},
		components: {
			cnHeader: require('../component/header.vue')
		}
	}
</script>

<style lang="sass" scoped>

@import '../asset/scss/var.mod.scss';
$pad: 10px;
#about-page{
	padding: $headerHeight + 10 $pad $pad $pad;
	background: #fff;

	hr{
		margin: 10px 0;
		border-bottom-color: #ddd;
	}

	h3:not(:first-child){
		margin-top: 20px;
	}
	h3, p{
		line-height: 1.8;
		a{
			color: #06a;
			text-decoration: underline;
		}
	}
}
</style>