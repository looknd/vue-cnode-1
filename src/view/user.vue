<template>
	<cn-header title="用户主页"></cn-header>

	<div id="user-page">
		<div class="user-pannel">
			<h3>Profile</h3>
			<hr>
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

		<div class="user-tab fit">
			<div :class="{active: userTab == 'reply'}" @click="userTab='reply'">
				<i>78</i>
				<span>最近回复</span>
			</div>
			<div :class="{active: userTab == 'topic'}" @click="userTab='topic'">
				<i>35</i>
				<span>最近发布</span>
			</div>
		</div>
		<ul v-if="1">
			<li class="status">
				<img :src="store.avatarUrl" class="avatar">
				<div class="detail">
					<div>
						<span></span>
						<span>hahahha</span>
					</div>
					<div>
						<span></span>
						<span>jibfdafd</span>
					</div>
				</div>
			</li>
		</ul>

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
				score: '',
				userTab: 'reply'
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
		padding: $headerHeight + $pad $pad $pad $pad;
		background: #f0f0f0;

		// .section{
		// 	background: url(../asset/img/glass.jpg);
		// 	background-size: 500px 200px;
		// 	// background: #eee;

		// 	img.avatar{
		// 		border-radius: 100px;
		// 		border: none;
		// 	}
		// }
		.user-pannel{
			padding: 10px;
			background: #fff;
			border-radius: 5px;
			box-shadow: 0 0 6px #999;
		}

		.user-tab{
			$width: 200px;
			$height: 80px;
			width: $width;
			height: $height;
			margin: 10px auto;
			&>div{
				width: 50%;
				// height: 50px;
				line-height: 50px;
				float: left;
				text-align: center;
				color: #333;
				&.active{
					color: $stdColor;
				}

				&>*{
					display: block;
				}

				$h: 50px;
				i{
					height: $h;
					line-height: $h;
					font-size: 36px;
					font-family: verdana;
					font-style: normal;
				}
				span{
					height: $height - $h;
					line-height: $height - $h;
					font-size: 12px;
				}
			}
		}

	}

</style>