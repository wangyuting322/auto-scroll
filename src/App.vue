<template>
  <div id="app">
    <nav class="wrapper">
      <div v-for="(item,index) in list" :key="index" @click="to(item)" class="item">{{item.name}}</div>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      list: [
        { path: '/', name: 'jsx语法模拟' },
        { path: '/about', name: 'template语法模拟' },
        { path: '/contentAutoScrollTest', name: '根据内容自动滚动(scroll)' },
        { path: '/contentAutoScrollTest2', name: '根据内容自动滚动(absolute)' }
      ]
    }
  },
  methods: {
    to ({ path }) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  .item {
    margin: 10px;
    padding: 10px;
  }
  .item:not(:first-child) {
    border-left: 1px solir grey;
  }
}
</style>
