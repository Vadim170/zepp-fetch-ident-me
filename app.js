import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'

const appId = 20001
const messageBuilder = new MessageBuilder({ appId })

App({
  globalData: {
    messageBuilder: messageBuilder,
  },
  onCreate(options) {
    console.log('app on create invoke')
    messageBuilder.connect()
  },

  onDestroy(options) {
    console.log('app on destroy invoke')
    messageBuilder.disConnect()
  }
})