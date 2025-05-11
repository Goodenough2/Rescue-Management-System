<template>
  <span />
</template>

<script>
import { createSocket } from '@/utils/websocket'
import { getUserName } from '@/utils/auth'

// import { mapGetters } from 'vuex'
// import { getToken } from '@/utils/auth'

export default {
  created() {
    // 建立连接
    // createSocket(process.env.VUE_APP_BASE_API.replace('http', 'ws') + '/websocket/alarm/' + getToken())
    createSocket('ws://localhost:9528' + '/websocket/' + getUserName())
    // console.log(this.$store.getters.user)
    // 注册监听事件
    window.addEventListener('onmessageWS', e => {
      try {
        const data = JSON.parse(e && e.detail.data)
        const notifyHtml = `<div class="operate-notify">提示窗口内容</div>`
        this.$notify({
          dangerouslyUseHTMLString: true,
          offset: 140,
          message: notifyHtml,
          position: 'bottom-right',
          onClick: () => {
            this.$router.replace({ path: '/a/b/c（路由）', query: { id: data.id }}) // 相应点击动作
          }
        })
      } catch (err) {
        console.log(err)
      }
    })
  }

}
</script>

<style lang="scss">
  @import "~@/styles/mixin.scss";

  .operate-notify{
    @include clearfix;
    cursor: pointer;
    //（样式）
  }

</style>
