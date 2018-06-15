<template>
  <div>
    <book-info :info="info"></book-info>
    <CommentsList :comments="comments"></CommentsList>
    <div class="comment"
         v-if="showAdd">
      <textarea v-model="comment"
                class="textarea"
                maxlength="100"
                placeholder="请输入图书短评"></textarea>
      <div class="location">
        地理位置:
        <switch color="#EA5A49"
                @change="getGeo"
                :checked="location"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="#EA5A49"
                @change="getPhone"
                :checked="phone"></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn"
              @click="addComment">
        评论
      </button>
    </div>
    <div v-else
         class="text-footer">未登录或者已经评论过了</div>
    <button open-type="share"
            class="btn">转发给好友</button>
  </div>

</template>

<script>
import { get, post, showModal } from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentsList from '@/components/CommentsList'

export default {
  data() {
    return {
      info: {},
      comment: '',
      location: '',
      phone: '',
      comments: [],
      userinfo: {}
    }
  },
  computed: {
    showAdd() {
      if (!this.userinfo.openId) {
        return
      }
      // 查到有评论
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return
      }
      return true
    }
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  methods: {
    async addComment() {
      if (!this.comment) {
        return
      }
      // 评论 手机型号 地理位置 图书id 用户openid
      const data = {
        openid: this.userinfo.openId,
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookid: this.bookid
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getComments() // 添加完成之后调用
      } catch (error) {
        showModal('失败', error.msg)
      }
    },
    async getComments() {
      const comments = await get('/weapp/commentlist', { bookid: this.bookid })
      this.comments = comments.list
    },
    getGeo(e) {
      // SNcfK4OHhOgNyg4CzlDefszxL69r56GO
      const ak = 'SNcfK4OHhOgNyg4CzlDefszxL69r56GO'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        this._getLocation(url, ak)
      } else {
        this.location = ''
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    _getLocation(url, ak) {
      wx.getLocation({
        success: geo => {
          wx.request({
            url,
            data: {
              location: `${geo.latitude},${geo.longitude}`,
              output: 'json',
              ak
            },
            success: res => {
              if (res.data.status === 0) {
                this.location = res.data.result.addressComponent.city
              } else {
                this.location = '未知地点'
                console.log('出错了')
              }
            }
          })
        }
      })
    },
    async getDetail() {
      const info = await get('/weapp/bookdetail', { id: this.bookid })
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    }
  },
  components: {
    BookInfo,
    CommentsList
  }
}
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 10px;
  .textarea {
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10px;
  }
  .location {
    margin-top: 10px;
    padding: 5px 10px;
  }
  .phone {
    margin-top: 10px;
    padding: 5px 10px;
  }
}
</style>

