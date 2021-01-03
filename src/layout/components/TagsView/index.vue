<template>
  <div>
    <div class="switch-sidebar" :class="sidebar.opened?'':'fold'" @click="toggleSidebar">
      <i class="iconfont vue-icon-nav-unfold" />
    </div>
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭标签页</li>
      <li @click="closeOthersTags">关闭其他标签页</li>
      <li @click="closeAllTags(selectedTag)">关闭所有标签页</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'visitedViews', 'permission_routes'])
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app/toggleSidebar')
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.permission_routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY - 70
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .tags-view-container {

    .switch-sidebar {
      position: absolute;
      left: 0px;
      line-height: 44px;
      height: 44px;
      width: 44px;
      text-align: center;
      color: #888;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      .iconfont{
        font-size: 22px !important;
      }

      &:hover {
        color: #333;
        background: rgba(0, 0, 0, .05)
      }

      &.fold {
        transform: rotate(180deg);
      }
    }
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        border: 1px solid #d9ecff;
        color: #777;
        background-color: #ecf5ff;
        padding: 0 8px 0 8px;
        font-size: 12px;
        border-radius: 3px;
        margin-left: 5px;
        margin-top: 6px;
        white-space: nowrap;

        &:first-of-type {
          margin-left: 8px;
        }

        &:last-of-type {
          margin-right: 8px;
        }

        .el-icon-close {
          width: 14px;
          height: 14px;
          line-height: 14px;
          border-radius: 50%;
          text-align: center;
          transition: all .3s;
          transform-origin: 100% 50%;
          color: #aaa;

          &:hover {
            background-color: #F56C6C;
            color: #fff;
          }
        }

        &:hover {
          color: #409eff;
        }

        &.active {
          background-color: #5FB878;
          color: #fff;
          border-color: #5FB878;

          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }

          &:hover {
            background-color: #5FB878;
            color: #fff;
            border-color: #5FB878;
          }

          .el-icon-close {
            color: #cdd68d;
            &:hover {
              background-color: #f56c6c;
              color: white;
            }
          }
        }
      }
    }

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      border: 1px solid #eee;

      li {
        margin: 0;
        padding: 0px 16px;
        cursor: pointer;
        line-height: 28px;
        color: #333;
        font-size: 12px;
        font-weight: 400;

        &:hover {
          background-color: #5FB878;
          color: #fff
        }
      }
    }
  }
</style>
