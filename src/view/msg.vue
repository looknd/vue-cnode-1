<template>
	<cn-header title="消息"></cn-header>
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
</style>