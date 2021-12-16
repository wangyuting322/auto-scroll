<script>
import AutoScroll from '@/components/AutoScroll.vue'
export default {
  name: 'Home',
  components: {
    AutoScroll
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
        <p class='width50'>{value.name}{value.age}</p>
      )
    }
  },
  render () {
    return (
      <div class='home'>
        <AutoScroll class='height300 width300' listData={this.list} direction='left' maxNum={10} customRenderItem={this.customRenderItem}>
        </AutoScroll>
      </div>
    )
  }
}
</script>
<style lang="scss">
.home {
  height: 100%;
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
  height:50px;
  background-color: #42dd;
  margin: 5px;
}
</style>
