
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import FastClick from 'fastclick';

import store from './js/store'

Vue.use(VueResource);
Vue.use(VueRouter);


let router = new VueRouter({
	hashbang: true,
	history: false,
	saveScrollPosition: false,
	transitionOnLoad: true
});


router.beforeEach(transition => {
	FastClick.attach(document.body);

});



let app = Vue.extend({
	data: {
		isOpenMenu: true
	}
});

router.start(app, '#app');
