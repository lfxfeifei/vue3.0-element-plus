import Vue from 'vue'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus';

function clipboardSuccess() {
  ElMessage({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  ElMessage({
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard(text: any, event: any) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
