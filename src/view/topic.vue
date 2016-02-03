<template>
	<cn-header></cn-header>

	<div id="topic-page" v-if="topic.title">
		<h2 class="topic-title" v-text="topic.title"></h2>

		<div class="section">
			<div class="status">
				<img class="avatar" onerror="this.src='{{errorImg}}'"
					:src="topic.author.avatar_url"  
					v-link="{path: '/user/' + topic.author.loginname}">
				<div class="detail">
					<div>
						<span class="tag" :class="topic.tab">
							{{topic.tab | getTabName topic.good topic.top}}
						</span>
						<span>
							{{topic.author.loginname}}
						</span>
					</div>
					<div>
						<span>
							{{topic.visit_count}}次浏览
						</span>
						<span>
							发布于: {{topic.create_at | toNow}}
						</span>
					</div>
				</div>
			</div>
		</div>

		<section class='markdown-body topic-content' v-html="topic.content">

		</section>

		<h3 class="subtitle">
			<strong>{{topic.reply_count}}</strong> 个回复
		</h3>

		<section class="reply-list">
			<div v-for="(i,item) in topic.replies" class="replay-box">
				<div class="status">
					<img class="avatar" :src="item.author.avatar_url" v-link="{path: '/user/' + item.author.loginname}"/>
					<div class="interact" style="width: 40px;">
						<i class="icon-repost"
							:class="{active: isShowReply[i]}"
							@click="atHim(item.id, item.author.loginname, i)"></i>
					</div>
					<div class="interact">
						<i class="icon-like"> {{item.ups.length}}</i>
					</div>
					<div class="detail" style="width: 100px;">
						<div v-text="item.author.loginname"></div>
						<div v-text="item.create_at | toNow"></div>
					</div>
				</div>
				<hr>
				<div v-html="item.content | replaceLink"></div>
				<section class="reply" 
					v-if="store.at && isShowReply[i]">
					<textarea rows="6" placeholder="支持Markdown语法"
						v-model="replyContent"></textarea>
					<button @click="doReply" debounce="3000">确定回复</button>
				</section>
			</div>
		</section>
		
		<section class="reply" v-if="!isShowReplyTopic">
			<button @click="addReply">回复此贴</button>
		</section>
		<section class="reply" placeholder="支持Markdown语法"
			v-if="store.at && isShowReplyTopic">
			<textarea rows="6" v-model="replyContent"></textarea>
			<button @click="doReply" debounce="3000">确定回复</button>
		</section>

	</div>

	<cn-top></cn-top>
</template>

<script>
	import path from 'path';
	import store from 'store';
	import hl from '../js/highlight';
	import '../asset/scss/highlight.scss';
	export default {
		data () {
			return {
				store: store,
				errorImg: ERRORIMG,

				topic: {},
				isShowReply: [],
				isShowReplyTopic: false,
				replyId: '',
				replyContent: ''
			}
		},
		route: {
			data ({to}) {
				$.get(path.join(TOPIC, to.params.id), ({data}) => {
					if(data) {
						this.topic = data;
						this.topic.tab = data.good ? 'good' : data.tab;

						for(let i of this.isShowReply.keys()) {
							this.$set(`isShowReply[${i}]`, false);
						}

						// 高亮代码
						setTimeout(()=>{
							$('pre code').each((i, e) => {
								e.innerHTML = e.innerHTML.replace(/\t/g, '  ');
								hl.highlightBlock(e)
							})
						}, 0)
					}
				})
			}
		},
		ready () {
			this.$on('logout', () => {
				this.isShowReplyTopic = false;
				for(let i of this.isShowReply.keys()) {
					this.$set(`isShowReply[${i}]`, false);
				}
				return true;
			})
		},
		methods: {
			doReply () {
				console.log(this.replyId + ' ' + this.replyContent)
			},
			atHim (id, uname, i) {
				if(!store.at) {
					store.isShowLogin = true;
					return;
				}
				if(this.isShowReply[i]){
					this.$set(`isShowReply[${i}]`, false);
				} else {
					for(let i of this.isShowReply.keys()) {
						this.$set(`isShowReply[${i}]`, false);
					}
					this.$set(`isShowReply[${i}]`, true);
					this.isShowReplyTopic = false;

					let atName = `@${uname}`;
					this.replyId = id;
					this.replyContent = '';
				}
				
			},
			addReply () {
				if(this.store.at){
					for(let i of this.isShowReply.keys()) {
						this.$set(`isShowReply[${i}]`, false);
					}
					this.isShowReplyTopic = true;
				} else {
					this.store.isShowLogin = true;
				}
			}
		},
		components: {
			cnHeader: require('../component/header.vue'),
			cnTop: require('../component/back-top.vue')
		}
	}
</script>


<style lang="sass">

@import '../asset/scss/var.mod.scss';

$pad: 10px;
#topic-page{
	padding: $headerHeight+$pad $pad $pad $pad;
	transition: all .3s ease;
	background-color: #fff;

	&>*{
		padding: 10px 0;
	}

	h2.topic-title{
		font-size: 16px;
		line-height: 1.7;
		color: #333;
	}

	.section{
		background-color: #f0f0f0;
	}
}
.section{
	margin: 0 #{-$pad};
	padding: $pad !important;
}

.tag {
	$font-tag: 12px;
	$h: 24px;
	$br: 5px;
	width: 40px !important;
	height: $h !important;
	line-height: $h !important;
	font-size: $font-tag;
	font-weight: 400;
	color: #fff !important;
	// background-color: #333;
	border-radius: 0 $br $br 0;
	text-align: center !important;
	position: relative;
	overflow: visible !important;
	&:after {
		$r: 6px;
		width: $r;
		height: $r;
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		margin: -$r/2;
		background-color: #fff;
		border-radius: $r/2;
	}
	&:before {
		width: 0;
		height: 0;
		content: '';
		position: absolute;
		left: -$h/2;
		top: 0;
		border-right: $h/2 solid transparent;
		border-top: $h/2 solid transparent;
		border-bottom: $h/2 solid transparent;
	}

	&.top{
		background: $topColor;
		&:before{
			border-right-color: $topColor;
		}
	}
	&.good{
		background: $goodColor;
		&:before{
			border-right-color: $goodColor;
		}
	}
	&.ask{
		background: $askColor;
		&:before{
			border-right-color: $askColor;
		}
	}
	&.job{
		background: $jobColor;
		&:before{
			border-right-color: $jobColor;
		}
	}
	&.share{
		background: $shareColor;
		&:before{
			border-right-color: $shareColor;
		}
	}

}


.reply-list {
	width: 100%;
	// margin-top: $gap*3;
	&>.replay-box {
		width: 100%;
		list-style: none;
		// border: 1px solid #ccc;
		background: #f5f5f5;
		border-radius: 15px;
		margin: 10px auto;
		padding: 10px;
		box-shadow: 0 0 6px #999;
		// &:last-child {
		// 	border-bottom: none;
		// }

		.icon {
			font-size: 26px;
		}
	}
}

.interact{
	$w: 80px;
	$h: 60px;
	width: $w;
	height: $h;
	float: right;

	.icon-repost{
		width: 100%;
		height: 100%;
		font-size: 22px;
		line-height: $h;
		float: left;
	}
	.icon-like{
		max-width: $w;
		font-size: 16px;
		line-height: $h;
		float: left;
		@extend %omit;
	}
}

.icon-repost{
	$h: 30px;
	width: $h;
	height: $h;
	line-height: $h;
	text-align: center;
	float: right;
	font-size: 16px;
	&.active{
		color: $stdColor;
	}
}

.reply{

	textarea{
		width: 100%;
		padding: 10px;
		display: block;

		border-radius: 15px;
		border: 1px solid #ddd;
		font-size: 14px;
		margin: 10px 0;
		transition: all .2s ease;

		&:focus{
			border-color: $stdColor;
			box-shadow: 0 0 6px $stdColor;
		}
	}
	button{
		$w: 100px;
		$h: 30px;
		width: $w;
		height: $h;
		line-height: $h;
		margin: auto;
		padding: 0;
		border: none;
		display: block;
		background-color: $stdColor;
		color: #fff;
		border-radius: $h/2;
		font-size: 14px;
	}
}

</style>





