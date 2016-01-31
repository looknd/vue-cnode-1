export default {
	tab: '',
	isShowMenu: false,
	isShowLogin: false,
	at: '',
	uid: '',
	uname: '',
	redirect: '',
	scrollOff() {
		$('body').bind('touchmove', e => e.preventDefault() );
	},
	scrollOn() {
		$('body').unbind('touchmove');
	}
}