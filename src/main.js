
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import FastClick from 'fastclick';

import filter from './js/filter';
import store from 'store';


Vue.use(VueResource).use(VueRouter);

Object.keys(filter).forEach(k => Vue.filter(k, filter[k]));

new VueRouter()
.map({
	'/': {
		name: 'home',
		component: require('./view/home.vue')
	},
	'/list/:tab': {
		name: 'list',
		component: require('./view/list.vue')
	},
	'/topic/:id': {
		name: 'topic',
		component: require('./view/topic.vue')
	},
	'/about': {
		name: 'about',
		component: require('./view/about.vue'),
		auth: true
	},
	'*': {
		name: 'home',
		component: require('./view/home.vue')
	},
	// '/add': {
	// 	name: 'add',
	// 	component: require('./view/add.vue')
	// },
	// '/msg': {
	// 	name: 'msg',
	// 	component: require('./view/msg.vue')
	// },
	// '/user/:loginname': {
	// 	name: 'user',
	// 	component: require('./view/user.vue')
	// }

})
.beforeEach(transition => {
	FastClick.attach(document.body);

	$(document).on('click', () => {
		store.isShowMenu = false;
		
	}).on('touchmove', () => {
		store.isShowMenu = false;
		store.isShowLogin = false;
	});

	if(transition.to.auth) {
		if(store.at) {
			transition.next();
		} else {
			store.isShowLogin = true;
			store.redirect = transition.to.path;
			transition.abort();
		}
	} else {
		transition.next();
	}
	// console.log(transition)
})
.afterEach(({to}) => {
	if(to.name === 'list') {
		store.tab = TAB.indexOf(to.params.tab) > -1 ? to.params.tab : 'all';
	} else {
		store.tab = ''
	}
	
	store.isShowMenu = false;
	store.route = to;
})

//将空组件挂在到#app, 然后会根据router跳转一次, 挂在非空组件会跳转多次
.start(Vue.extend({}), '#app');
