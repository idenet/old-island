<template>
  <div class="container">
    <comments-list type="user"
                   :comments="comments"
                   v-if="userinfo.openId"></comments-list>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <card v-for="book in books"
            :key="book.id"
            :book="book"></card>
      <div v-if="!books.length">暂时还没添加过书，快去添加几本吧</div>
    </div>
  </div>
</template>

<script>
import CommentsList from '@/components/CommentsList'
import Card from '@/components/Card'
import { get } from '@/util'

export default {
  data() {
    return {
      comments: [],
      userinfo: {},
      books: {}
    }
  },
  onShow() {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  },
  onPullDownRefresh() {
    this.init()
    wx.stopPullDownRefresh()
  },
  methods: {
    init() {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks() {
      const books = await get('/weapp/booklist', {
        openid: this.userinfo.openId
      })
      this.books = books.list
    },
    async getComments() {
      const comments = await get('/weapp/commentlist', {
        openid: this.userinfo.openId
      })
      this.comments = comments.list
    }
  },
  components: {
    CommentsList,
    Card
  }
}
</script>

<style lang="scss" scoped>
</style>

