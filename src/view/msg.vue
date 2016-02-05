<template>
	<cn-header title="消息"></cn-header>
	<div id="msg-page">
		<section class="pannel">
			<h3>新消息</h3>
			<hr>
			<ul>
				<li class="status">
					无消息
				</li>
			</ul>
		</section>
		<section class="pannel">
			<h3>过往消息</h3>
			<hr>
			<ul>
				<li class="staus">
					
				</li>
			</ul>
		</section>
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
			cnHeader: require('../component/header.vue'),
			cnTitle: require('../component/title.vue')
		}
	}
</script>

<style lang="sass">
	@import '../asset/scss/var.mod.scss';
	$pad: 10px;
	#msg-page{
		padding: $headerHeight + $pad $pad $pad $pad;
		background: #f0f0f0;
	}
</style>