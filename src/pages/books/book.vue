<template>
  <div>
    <top-swiper :tops="tops"></top-swiper>
    <Card v-for="book in books"
          :key="book.id"
          :book="book"></Card>
    <p class="text-footer"
       v-if="!this.more">
      没有更多数据
    </p>
  </div>
</template>

<script>
// 分页
// 当前第几页 page
// 没有更多数据
// 1. page = 0
// 2. page > 0 数据长度<10 停止触底加载
import { get } from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'

export default {
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  mounted() {
    this.getList(true)
    this.getTop()
  },
  onPullDownRefresh() {
    this.getList(true)
    this.getTop()
  },
  onReachBottom() {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getList()
  },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', { page: this.page })
      if (books.list.length < 6 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop() {
      const tops = await get('/weapp/tops')
      this.tops = tops.list
    }
  },
  components: {
    Card,
    TopSwiper
  }
}
</script>
