<template>
	<cn-header></cn-header>

	<div id="user-page">
		<div class="section">
			<div class="status">
				<img :src="store.avatarUrl" onerror="this.src='{{store.errorImg}}'" class="avatar">
				<div class="detail">
					<div>
						<span></span>
						<span>{{loginname}}</span>
					</div>
					<div>
						<span>abcd</span>
						<span><a href="https://github.com/{{ghname}}">Github</a></span>
					</div>
				</div>
			</div>
		</div>
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
				createAt: ''
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
		padding: $headerHeight+$pad $pad $pad $pad;
		background: #fff;

		.section{
			background: #eee;
		}
	}

</style>