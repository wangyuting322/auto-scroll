<script>
/**
 * 使用requestAnimationFrame执行的滚动
 */
export default {
  name: 'AutoScrollSlot',
  components: {},
  props: {
    /**
     * 数据来源
     */
    listData: {
      type: Array,
      default: () => []
    },
    /**
     * 最大可包含的数据数量（大于此数据数量则开启滚动），规定maxNum条数据占满滚动区域
     */
    maxNum: {
      type: Number,
      default: 10
    },
    /**
     * 滚动方向 top向上滚动 |left 向左滚动
     */
    direction: {
      type: String,
      default: 'top'
    },
    /**
     * 默认每一项的渲染
     */
    customRenderItem: {
      type: Function,
      default: (value, index) => {
        return <div>数据项{index}</div>
      }
    },
    /**
     * 每1/60秒滚动的位移像素
     */
    scrollDiatance: {
      type: Number,
      default: 0.5
    }
  },
  data () {
    return {
      randomNum: new Date().getTime(),
      // 是否开启去滚动
      isScroll: false,
      // 距离顶部的距离
      topLength: 0,
      // 距离左边的距离
      leftLength: 0,
      // 是否停止滚动 - true 停止 |false 滚动
      isStopScroll: false,
      // AnimationFrame的timer
      timer: null
    }
  },
  computed: {
    scrollStyle () {
      return {
        position: 'absolute',
        top: `${this.topLength}px`,
        left: `${this.leftLength}px`
      }
    }
  },
  methods: {
    clearTimer () {
      cancelAnimationFrame(this.timer)
    },
    /**
     * 列表自动滚动
     */
    scrollList () {
      this.clearTimer()
      this.$nextTick(() => {
        const autoScrollContent = document.querySelector(
          `.auto-scroll-content${this.randomNum}`
        )
        // 没找到则重复执行
        if (!autoScrollContent) {
          return this.scrollList()
        }
        const fn = () => {
          // 向上滚动
          if (this.direction === 'top') {
            const listTop = -parseFloat(autoScrollContent.style.top)
            const listHeight = autoScrollContent.clientHeight / 2
            // 滚动到复制内容的起始部分
            if (listTop >= listHeight) {
              this.topLength = 0
            }
            // 没有停止滚动，则每次向上滚动；
            this.topLength -= this.scrollDiatance
            this.clearTimer()
            this.timer = requestAnimationFrame(fn)
          } else {
            // 向左滚动
            const listLeft = -parseFloat(autoScrollContent.style.left)
            const listWidth = autoScrollContent.clientWidth / 2
            // 滚动到复制内容的起始部分
            if (listLeft >= listWidth) {
              this.leftLength = 0
            }
            // 没有停止滚动，则每次向上滚动；
            this.leftLength -= this.scrollDiatance
            this.clearTimer()
            this.timer = requestAnimationFrame(fn)
          }
        }
        this.clearTimer()
        this.timer = requestAnimationFrame(fn)
      })
    },
    /**
     * 是否停止滚动
     */
    handleStop (isStop) {
      this.isStopScroll = isStop
    },
    /**
     * 渲染项 - 渲染每一项
     */
    renderItem (value, index) {
      return (
        <div>
          {this.$scopedSlots.default({ value, index })}
        </div>
      )
    },
    /**
     * 渲染项 - 渲染整个内容
     */
    renderContent () {
      if (!this.isScroll) {
        return (
          <div
            class={`auto-scroll-content ${this.direction === 'top' ? 'direction-top' : 'direction-left'
              } auto-scroll-content${this.randomNum}`}
          >
            {this.listData.map((item, index) => {
              return this.renderItem(item, index)
            })}
          </div>
        )
      }
      // 需要滚动则先复制一遍data内容 - 滚动到数据尾部时，能在尾部显示数据头部
      return (
        <div
          onMouseleave={() => this.handleStop(false)}
          onMouseenter={() => this.handleStop(true)}
          style={this.scrollStyle}
          class={`auto-scroll-content ${this.direction === 'top' ? 'direction-top' : 'direction-left'
            }  auto-scroll-content${this.randomNum}`}
        >
          {this.listData.map((item, index) => {
            return this.renderItem(item, index)
          })}
          {this.listData.map((item, index) => {
            return this.renderItem(item, index)
          })}
        </div>
      )
    }
  },
  watch: {
    listData: {
      handler (newV, oldV) {
        if (newV && newV.length > this.maxNum) {
          this.isScroll = true
        }
      },
      immediate: true,
      deep: true
    },
    isStopScroll: {
      handler (newV) {
        if (!newV && this.isScroll) {
          // 滚动
          this.scrollList()
        } else {
          // 停止滚动
          this.clearTimer()
        }
      },
      immediate: true
    }
  },
  created () { },
  mounted () { },
  activated () {
    if (this.isScroll) {
      this.handleStop(true)
    }
  },
  deactivated () {
    if (this.isScroll) {
      this.handleStop(false)
    }
  },
  beforeDestroy () {
    // 清空缓存
    this.clearTimer()
    this.timer = null
  },
  render (h) {
    return (
      <div class={`auto-scroll auto-scroll-wrapper${this.randomNum}`}>
        {this.renderContent()}
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.auto-scroll {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.auto-scroll-content {
  box-sizing: border-box;
}
.direction-top {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.direction-left {
  display: flex;
  height: 100%;
  flex-direction: row;
}
</style>
