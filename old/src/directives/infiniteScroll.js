/**
 * Created by zhonglu on 2016/10/26.
 */

export default {
  bind () {
    let el = $(this.el)
    el.on('scroll', () => {
      let height = parseFloat(el.height())
      let scrollTop = parseFloat(el.scrollTop())
      let totalHeight = height + scrollTop
      console.log(`${el.height()}-${el.scrollTop()}-${totalHeight}-${el[0].scrollHeight}`)
      if (el[0].scrollHeight - totalHeight <= 3) {
        console.log(`${el.height()}-${el.scrollTop()}-${el[0].scrollHeight}`)
        this.vm[this.expression]()
      }
    })
  }
}
