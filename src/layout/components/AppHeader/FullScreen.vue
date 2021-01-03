<template>
  <div>
    <el-tooltip :content="isFullscreen?'取消全屏显示':'全屏显示'" placement="bottom">
      <i class="iconfont" :class="isFullscreen?'vue-icon-fullscreen-exit':'vue-icon-fullscreen'" @click="click" />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: '您的浏览器不支持全屏显示',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
  .iconfont{
    font-size: 24px;
  }
</style>
