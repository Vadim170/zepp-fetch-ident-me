import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_WIDTH } from "../utils/config/device";

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData

Page({
  state: {},
  label: null,
  build() {
	label = hmUI.createWidget(hmUI.widget.TEXT, {
		x: 0,
		y: 0,
		w: 192 - 16,
		h: 180,
		text: "Hello, world!",
		color: 0xaaaaaa,
		text_size: 24,
		text_style: hmUI.text_style.WRAP,
		align_v: hmUI.align.CENTER_V,
	});
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: (DEVICE_WIDTH - px(400)) / 2,
      y: px(260),
      w: px(400),
      h: px(100),
      text_size: px(36),
      radius: px(12),
      normal_color: DEFAULT_COLOR,
      press_color: DEFAULT_COLOR_TRANSPARENT,
      text: "Fetch Data",
      click_func: (button_widget) => {
        logger.log("click button");
        this.fetchData();
      },
    });
  },
  fetchData() {
	label.setProperty(hmUI.prop.MORE, {
		text: "...",
	});
    messageBuilder.request({
      method: "GET_DATA",
    })
    .then(data => {
      logger.log('receive data')
      const { result = {} } = data
      const { text } = result

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(96),
        y: px(100),
        w: px(288),
        h: px(46),
        color: 0xffffff,
        text_size: px(36),
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
        text
      })
	  label.setProperty(hmUI.prop.MORE, {
		  text: text,
	  });
    })
  },
});
