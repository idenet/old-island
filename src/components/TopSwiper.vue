<template>
  <div class="swiper">
    <swiper indicator-dots="true"
            autoplay="true"
            interval="6000"
            duration="1000"
            circular="true">
      <div v-for="(top, indexImg) in imgUrls"
           :key="indexImg">
        <swiper-item>
          <img :src="img.image"
               mode="aspectFit"
               v-for="img in top"
               :key="img.id"
               @click="bookDetail(img)"
               class="slider-image">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>
<script>
export default {
  props: {
    tops: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    imgUrls() {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    bookDetail(item) {
      // 跳转
      wx.navigateTo({
        url: `/pages/detail/main?id=${item.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  margin-top: 5px;
  .slider-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>


