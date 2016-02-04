<template>
	<div class="dialog-matte" @click="hideDialog" v-if="store.isShowLogin || logoutStatus"></div>
	<div class="login-dialog dialog" v-if="store.isShowLogin" @touchmove.stop>
		<input type="text" placeholder="AccessToken" v-model="accessToken" @focus="loginStatus = ''">
		<input type="button" value="登  录" @click="login">
		<div v-if="loginStatus" v-text="loginStatus"></div>
	</div>

	<div class="logout-dialog dialog"
		v-if="logoutStatus" 
		v-text="logoutStatus"></div>
</template>

<script>
	import path from 'path';
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				accessToken: '',
				loginStatus: '',
				loading: false
			}
		},
		//任何地方都可能会激活登录框, 但只有menu中才能退出登录, 所以退出登录提示框指令不需要放在store中
		props: ['logoutStatus'],
		methods: {
			hideDialog () {
				this.store.isShowLogin = false;
				this.accessToken = this.loginStatus = this.logoutStatus = '';
			},
			login () {
				if(this.loading) return;
				this.loading = true;
				if(/^[a-z0-9\-]{36}$/g.test(this.accessToken)) {
					$.ajax({
						url: AT,
						data: {accesstoken: this.accessToken},
						type: 'POST',
						success: (res) => {
							if(res.success) {
								this.store.at = this.accessToken;
								this.store.uid = res.id;
								this.store.uname = res.loginname;
								this.store.avatarUrl = res.avatar_url;

								this.loginStatus = '登录成功!';
								this.accessToken = '';
								setTimeout(() => {
									this.loading = false;
									this.store.isShowLogin = false;
									this.loginStatus = '';

									if(this.store.redirect) {
										this.$route.router.go({path: this.store.redirect});
									}
								}, 1000)
							}
						},
						error: () => {
							this.loginStatus = 'AccessToken 错误!';
							this.loading = false;
						}
					});
				} else {
					this.loginStatus = 'AccessToken 格式不对!';
					this.loading = false;
				}
			}
		}
	}
</script>

<style lang="sass">
	@import '../asset/scss/var.mod.scss';
	.dialog-matte{
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: #000;
		opacity: 0.7;
	}
	.login-dialog{		
		input{
			$h: 40px;
			$pad: 5px;
			margin-bottom: 10px;
			width: 100%;
			line-height: $h - $pad*2;
			padding: $pad;
			display: block;
			
			&[type="text"]{
				border: 2px solid $stdColor;
				border-radius: 5px;
				color: $stdColor;
				transition: all .2s ease;
				&:focus{
					box-shadow: 0 0 6px $stdColor;
				}
			}
			&[type="button"]{
				color: #fff;
				background: $stdColor;
				border: none;
				border-radius: 5px;
				font-size: 16px;
			}

		}
		div{
			line-height: 2;
			text-align: center;
			color: #f70;
		}
	}
	.logout-dialog{
		color: #f70;
	}
</style>