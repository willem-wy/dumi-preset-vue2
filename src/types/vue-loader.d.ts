declare module 'vue-loader/lib/plugin' {
  import { Plugin } from 'webpack';
  const VueLoaderPlugin: new (options?: object) => Plugin;
  export default VueLoaderPlugin;
}
