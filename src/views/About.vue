<template>
  <div class='about'>
    <AutoScrollSlot class='height300 width300' :listData="this.list" direction='left' :maxNum="10">
      <p class='width50' slot-scope='scoped'>{{scoped.value.name}}+{{scoped.index}}</p>
    </AutoScrollSlot>
  </div>
</template>
<script>
import AutoScrollSlot from '@/components/AutoScrollSlot.vue'
export default {
  name: 'About',
  components: {
    AutoScrollSlot

  },
  data () {
    return {
      list: new Array(20).fill(null).map((item, index) => {
        return {
          name: '王',
          age: index
        }
      })
    }
  },
  methods: {

  }

}
</script>
<style lang="scss">
.about {
  // height: 100%;
  width: 100%;
}
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
</style>
