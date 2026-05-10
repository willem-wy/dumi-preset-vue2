<template>
  <div>
    <text-jsx></text-jsx>
    <text-js></text-js>
  </div>
</template>
<script>
import textJsx from './text-render'
import textJs from './text-vue-js'
export default {
  data() {
    return {
      msg: 'hello world'
    }
  },
  components: {
    textJsx,
    textJs
  }
}
</script>
