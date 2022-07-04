# 自封的自动滚动组件

## 组件说明

### 一、 jsx 语法的自动滚动条 AutoScroll

1. 组件位置 ： src/components/AutoScroll.vue
2. 说明： 使用 requestAnimationFrame 执行的滚动
3. 列表的单项渲染需要使用 customRenderItem 方法（您可以使用 jsx 语法或 createElement 方法） - 见 home.vue 的示例

### 二、 jsx 语法的自动滚动条 AutoScroll2

1. 组件位置 ： src/components/AutoScroll2.vue
2. 说明： 使用 transition 过渡和 setInterval 执行的滚动
3. 列表的单项渲染需要使用 customRenderItem 方法（您可以使用 jsx 语法或 createElement 方法） - 见 home.vue 的示例

### 三、 可使用 template 插槽的自动滚动条 AutoScrollSlot

1. 组件位置 ： src/components/AutoScrollSlot.vue
2. 说明： 使用 requestAnimationFrame 执行的滚动
3. 列表的单项渲染可使用作用域插槽 - 见 about.vue 的示例

> 一般建议使用 AutoScroll 或 AutoScrollSlot 组件，使用 requestAnimationFrame 进行过渡比较的平滑
