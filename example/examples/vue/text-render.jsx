// 纯文本
const TextRender = {
  functional: true,
  render: (h, context) => {
    const { props } = context
    return <div>{props?.value}</div>
  }
}

export default TextRender
