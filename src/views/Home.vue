<script>
import AutoScroll from '@/components/AutoScroll.vue'
import AutoScroll2 from '@/components/AutoScroll2.vue'
import AutoScrollSlot from '@/components/AutoScrollSlot.vue'
export default {
  name: 'Home',
  components: {
    AutoScroll,
    AutoScroll2,
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
    customRenderItem (value, index) {
      return (
        <div class="flex-row">
          <div class='width50'>
            {value.name}
          </div>
          <div class='width50 oo'>
            {value.age}
            <div class='kk'>dsad </div>
          </div>
        </div>
      )
    }
  },
  render () {
    return (
      <div class='home'>
        <AutoScroll class='height300 width300' listData={this.list} direction='left' maxNum={10} customRenderItem={this.customRenderItem}>
        </AutoScroll>
        <AutoScroll2 class='height300 width300' listData={this.list} direction='left' maxNum={10} customRenderItem={this.customRenderItem}>
        </AutoScroll2>
      </div>
    )
  }
}
</script>
<style lang="scss">
.home {
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
.oo{
  position: relative;
  overflow: hidden;
}
.kk{
  position: absolute;
}
</style>
