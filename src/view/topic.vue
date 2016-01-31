<template>
	<cn-header></cn-header>
	
	<div id="topic-page" v-if="topic.title">
		<h2 class="topic-title" v-text="topic.title"></h2>

		<div class="section">
			<div class="status">
				<img :src="topic.author.avatar_url" class="avatar" onerror="this.src='{{errorImg}}'">
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
							发布于: {{topic.create_at}}
						</span>
					</div>
				</div>
			</div>
		</div>

		<section class='markdown-body topic-content' v-html="topic.content">

		</section>

		<h3 class="replay-status">
			<strong>{{topic.reply_count}}</strong> 个回复
		</h3>

		<section class="reply-list">
			<div v-for="item in topic.replies" class="replay-box">
				<section class="status">
					<img class="avatar" :src="item.author.avatar_url"/>
					<div class="detail">
						<div>
							<span class="icon-repost" @click="addReply(item.id)"></span>
							<span class="name" v-text="item.author.loginname"></span>
						</div>
						<div>
							<span class="icon-like"
								:class="{'uped':isUps(item.ups)}"
								@click="upReply(item)">{{item.ups.length}}</span>
							<span>
								发布于:{{item.create_at | getLastTimeStr true}}</span>
						</div>
					</div>
				</section>
				<div class="reply_content" v-html="item.content"></div>
				<cn-reply :topic.sync="topic"
						:topic-id="topicId"
						:reply-id="item.id"
						:reply-to="item.author.loginname"
						:show.sync="curReplyId"
						v-if="userId && curReplyId === item.id"></cn-reply>
			</div>
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

				topic: {}
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
	color: #fff;
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



.replay-status {
	width: 150px;
	line-height: 1.8;
	margin: 0 auto;
	padding: $pad !important;
	
	border-bottom: 2px solid #42b983;

	text-align: center;
	// background: #f0f0f0;
	position: relative;
	// border-radius: 10px;
	strong {
		color: #42b983;
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

</style>





