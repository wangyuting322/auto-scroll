<template>
  <div class="ContentAutoScroll" :class="`${direction === 'top' ? '' : isScroll ? 'ContentAutoScroll-row-scroll' : 'ContentAutoScroll-row'} `" :id="`ContentAutoScroll${randomNum}`">
        <div class="ContentAutoScroll-wrapper" :class="`${direction === 'top' ? 'ContentAutoScroll-wrapper-col' : 'ContentAutoScroll-wrapper-row'} ${isScroll ? (direction === 'top' ? 'innerActiveCol' : 'innerActiveRow') : ''}`" :id="`ContentAutoScroll-wrapper${randomNum}`" @mousewheel="handleScroll">
          <div class="ContentAutoScroll-content" :id="`ContentAutoScroll-content${randomNum}`">
           <slot></slot>
          </div>
           <div v-show="isScroll" class="ContentAutoScroll-content" :id="`ContentAutoScroll-content${randomNum}`" :style="`--m:${margin}px`">
           <slot></slot>
          </div>
        </div>
      </div>
</template>
<script>
/**
 * 根据内容是否超出长度自动判断是否需要滚动 - 样式为overflow:auto - 隐藏滚动条
 * 横向滚动类型时，不滚动内容居中，滚动内容靠左
 */
export default {
  name: 'ContentAutoScroll',
  components: {

  },
  props: {
    // 滚动方向 - top向上/left向左
    direction: {
      type: String,
      default: 'top'
    },
    // 当前可见区域内的高度/宽度滚动完所需要的时间(毫秒)
    duration: {
      type: Number,
      default: 2000
    },
    // 若direction为top，则margin为上下之间的margin | left则为左右的margin
    margin: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isScroll: false,
      randomNum: (Math.random() * 1000000).toFixed(0)
    }
  },
  computed: {

  },
  methods: {
    /**
     * 判断是否需要滚动 - 内容的高度/宽度超出外部容器的高度/宽度
     */
    tellScroll () {
      this.isScroll = false
      this.$nextTick(() => {
        const wrapper = document.querySelector(`#ContentAutoScroll${this.randomNum}`)
        const content = document.querySelector(`#ContentAutoScroll-wrapper${this.randomNum}`)
        if (this.direction === 'top') {
          const wrapperHeight = wrapper.clientHeight
          const contentHeight = content.clientHeight
          if (contentHeight > wrapperHeight) {
            this.isScroll = true
            content.style.animationDuration = this.duration * ((contentHeight * 2 + this.margin) / wrapperHeight) + 'ms'
          }
        } else {
          const wrapperWidth = wrapper.clientWidth
          const contentWidth = content.clientWidth
          if (contentWidth > wrapperWidth) {
            this.isScroll = true
            // 重复的内容间隔左内容20px
            content.style.animationDuration = this.duration * ((contentWidth * 2 + this.margin) / wrapperWidth) + 'ms'
          }
        }
      })
    },
    /**
     * 去除默认的滚动事件
     */
    handleScroll (e) {
      const event = e || window.event
      event.preventDefault()
      event.returnValue = false
      return false
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
    this.tellScroll()
  },
  beforeDestroy () {
  }

}
</script>
<style lang="scss" scoped>
.ContentAutoScroll {
  height: 100%;
  overflow: auto;
  // 火狐滚动条隐藏
  scrollbar-width: thin;
  &-row {
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    width: 100%;
    &-scroll {
      justify-content: flex-start;
      .ContentAutoScroll-content{
        margin-left: var(--m) !important;
        margin-top: 0 !important;
        &:first-child{
          margin-left: 0 !important;
        }
      }
    }
    & > div {
      box-sizing: border-box;
      flex: 0;
      & > div {
        box-sizing: border-box;
      }
    }
  }
  .ContentAutoScroll-content{
      margin-top: var(--m);
      margin-left: 0;
      &:first-child{
        margin-top: 0;
      }
   }
  // 普通浏览器的滚动条隐藏
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  &-wrapper {
    height: auto;
    &-row {
      width: fit-content;
      display: flex;
    }
    &-col {
      height: auto;
      display: flex;
      flex-direction: column;
    }
  }
  &-content {
    height: auto;
  }
}
.innerActiveCol {
  animation: slideY 8s linear infinite;
  animation-delay: 1s;
  &:hover {
    animation-play-state: paused;
  }
}
@keyframes slideY {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
.innerActiveRow {
  animation: slideX 8s linear infinite;
  animation-delay: 1s;
  &:hover {
    animation-play-state: paused;
  }
}
@keyframes slideX {
  0% {
    transform: translateX(0);
  }
  100% {
    // 减去间隔的一半
    transform: translateX(calc(-50% - 10px));
  }
}
</style>
