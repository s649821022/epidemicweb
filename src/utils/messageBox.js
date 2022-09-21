import { MessageBox } from 'element-ui'

class MyMessageBox {
  confirm(params = {}) {
    const message = params.message || '您确定要执行此操作吗？'
    const confirmCallback = params.confirmCallback || null
    const cancelCallback = params.cancelCallback || null
    const type = params.type || 'warning'
    MessageBox.confirm(message, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type
    })
      .then(() => {
        if (confirmCallback) {
          confirmCallback()
        }
      })
      .catch(() => {
        if (cancelCallback) {
          cancelCallback()
        }
      })
  }
}

export default new MyMessageBox()
