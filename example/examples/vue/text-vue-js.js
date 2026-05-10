// 纯文本
const TextVueJs = {
  functional: true,
  render: (h, context) => {
    const { props } = context
    if (props.sensitive || props.rich) {
      return h('div', {
        attrs: {
          value: props.value,
          link: props.link
        }
      })
    }
    return h('span', {}, props.value)
  }
}

export default TextVueJs
