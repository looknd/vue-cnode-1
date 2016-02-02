<template>
	<cn-header title="用户主页"></cn-header>

	<div id="user-page">
		<div class="section">
			<div class="status">
				<img :src="store.avatarUrl" onerror="this.src='{{store.errorImg}}'" class="avatar">
				<div class="detail">
					<div>
						<span>积分: {{score}}</span>
						<span>{{loginname}}</span>
					</div>
					<div>
						<span>{{createAt}}</span>
						<span><a class="icon-github" href="https://github.com/{{ghname}}"> {{ghname}}</a></span>
					</div>
				</div>
			</div>
		</div>
		<h3 class="subtitle">
			全部动态
		</h3>

	</div>
</template>

<script>
	import path from 'path';
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				loginname: '',
				ghname: '',
				createAt: '',
				score: ''
			}
		},
		route: {
			data ({to}) {
				$.get(path.join(USER, to.params.uname), ({data}) => {
					if(data) {
						this.store.avatarUrl = data.avatar_url;
						this.loginname = data.loginname;
						this.ghname = data.githubUsername;
						this.createAt = data.create_at;
						this.score = data.score;
					}
				})
			}
		},
		components: {
			cnHeader: require('../component/header.vue')
		}
	}
</script>

<style lang="sass">
	@import '../asset/scss/var.mod.scss';

	$pad: 10px;
	#user-page{
		padding: $headerHeight $pad $pad $pad;
		background: #fff;

		.section{
			background: url(../asset/img/glass.jpg);
			background-size: 500px 200px;
			// background: #eee;

			img.avatar{
				border-radius: 100px;
				border: none;
			}
		}

	}

</style>