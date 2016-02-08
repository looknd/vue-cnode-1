<template>
	<cn-header></cn-header>
	<div id="about-page">
		<h3>关于</h3>
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
			社区目前由 @alsotang 在维护，有问题请联系：https://github.com/alsotang
			请关注我们的官方微博：http://weibo.com/cnodejs
		</p>

		<h3>移动客户端</h3>
		<hr>
		<p>
			客户端由 @ilanceli 开发维护。
		</p>
		<p>
			源码地址：https://github.com/lanceli/cnodejs-ionic。
		</p>
		<p>
			立即体验 CNode 客户端，直接扫描页面右侧二维码，或者应用市场搜索“CNode社区”下载。
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
	}
}
</style>