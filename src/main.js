import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: ['^pages/books/main', 'pages/me/main', 'pages/comments/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#EA5149',
      navigationBarTitleText: 'entry book',
      navigationBarTextStyle: 'light'
    },
    tabBar: {
      selectColor: '#EA5149',
      list: [
        {
          text: '图书',
          pagePath: 'pages/books/main',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          text: '评论',
          pagePath: 'pages/comments/main',
          iconPath: 'static/img/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          text: '我',
          pagePath: 'pages/me/main',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me-active.png'
        }
      ]
    }
  }
}
