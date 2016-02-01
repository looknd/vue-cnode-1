<template>
	<cn-header></cn-header>
	<section id="list-page" class="fit">
		<ul>
			<li v-for="(i, e) in list" v-link="{path: '/topic/' + e.id}">
				<h3 v-text="e.title" 
					:class="e.tab | getTabClass e.good e.top"></h3>
				<div class="status">
					<img :src="i%2==0 ? e.author.avatar_url : ''" onerror="this.src='{{store.errorImg}}'" class="avatar">
					<div class="detail">
						<div>
							<span>
								<i style="color: #06a">{{e.reply_count}}</i> /{{e.visit_count}}
							</span>
							<span>
								{{e.author.loginname}}
							</span>
						</div>
						<div>
							<span>{{e.create_at}}</span>
							<span>{{e.last_reply_at}}</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</section>

	<cn-top></cn-top>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				// 这里如果直接require会得到未响应的store
				store: store,
				list: [],
				queryData: {
					page: 0,
					limit: 20,
					tab: '',
					mdrender: true
				},
				loading: false
			}
		},
		route: {
			data ({to}) {
				let $doc = $(document),
					$win = $(window)

				this.getList();
				$win.on('scroll', () => {
					if( $doc.height() - $win.scrollTop() - $win.height() < 200 ){
						this.getList();
					}	
				})
			},
			deactivate () {
				this.store.tab = '';
			}
		},
		methods: {
			getList () {
				if(this.loading) return;
				this.loading = true;
				if(this.queryData.tab === this.store.tab) {
					this.queryData.page ++;
				} else {
					this.queryData.page = 1;
					this.queryData.tab = this.store.tab;
					this.list.length = 0;
					$(window).scrollTop(0)
				}
				$.get(LIST, $.param(this.queryData), ({data}) => {
					this.loading = false;
					if(data && data.length) {
						data.forEach(v => {
							if( !isExist(v, this.list) ) this.list.push(v)
						});
					}
				});

				function isExist(e, arr) {
					for(var i=0, m=arr.length; i<m; i++)
						if(e.id === arr[i].id) return true;
				}
			},
		},
		components: {
			cnHeader: require('../component/header.vue'),
			cnTop: require('../component/back-top.vue')
		}
	}
</script>

<style lang="sass">
	@import "../asset/scss/var.mod.scss";

	#list-page{
		padding-top: $headerHeight;
		background-color: $bgcolor;

		
		ul{
			padding: 0.1px 5px; 

			li{
				background-color: #fff;
				padding: 5px;

				margin: 10px auto;
				border-radius: 10px;
				// box-shadow: 0 0 5px #999;
				border: 1px solid #aaa;

				&:after{
					content: '.';
					clear: both;
					display: block;
					height: 0;
					visibility: hidden;
				}

				h3{
					// width: 240px;
					$h: 25px;
					height: $h;
					line-height: $h;
					font-size: 12px;
					font-weight: 600;
					margin: 0 5px;

					@extend %omit;


					$tagFontSize: 12px;
					
					@at-root %tag{
						color: #fff;
						padding: 3px 5px;
						margin-right: 5px;
						border-radius: 10px;
						font-weight: normal;
						font-size: $tagFontSize;
					}

					&.top:before{
						content: '置顶';
						background: $topColor;
						@extend %tag;
					}
					&.good:before{
						content: '精华';
						background: $goodColor;
						@extend %tag;
					}
					&.ask:before{
						content: '问答';
						background: $askColor;
						@extend %tag;
					}
					&.share:before{
						content: '分享';
						background: $shareColor;
						@extend %tag;
					}
					&.job:before{
						content: '招聘';
						background: $jobColor;
						@extend %tag;
					}
				}

				
			}
		}

	}
</style>