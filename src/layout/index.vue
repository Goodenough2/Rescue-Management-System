<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <app-header class="header-container" />
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <div class="page-container">
        <tags-view class="tags-view-container" />
        <navbar class="navbar-container" />
        <subpage class="subpage-container" />
      </div>
    </div>
    <right-panel v-if="showSettings">
      <settings />
    </right-panel>
    <operate-notify />
  </div>
</template>

<script>
import { AppHeader, Sidebar, TagsView, Navbar, Subpage, Settings, RightPanel, OperateNotify } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppHeader,
    Sidebar,
    TagsView,
    Navbar,
    Subpage,
    RightPanel,
    Settings,
    OperateNotify
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(['sidebar', 'device', 'showSettings']),
    classObj() {
      return {
        'fold-sidebar': this.device !== 'mobile' && !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSidebar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    /*&.mobile.openSidebar {
      position: fixed;
      top: 0;
    }*/
  }

  /*.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }*/

  .header-container {
    @include clearfix;
    height: 70px;
    width: 100%;
    overflow: hidden;
    background-color: $pageHeaderBgColor;
  }

  .main-container {
    transition: top .28s;
    position: absolute;
    top: 70px;
    bottom: 0px;
    width: 100%;

    .sidebar-container {
      transition: width 0.28s;
      width: $sidebarWidth;
      background-color: $sidebarMenuBgColor;
      position: absolute;
      font-size: 0px;
      top: 0px;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
    }

    .page-container{
      transition: left 0.28s;
      position: absolute;
      overflow: hidden;
      left: $sidebarWidth;
      right: 0px;
      top: 0px;
      bottom: 0px;

      .tags-view-container {
        position: relative;
        height: 44px;
        padding-left: 44px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
      }

      .navbar-container {
        @include clearfix;
        height: 36px;
        overflow: hidden;
        background: #fff;
        border-bottom: 1px solid #eee;

      }

      .subpage-container {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 80px;
        bottom: 0px;
      }
    }
  }

  /* 折叠菜单 */
  .fold-sidebar {
    .sidebar-container {
      width: 54px;
    }

    .page-container {
      left: 54px;
    }
  }

  .withoutAnimation {
    .page-container,
    .sidebar-container {
      transition: none;
    }
  }

  /* 移动端 */
  /*.mobile .fixed-header {
    width: 100%;
  }*/
</style>
