<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统风格设置</h3>
      <div class="drawer-item">
        <span>控件颜色</span>
        <theme-picker style="" @change="themeChange" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from './ThemePicker'

export default {
  components: { ThemePicker },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;

    theme-picker{
      float: right;
      height: 26px;
      margin: -3px 8px 0 0;
    }
  }

  .drawer-switch {
    float: right
  }
}
</style>
