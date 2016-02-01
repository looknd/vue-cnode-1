<template>
	<cn-header></cn-header>

	<div id="user-page">
		
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

<style lang="sass">
	@import '../asset/scss/var.mod.scss';

	$pad: 10px;
	#user-page{
		padding: $headerHeight+$pad $pad $pad $pad;
		 
	}

</style>