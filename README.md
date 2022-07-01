# 自封的自动滚动组件

## 组件位置

> - src/components/AutoScroll.vue  
>   使用 requestAnimationFrame 执行的滚动，需要使用 jsx 语法传递单项渲染 - 见 home.vue 的示例
> - src/components/AutoScroll2.vue  
>   使用 transition 过渡和 setInterval 执行的滚动，需要使用 jsx 语法传递单项渲染 - 见 home.vue 的示例
> - src/components/AutoScrollSlot.vue  
>    使用 requestAnimationFrame 执行的滚动，使用者可使用作用域插槽进行使用 - 见 about.vue 的示例
>   一般建议使用 AutoScroll 组件
