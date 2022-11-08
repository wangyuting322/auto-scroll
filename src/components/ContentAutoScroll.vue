<script>
/**
 * 根据内容是否超出长度自动判断是否需要滚动 - 样式为overflow:auto - 隐藏滚动条
 */
export default {
  name: 'ContentAutoScroll',
  components: {

  },
  props: {
    /**
     * 内容渲染
     */
    renderContent: {
      type: Function,
      default: (h) => { return (<div></div>) }
    },
    // 滚动方向 - top向上/left向左
    direction: {
      type: String,
      default: 'top'
    },
    // 当前可见区域内的高度/宽度滚动完所需要的时间(毫秒)
    duration: {
      type: Number,
      default: 2000
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
            content.style.animationDuration = this.duration * (contentHeight * 2 / wrapperHeight) + 'ms'
          }
        } else {
          const wrapperWidth = wrapper.clientWidth
          const contentWidth = content.clientWidth
          if (contentWidth > wrapperWidth) {
            this.isScroll = true
            content.style.animationDuration = this.duration * (contentWidth * 2 / wrapperWidth) + 'ms'
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
    renderContent: {
      handler (newV) {
        if (newV) {
          this.tellScroll()
        } else {
          this.isScroll = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  render () {
    return (
      <div class="ContentAutoScroll" id={`ContentAutoScroll${this.randomNum}`}>
        <div class={`ContentAutoScroll-wrapper ${this.direction === 'top' ? 'ContentAutoScroll-wrapper-col' : 'ContentAutoScroll-wrapper-row'} ${this.isScroll ? (this.direction === 'top' ? 'innerActiveCol' : 'innerActiveRow') : ''}`} id={`ContentAutoScroll-wrapper${this.randomNum}`} onMousewheel={this.handleScroll}>
          <div class="ContentAutoScroll-content" id={`ContentAutoScroll-content${this.randomNum}`}>
            {this.renderContent && this.renderContent()}
          </div>
          {
            // 滚动的话重复一遍
            this.isScroll ? (
              <div class="ContentAutoScroll-content" id={`ContentAutoScroll-content${this.randomNum}`}>
                {this.renderContent()}
              </div>
            ) : null
          }

        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.ContentAutoScroll {
  height: 100%;
  overflow: auto;
  // 火狐滚动条隐藏
  scrollbar-width: thin;
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
    transform: translateX(-50%);
  }
}
</style>
