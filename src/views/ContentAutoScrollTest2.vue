<template>
  <div class='about'>
     <div class='height300 width300'>
      <ContentAutoScroll2 direction='left' :renderContent="renderContentRow">
      </ContentAutoScroll2>
    </div>
    <br/>
    <div class='height300 width300'>
      <ContentAutoScroll2 direction='top' :renderContent="renderContentCol">
      </ContentAutoScroll2>
    </div>
  </div>
</template>
<script>
import ContentAutoScroll2 from '@/components/ContentAutoScroll2.vue'
export default {
  name: 'ContentAutoScrollTest2',
  components: {
    ContentAutoScroll2

  },
  data () {
    return {
      list: new Array(1).fill(2),
      renderContentRow: null,
      renderContentCol: null,
      timer: null
    }
  },
  computed: {
  },
  methods: {
    formatRenderContentRow () {
      return (
        <div class="wrapper-row">
          {
            this.list.map((item, index) => {
              return (
                <div class='ContentAutoScrollTest-item'>{index}</div>
              )
            })
          }
        </div>
      )
    },
    formatRenderContentCol () {
      return (
        <div class="wrapper-col">
          {
            this.list.map((item, index) => {
              return (
                <div class='ContentAutoScrollTest-item'>{index}</div>
              )
            })
          }
        </div>
      )
    }
  },
  mounted () {
    // 修改对象的指向
    this.renderContentRow = () => this.formatRenderContentRow()
    this.renderContentCol = () => this.formatRenderContentCol()
    this.timer = setTimeout(() => {
      this.list = new Array(8).fill(5)
      this.renderContentRow = () => this.formatRenderContentRow()
      this.renderContentCol = () => this.formatRenderContentCol()
    }, 3000)
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer)
  }
}
</script>
<style lang="scss">
.height300 {
  height: 300px;
  background-color: #cccccc;
}
.width300 {
  width: 300px;
}
.width50 {
  width: 50px;
  height: 50px;
  background-color: #42dd;
  margin: 5px;
}
.wrapper-row {
  display: flex;
  & > div {
    width: 100px;
    flex-shrink: 0;
  }
}
.wrapper-col {
  width: 100px;
}
.ContentAutoScrollTest-item {
  height: 100px;
  background-color: #42dd;
  color: wheat;
}
</style>
