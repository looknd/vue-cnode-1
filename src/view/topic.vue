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
					<div class="detail">
						<div>
							<span :class="{'uped':isUps(item.ups)}">
								<i class="icon-like" @click="upReply(item)"> {{item.ups.length}}</i>
							</span>
							<span class="name" v-text="item.author.loginname"></span>
						</div>
						<div>
							<span>
								<i class="icon-repost"
									:class="{active: isShowReply[i]}"
									@click="atHim(item.id, item.author.loginname, i)"></i>
							</span>
							<span>{{item.create_at | toNow}}</span>
						</div>
					</div>
				</div>
				<div v-html="item.content | replaceLink"></div>
				<section class="reply" v-if="store.at && isShowReply[i]">
					<textarea rows="6" v-model="replyContent"></textarea>
					<button @click="doReply" debounce="3000">确定回复</button>
				</section>
			</div>
		</section>

	</div>

	<cn-top></cn-top>
</template>

<script>
	import Vue from 'vue';
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
		methods: {
			doReply () {
				// console.log(this.replyContent)
			},
			atHim (id, uname, i) {
				if(!store.at) {
					store.isShowLogin = true;
					return;
				}
				if(this.isShowReply[i]){
					Vue.set(this.isShowReply, i, false);
				} else {
					this.isShowReply.fill(false);
					Vue.set(this.isShowReply, i, true);

					let atName = `@${uname}`;
					this.replyId = id;
					this.replyContent = '';
				}
				

				// console.log(this)
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
		border: 1px solid #eee;
		background: #eee;
		border-radius: 15px;
		margin: 10px auto;
		padding: 10px;
		&:last-child {
			border-bottom: none;
		}
		// .uped {
		// 	color: $color80;
		// }
		.icon {
			font-size: 26px;
		}
		// .from{
		// 	color:$red;
		// }
		// .language-javascript{
		// 	background-color:$colorf0;
		// 	overflow-x:auto;
		// }
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





