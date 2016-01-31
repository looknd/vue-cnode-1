

export default {
	getTabClass (tab, good, top) {
		if(top) return 'top';
		if(good) return 'good';
		return tab || 'all';
	},
	getTabName (tab, good, top) {
		if(top) return '置顶';
		if(good) return '精华';
		if(tab === 'share') return '分享';
		if(tab === 'ask') return '问答';
		if(tab === 'job') return '招聘';
		return '';
	}
}