<template>
  <div class="directoryRolling">
    <ul class="nav" :class="[isSelected]">
      <li><a id="navon0" href="javascript:;" @click="navClick">nav0</a></li>
      <li><a id="navon1" href="javascript:;" @click="navClick">nav1</a></li>
      <li><a id="navon2" href="javascript:;" @click="navClick">nav2</a></li>
      <li><a id="navon3" href="javascript:;" @click="navClick">nav3</a></li>
      <li><a id="navon4" href="javascript:;" @click="navClick">nav4</a></li>
      <li><a id="navon5" href="javascript:;" @click="navClick">nav5</a></li>
      <li><a id="navon6" href="javascript:;" @click="navClick">nav6</a></li>
    </ul>
    <div class="article">
      <div id="div0" />
      <div id="div1" />
      <div id="div2" />
      <div id="div3" />
      <div id="div4" />
      <div id="div5" />
      <div id="div6" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectoryRolling',
  data() {
    return {
      isSelected: '',
      val: ''
    }
  },
  mounted() {
    const liIds = []
    const lis = document.querySelectorAll('.directoryRolling ul>li')
    for (let i = 0; i < lis.length; i++) {
      const element = lis[i]
      liIds.push(element.querySelector('a').id)
    }

    const $scrollBox = document.querySelector('.directoryRolling')
    const scrollCallback = () => {
      this.$debounce(() => {
        const top = $scrollBox.scrollTop // 设置变量top,表示当前滚动条到顶部的值
        const tt = $scrollBox.clientHeight // 设置变量tt,表示当前滚动窗口高度的值
        let num = 0
        for (let n = 0; n < 7; n++) {
          // 在此处通过判断滚动条到顶部的值和当前窗口高度的关系
          // （当前窗口的n倍 <= top <= 当前窗口的n+1倍）来取得和导航索引值的对应关系
          if (top >= n * tt && top <= (n + 1) * tt) {
            num = n
          }
          this.isSelected = liIds[num] + '-selected'
        }
      }, 100)
    }
    $scrollBox.addEventListener('scroll', scrollCallback)
  },
  methods: {
    // 防抖
    debounce(func, wait, immediate) {
      let timeout, args, context, timestamp, result
      const later = function() {
        // 据上一次触发时间间隔
        const last = new Date() - timestamp
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args)
            if (!timeout) context = args = null
          }
        }
      }
      return function() {
        context = this
        args = arguments
        timestamp = new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
          result = func.apply(context, args)
          context = args = null
        }
        return result
      }
    },
    navClick(e) {
      const scrollBox1 = document.querySelector('.directoryRolling')
      scrollBox1.scrollTo(0, [...e.target.id].pop() * 500)
      this.isSelected = e.target.id + '-selected'
    }
  }
}
</script>

<style lang="scss">
.nav li a:hover,
.navon0-selected #navon0,
.navon1-selected #navon1,
.navon2-selected #navon2,
.navon3-selected #navon3,
.navon4-selected #navon4,
.navon5-selected #navon5,
.navon6-selected #navon6 {
  border-bottom: 2px solid #0052e4;
}
li {
  list-style-type: none;
}
a {
  text-decoration: none;
  outline: 0;
}
.directoryRolling {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow: auto;
  width: 600px;
  height: 500px;
  margin: auto;
}
.nav {
  position: fixed;
  z-index: 5;
  display: inline-flex;
  flex-wrap: wrap;
  width: 100px;
  height: inherit;
  background: #fff;
}
.nav li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.nav li a {
  font-size: 18px;
  display: block;
  padding: 10px 5px;
  cursor: pointer;
  color: #3c3c3c;
}
#div0 {
  background: #e6e6e6;
}
#div1 {
  background: #fd5331;
}
#div2 {
  background: #c00ab9;
}
#div3 {
  background: #149ce1;
}
#div4 {
  background: #f99831;
}
#div5 {
  background: #0aff3c;
}
#div6 {
  background: #dbe6f7;
}
.article {
  display: inline-block;
  width: 80%;
  margin-left: 100px;
}
.article > div {
  width: 100%;
  height: 500px;
}
</style>
