<template>
 <div class="header bg-white flex sm:justify-between md:items-center justify-center p-4">
  <slot></slot>
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
 width: 100%;
 background-color: #fff;
 font-size: 14px;
 font-weight: 500;
 color: var(--body-color-light);
}
</style>
