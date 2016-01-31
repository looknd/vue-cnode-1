<template>
	<div id="login-matte" @click="hideLogin"></div>
	<div id="login-dialog">
		<input type="text" placeholder="AccessToken" v-model="accessToken" @focus="loginStatus = 0">
		<input type="button" value="登  录" @click="login">
		<div v-text="loginStatus" v-if="loginStatus"></div>
	</div>
</template>

<script>
	import path from 'path';
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				accessToken: '',
				loginStatus: ''
			}
		},
		methods: {
			hideLogin () {
				this.store.isShowLogin = false;
			},
			login () {
				if(/^[a-z0-9\-]{36}$/g.test(this.accessToken)) {
					$.post(AT, {accesstoken: this.accessToken}, (res) => {
						if(res.success) {
							this.store.at = this.accessToken;
							this.store.uid = res.id;
							this.store.uname = res.loginname;

							this.loginStatus = '登录成功!';
							setTimeout(() => {
								this.store.isShowLogin = false;

								if(this.store.redirect) {
									console.log(this.store.redirect)
									this.$route.router.go({path: this.store.redirect});
								}
							}, 2000)
						}
					});
				} else {
					this.loginStatus = 'AccessToken 格式不对!';
				}
			}
		}
	}
</script>

<style lang="sass">
	@import '../asset/scss/var.mod.scss';
	#login-matte{
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: #000;
		opacity: 0.7;
	}
	#login-dialog{
		$w: 250px;
		$h: 150px;
		width: $w;
		// height: $h;
		left: 50%;
		top: 30%;
		margin-left: -$w/2;
		margin-top: -$w/2;
		position: fixed;
		padding: 0 20px;
		background: #fff;
		border-radius: 5px;
		box-sizing: border-box;
		box-shadow: 0 5px 15px #555;
		
		input{
			$h: 40px;
			$pad: 5px;
			margin: 20px 0;
			width: 100%;
			// height: $h;
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
			margin: 10px 0;
			line-height: 2;
			text-align: center;
			color: #f70;
		}
	}
</style>