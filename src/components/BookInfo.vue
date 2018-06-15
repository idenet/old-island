<template>
  <div class="bookinfo">
    <div class="thumb">
      <img :src="info.image"
           mode="aspectFill"
           class="back">
      <img :src="info.image"
           class="img"
           mode="aspectFit">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img :src="userinfo.image"
           class="avatar"
           mode="aspectFit"> {{userinfo.name}}
      <div class="right text-primary">
        {{info.rate}}分
        <rate :rate="info.rate"></rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge"
           v-for="(tag, index) in info.tags"
           :key="index">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(summary, index) in info.summary"
         :key="index">{{summary}}</p>
    </div>
  </div>
</template>

<script>
import Rate from '@/components/Rate'

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    userinfo() {
      return this.info.user_info || {}
    }
  },
  components: {
    Rate
  }
}
</script>

<style lang="scss" scoped>
.bookinfo {
  font-size: 14px;
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      width: 100%;
      filter: blur(15px);
    }
    .img {
      position: absolute;
      height: 300rpx;
      width: 100%;
      left: 0;
      top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
  .detail {
    padding: 5px 10px;
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .badge {
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ea5a49;
    color: #ea5a49;
  }
  .summary {
    margin-top: 10px;
    p {
      text-indent: 2em;
      font-size: 14px;
      padding: 0 15px;
    }
  }
}
</style>
