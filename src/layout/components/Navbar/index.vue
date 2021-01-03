<template>
  <div>
    <i class="iconfont vue-icon-location" />
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb'

export default {
  components: {
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
  .vue-icon-location{
    font-size: 24px;
    margin-left: 10px;
    height: 35px;
    line-height: 35px;
    color: #ccc;
    display: inline-block;
    float: left;
  }

  .breadcrumb-container {
    float: left;
  }
</style>
