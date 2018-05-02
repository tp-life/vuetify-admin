/**
 *  toastr 通知层
 */

/**
 * @param {*} method 方法名称
 * @param {*} title 标题
 * @param {*} msg  消息内容
 */
function toastBase (method, title, msg) {
  title = title || ''
  msg = msg || ''
  window.toast[method]({
    title: title,
    message: msg,
    showMethod: 'jello',
    hideMethod: 'bounceOutRight',
    progressBar: true,
    timeOut: 2500
  })
}

let success = (title, msg) => {
  toastBase('success', title, msg)
}

let info = (t, m) => {
  toastBase('info', t, m)
}

let warn = (t, m) => {
  toastBase('warn', t, m)
}

let error = (t, m) => {
  toastBase('error', t, m)
}
export {
    success,
    info,
    warn,
    error
}
