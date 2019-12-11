(function() {
  function autoRootFontSize() {
    // todo 这里除以750 是按照设计稿的尺寸来计算
    // todo *32 32是一个基数 希望html的字体大小320正常以16px来显示 750 正常以32来计算
    // todo 这个时候设计搞1px = 1rem 使我们想要的
    document.documentElement.style.fontSize = Math.min(screen.width, document.documentElement.getBoundingClientRect().width) / 750 * 32 + 'px'
    // 取screen.width和document.documentElement.getBoundingClientRect().width的最小值；除以750，
    // 懂的起撒，就是原本是750大小的32px;如果屏幕大小变成了375px,
    // 那么字体就是16px;也就是根字体fontSize大小和屏幕大小成正比变化！是不是很简单
    // 750像素设计稿 1rem = 1px 这里不做任何转换
  }
  window.addEventListener('resize', autoRootFontSize)
  autoRootFontSize()
})()
