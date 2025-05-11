<template>
  <div>
    <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  updated() {
    // 修复滚动条不显示的bug
    this.$refs.scrollbar.update()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  #app {

    .sidebar-container {
      // reset element-ui css
      .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
      }

      .el-scrollbar {
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      // /deep/ .scrollbar-wrapper {
      //   overflow-x: hidden !important;
      // }

      // /deep/ .el-scrollbar__bar.is-vertical {
      //   right: 0px;
      //   .el-scrollbar__thumb{
      //     background-color: $scrollbarColor;
      //   }
      // }

      // /deep/ .is-horizontal {
      //   display: none;
      // }

      .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;

        // /* 一级菜单 */
        // /deep/ .el-menu-item.submenu-title-noDropdown,
        // /deep/ .el-submenu__title {
        //   background-color: $sidebarMenuBgColor !important;
        //   color: $sidebarMenuTextColor !important;
        //   height: 44px;
        //   line-height: 44px;
        //   font-size: 15px;

        //   &:hover {
        //     background-color: $sidebarMenuHoverBgColor !important;
        //     color: $sidebarMenuTextHoverColor !important;
        //   }
        // }

        // // 子菜单
        // /deep/ .el-submenu .el-menu-item {
        //   background-color: $sidebarSubMenuBgColor !important;
        //   color: $sidebarSubMenuTextColor !important;
        //   height: 44px;
        //   line-height: 44px;
        //   font-size: 15px;

        //   &:hover {
        //     background-color: $sidebarSubMenuHoverBgColor !important;
        //     color: $sidebarSubMenuTextHoverColor !important;
        //   }
        // }

        // // 当前菜单
        // /deep/ .el-menu-item.is-active {
        //   background-color: $sidebarMenuActiveBgColor !important;
        //   color: $sidebarMenuTextActiveColor !important;

        //   &:hover{
        //     background-color: $sidebarMenuActiveBgColor !important;
        //     color: $sidebarMenuTextActiveColor !important;
        //   }
        // }
      }

      // /deep/ a {
      //   display: inline-block;
      //   width: 100%;
      //   overflow: hidden;
      // }

      // /deep/ .svg-icon {
      //   margin-right: 16px;
      // }
    }

    // 折叠菜单
    .fold-sidebar {
      .el-menu {
        // /deep/ .el-submenu {
        //   & > .el-submenu__title {
        //     & > span {
        //       height: 0;
        //       width: 0;
        //       overflow: hidden;
        //       visibility: hidden;
        //       display: inline-block;
        //     }
        //   }

        // }

        // /deep/ .el-submenu.is-active {
        //   .el-submenu__title {
        //     background-color: $sidebarMenuActiveBgColor !important;
        //     color: $sidebarMenuTextActiveColor !important;
        //   }
        // }
      }
    }
    // mobile responsive
   /* .mobile {
        .main-container {
          margin-left: 0px;
        }

        .sidebar-container {
          transition: transform .28s;
          width: $sidebarWidth !important;
        }

        &.hideSidebar {
          .sidebar-container {
            pointer-events: none;
            transition-duration: 0.3s;
            transform: translate3d(-$sidebarWidth, 0, 0);
          }
        }
      }*/

  }
</style>

<style lang="scss">
@import '@/styles/variables.scss';
  // 弹出菜单在app之外，不可以使用scoped
  // 折叠后 二级弹出菜单
  .el-menu--vertical {

    .el-menu--popup {
      background-color: $sidebarMenuBgColor !important;

      .el-menu-item {
        background-color: $sidebarMenuBgColor !important;
        color: $sidebarMenuTextColor !important;

        &:hover {
          background-color: $sidebarSubMenuHoverBgColor !important;
          color: $sidebarSubMenuTextHoverColor !important;
        }
      }

      // 当前菜单
      .el-menu-item.is-active {
        background-color: $sidebarMenuActiveBgColor !important;
        color: $sidebarMenuTextActiveColor !important;

        &:hover {
          background-color: $sidebarMenuActiveBgColor !important;
          color: $sidebarMenuTextActiveColor !important;
        }
      }
    }

    // the scroll bar appears when the subMenu is too long
    > .el-menu--popup {
      max-height: 70vh;
      overflow-y: auto;

      &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
      }
    }
  }

</style>
