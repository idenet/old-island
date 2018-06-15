const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { bookid, openid } = ctx.request.query
  const mysqlSelects = mysql('comments')
    .select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
  let comments
  if (bookid) {
    // 图书详情页的评论列表
    comments = await mysqlSelects.where('bookid', bookid)
  } else if (openid) {
    // 个人评论列表
    comments = await mysqlSelects.where('openid', openid)
  }
  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        name: info.nickName,
        image: info.avatarUrl
      })
    })
  }
}
