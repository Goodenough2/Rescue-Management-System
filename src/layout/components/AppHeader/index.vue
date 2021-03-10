<template>
  <div>
    <div class="title-container">
      <router-link class="title-link" to="/">
        <img :src="logo1" height="50" class="logo">
        <h1 class="title">{{ title }} </h1>
      </router-link>
    </div>
    <template v-if="device!=='mobile'">
      <div class="app-tools">
        <error-log id="tool-errorlog" class="errLog-container app-tool" />
        <screenfull id="tool-screenfull" class="app-tool" />
        <el-dropdown id="tool-userinfo" class="app-tool" trigger="click">
          <span class="el-dropdown-link">
            <i class="iconfont vue-icon-user2" />
<!--            <span>{{ user.roleName }}</span>-->
<!--            <span>{{ user.name }}</span>-->
            <i class="el-icon-caret-bottom" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/system-manage/password"> 修改密码</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from './FullScreen'
import { title } from '@/settings'

export default {
  name: 'AppHeader',
  components: {
    ErrorLog,
    Screenfull
  },
  data() {
    return {
      title,
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      logo1: '/../../favicon4.ico'
    }
  },
  computed: {
    ...mapGetters(['device', 'user'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('account/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .title-container {
    float: left;
    padding: 10px 0 10px 20px;
    height: 100%;

    .title-link {
      @include clearfix;
      display: inline-block;
      height: 100%;
      line-height: 50px;

      .logo {
        float: left;
        display: inline-block;
        margin-right: 12px;
      }

      .title {
        float: left;
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: normal;
        font-size: 28px;
        letter-spacing: 3px;
      }
    }
  }

  .app-tools {
    @include clearfix;
    float: right;
    padding: 10px 10px 10px 0px;
    height: 100%;

    &:focus {
      outline: none;
    }

    .app-tool {
      float: left;
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      line-height: 50px;
      color: #ccc;
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }

  #tool-userinfo {

    .el-dropdown-link {
      @include clearfix;
      position: relative;

      .iconfont{
        font-size: 24px;
      }

      * {
        float: left;
        margin: 0 5px;
        line-height: 50px;
      }
    }
  }

  /*
    .mobile .header-container{
      height: 40px;

      .title-container {
        padding: 5px 0px;
        position: relative;
        width:100%;

          .logo {
            float: none;
            position: absolute;
            left:0px;
            z-index: 1;
            display: inline-block;
            margin-right: 12px;
          }

          .title {
            float: none;
            width: 100%;
            text-align: center;
            font-size: 14px;
            letter-spacing: 0px;
          }
        }
    }*/

</style>
