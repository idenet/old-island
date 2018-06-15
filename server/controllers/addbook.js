// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2. 入库

const https = require('https')
const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { isbn, openId } = ctx.request.body
  if (isbn && openId) {
    // 检查书籍是否存在
    const findRes = await mysql('books')
      .select()
      .where('isbn', isbn)
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: '图书已存在'
        }
      }
      return
    }

    let url = `https://api.douban.com/v2/book/isbn/${isbn}`
    const bookinfo = await getJSON(url)
    const data = orgnizeData(bookinfo)
    try {
      await mysql('books').insert({
        isbn,
        openId,
        ...data
      })
      ctx.state.data = {
        title: data.title,
        msg: 'success'
      }
    } catch (error) {
      ctx.state = {
        code: -1,
        data: {
          msg: '新增失败' + error.sqlMessage
        }
      }
    }
  }
}

/**
 * 组织数据
 *
 * @author 香香鸡
 * @param {*} data
 * @returns
 */
function orgnizeData (data) {
  const rate = data.rating.average // 评分
  const { title, image, alt, publisher, summary, price } = data
  const tags = data.tags
    .map(v => {
      return `${v.title} ${v.count}`
    })
    .join(',')
  const author = data.author.join(',')
  const bookinfo = {
    rate,
    title,
    image,
    alt,
    publisher,
    summary,
    price,
    tags,
    author
  }
  return bookinfo
}
/**
 *https
 *
 * @author 香香鸡
 * @param {*} url
 * @returns
 */
function getJSON (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const bookinfo = JSON.parse(urlData)
        if (bookinfo.title) {
          resolve(bookinfo)
        } else {
          reject(new Error())
        }
      })
    })
  })
}
