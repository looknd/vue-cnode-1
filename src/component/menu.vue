<template>
	<div class="icon-menu menu-btn" :class="{active: store.isShowMenu}" @click.stop="toggleMenu">
		</div>
	<div class="menu" v-show="store.isShowMenu">
		<div class="user" v-if="store.at" v-link="{path: '/user/' + store.uname}">
			<img :src="store.avatarUrl" onerror="this.src='{{store.errorImg}}'" v-if="store.avatarUrl" class="avatar">
			{{store.uname}}
		</div>

		<div class="icon-login" v-if="!store.at" @click="showLogin"> 登录</div>
		<div class="icon-msg" v-if="store.at" v-link="{path: '/msg/' + store.uname}"> 消息</div>
		<div class="icon-logout" v-if="store.at" @click="logout"> 退出</div>
		<hr>
		<div class="icon-info" v-link="{name: 'about'}"> 关于</div>
	</div>

	<cn-login :logout-status="logoutStatus"></cn-login>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				logoutStatus: '',
			}
		},
		methods: {
			toggleMenu () {
				this.store.isShowMenu = !this.store.isShowMenu;
			},
			showLogin () {
				this.store.isShowLogin = true;
			},
			logout () {
				this.store.at = this.store.uid = this.store.redirect = this.store.uname = this.store.avatarUrl = '';

				this.logoutStatus = '成功退出登录!'
				setTimeout(() => {
					this.logoutStatus = '';
					if(this.$route.auth)
						this.$route.router.go({name: 'home'});
				}, 1000)
			}
		},
		components: {
			cnLogin: require('./login.vue')
		}
	}
</script>

<style lang="sass">
	@import '../asset/scss/var.mod.scss';
	.menu-btn{
		width: $headerHeight;
		height: $headerHeight;
		line-height: $headerHeight;
		float: right;
		text-align: center;
		font-size: 24px;

		&.active{
			color: $stdColor;
		}
	}
	.menu{
		width: 100px;
		// height: 200px;
		position: fixed;
		right: 5px;
		top: $headerHeight + 10;
		background: #fff;
		// overflow: hidden;
		border: 1px solid #aaa;
		border-radius: 10px;
		box-shadow: 0 0 10px #555;
		padding: 10px;
		// font-family: arial, verdana, microsoft yahei;
		
		&:before{
			$edge: 10px;
			content: '';
			width: $edge;
			height: $edge;
			right: 23px;
			top: -$edge/1.41 + 1;
			margin-right: -10px;
			position: absolute;
			background: #fff;
			border: 1px solid #999;
			border-right: none;
			border-bottom: none;
			transform: rotate(45deg);
			box-sizing: border-box;

		}

		.user{
			color: $stdColor;
			line-height: 2;
			text-align: center;
			img.avatar{
				$d: 50px;
				width: $d;
				height: $d;
				display: block;
				margin: 0 auto;
				border-radius: $d/2;
			}
			
		}



		&>div[class^="icon-"]{
			$h: 35px;
			height: $h;
			line-height: $h;
			text-align: center;
			// font-size: 12px;
			color: #555;
		}
	}
</style>