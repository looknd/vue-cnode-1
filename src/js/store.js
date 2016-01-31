export default {
	tab: '',
	isShowMenu: false,
	scrollOff() {
		$('body').bind('touchmove', e => e.preventDefault() );
	},
	scrollOn() {
		$('body').unbind('touchmove');
	}
}