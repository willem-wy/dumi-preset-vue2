import Vue from 'vue';

export default function preflight(component: any) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement('div');
    el.style.display = 'none';
    el.style.overflow = 'hidden';
    document.body.appendChild(el);
    let app!: any;
    function destroy() {
      Vue.prototype.$nextTick(() => {
        app.$destroy();
        el.remove();
      });
    }
    app = new Vue({
      mounted() {
        resolve();
        destroy();
      },
      render(h) {
        return h(component);
      },
    });
    // 创建实例前配置全局错误处理
    Vue.config.warnHandler = function (err, vm, info) {
      destroy();
      reject(new Error(err));
    };
    Vue.config.errorHandler = function (err, vm, info) {
      destroy();
      reject(new Error(err as any));
    };
    app.mount(el);
  });
}
