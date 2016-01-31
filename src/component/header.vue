<template>
	<header>
		<cn-menu v-if="1"></cn-menu>
		<cn-nav v-if="store.route.name === 'list'"></cn-nav>

	</header>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
			}
		},
		components: {
			cnNav: require('./nav.vue'),
			cnMenu: require('./menu.vue')
		},
	}
</script>

<style lang="sass">
	@import '../asset/scss/var.mod.scss';

	header{
		width: 100%;
		background-color: #fff;
		position: fixed;
		box-shadow: 0 2px 5px #999;
		z-index: 10000;
		
	}



</style>