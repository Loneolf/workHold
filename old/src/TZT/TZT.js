import TZTwebview from "./TZTwebview"
import TZTMobile from "./TZTMobile"
import browser from "../util/browser"

var vueTZT = {};


vueTZT.install = function(Vue) {
	if (vueTZT.installed) {
		return;
	}
	if(browser.browser.versions.webview){
    Vue.prototype.$TZT = {
      ...TZTwebview
    }
  }else {
    Vue.prototype.$TZT = {
      ...TZTMobile
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueTZT);
}

export default vueTZT;
