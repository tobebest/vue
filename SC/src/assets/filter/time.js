import Vue from 'vue'
Vue.filter('time', function (value) {
  let date = new Date(value)
  console.log(date)
  let Y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  let i = date.getMinutes()
  let s = date.getSeconds()
  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  if (H < 10) {
    H = '0' + H
  }
  if (i < 10) {
    i = '0' + i
  }
  if (s < 10) {
    s = '0' + s
  }
  let t = Y + '年' + m + '月' + d + '日' +  + ' ' + H + ':' + i
  return t
})
