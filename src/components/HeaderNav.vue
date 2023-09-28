<template>
 <div class="header">
  <slot></slot>
  <div class="header-title text-pink-500 text-lg">find<span class="text-pink-300">books</span></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
 display: flex;
 align-items: center;
 height: 70px;
 width: 100%;
 background-color: #fff;
 padding: 0 30px;
 font-size: 14px;
 font-weight: 500;
 color: var(--body-color-light);
 justify-content: space-between;
 flex-shrink: 0;
}
</style>
