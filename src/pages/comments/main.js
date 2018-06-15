import Vue from 'vue'
import Comment from './comment'

Vue.config.productionTip = false

const app = new Vue(Comment)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
    navigationBarTitleText: '评论列表'
  }
}
