// 工具函数库

import config from './config'

export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}
/**
 *http
 *
 * @author 香香鸡
 * @export
 * @param {*} url
 * @returns
 */
export function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: `${config.host}${url}`,
      success: function(res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(new Error('请求失败'))
        }
      }
    })
  })
}

/**
 * 成功提示
 * @param {string} text
 */
export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

/**
 *
 * @param {*} title
 * @param {*} content
 */
export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
