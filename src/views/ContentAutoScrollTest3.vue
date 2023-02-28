<template>
  <div class='about'>
    <div class='height300 width300'>
      <ContentAutoScrollRowCnterMarginTemplate direction='left' v-if="list.length" :margin="10">
        <div class="wrapper-row">
          <div class='ContentAutoScrollTest-item' v-for="(item,index) in list" :key="index">{{index}}</div>
        </div>
      </ContentAutoScrollRowCnterMarginTemplate>
    </div>
    <br />
    <div class='height300 width300'>
      <ContentAutoScrollRowCnterMarginTemplate direction='top'  v-if="list.length" :margin="20">
         <div class="wrapper-col">
            <div class='ContentAutoScrollTest-item' v-for="(item,index) in list" :key="index">{{index}}</div>
        </div>
      </ContentAutoScrollRowCnterMarginTemplate>
    </div>
  </div>
</template>
<script>
import ContentAutoScrollRowCnterMarginTemplate from '@/components/ContentAutoScrollRowCnterMarginTemplate.vue'
export default {
  name: 'ContentAutoScrollTest2',
  components: {
    ContentAutoScrollRowCnterMarginTemplate

  },
  data () {
    return {
      list: [],
      timer: null
    }
  },
  computed: {
  },
  methods: {

  },
  mounted () {
    this.timer = setTimeout(() => {
      this.list = new Array(8).fill(5)
    }, 3000)
  },
  beforeDestroy () {
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
