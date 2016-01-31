<template>
	<div class="icon-menu menu-btn" :class="{active: store.isShowMenu}" @click.stop="toggleMenu">
		</div>
	<div class="menu" v-show="store.isShowMenu">
		<div class="icon-login" v-if="!store.at" @click="showLogin"> 登录</div>
		<div class="icon-logout" v-if="store.at" @click="logout"> 退出</div>
		<hr>
		<div class="icon-msg"> 消息</div>
		<div class="icon-info" v-link="{name: 'about'}"> 关于</div>
	</div>

	<cn-login v-if="store.isShowLogin"></cn-login>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store
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
				this.store.at = this.store.uid = this.store.redirect = this.store.uname = '';
				if(this.$route.auth)
					this.$route.router.go({name: 'home'})
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

		&>div{
			$h: 35px;
			height: $h;
			line-height: $h;
			text-align: center;
			// font-size: 12px;
			color: #555;
		}
	}
</style>