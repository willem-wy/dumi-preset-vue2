import Vue from 'vue';

// 集成 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 全局错误处理
Vue.config.errorHandler = function (err, vm, info) {
  console.error('Vue 错误:', err, info);
  throw err;
};

const renderer = async function (canvas, component) {
  console.log('runtime vue renderer')
  if (component.__css__) {
    setTimeout(() => {
      document
        .querySelectorAll(`style[css-${component.__id__}]`)
        .forEach((el) => el.remove());
      document.head.insertAdjacentHTML(
        'beforeend',
        `<style css-${component.__id__}>${component.__css__}</style>`
      );
    }, 1);
  }

  const app = new Vue(component);
  app.$mount(canvas);

  return () => {
    app.$destroy();
  };
};

export default renderer;
