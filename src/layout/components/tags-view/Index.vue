<template>
  <header id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag) ? 'active' : ''" :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" class="tags-view-item" @click.middle.native="closeSelectedTag(tag)" @contextmenu.prevent.native="openMenu(tag, $event)">
        {{ tag.title }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
  </header>
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
      homeViews: {},
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    ...mapGetters(['sideBar', 'device', 'user', 'avatar', 'sex']),
    visitedViews() {
      var visit = this.$store.state.tagsView.visitedViews
      visit = visit.filter((i) => {
        if (!((i.name === 'Login') || (i.name === 'Register') || (i.name === 'Forget'))) {
          return i
        }
      })
      return visit
    },
    routes() {
      return this.$store.state.permission.routes
    }
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
    // 页面刷新前缓存和赋值
    this.beforeUnload()
    this.initTags()
    this.addTags()
  },
  methods: {
    beforeUnload() {
      // 监听页面刷新
      window.addEventListener('beforeunload', () => {
        // visitedViews数据结构太复杂无法直接JSON.stringify处理，先转换需要的数据
        const tabViews = this.visitedViews.map(item => {
          return {
            fullPath: item.fullPath,
            hash: item.hash,
            meta: { ...item.meta },
            name: item.name,
            params: { ...item.params },
            path: item.path,
            query: { ...item.query },
            title: item.title
          }
        })
        sessionStorage.setItem('tabViews', JSON.stringify(tabViews))
      })
      // 页面初始化加载判断缓存中是否有数据
      const oldViews = JSON.parse(sessionStorage.getItem('tabViews')) || []
      if (oldViews.length > 0) {
        this.$store.state.tagsView.visitedViews = oldViews
        sessionStorage.removeItem('tabViews')
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
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
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      // eslint-disable-next-line no-unused-vars
      for (const tag of affixTags) {
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
        // eslint-disable-next-line no-unused-vars
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
      this.$store
        .dispatch('tagsView/delCachedView', view)
        .then(() => {
          const { fullPath } = view
          this.$nextTick(() => {
            // this.$router.replace({
            //   path: '/redirect' + fullPath
            // })
            this.$router.push({
              path: fullPath,
              replace: true
            })
          })
        })
        .catch(error => error)
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
        .catch(error => error)
    },
    closeOthersTags(view) {
      this.$router.push(view)
      this.$store
        .dispatch('tagsView/delOthersViews', view)
        .then(() => {
          this.moveToCurrentTag()
        })
        .catch(error => error)
    },
    closeAllTags(view) {
      this.$store
        .dispatch('tagsView/delAllViews')
        .then(({ visitedViews }) => {
          if (this.affixTags.some(tag => tag.path === view.path)) {
            return
          }
          this.toLastView(visitedViews, view)
        })
        .catch(error => error)
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
      const menuMinWidth = 210
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = 34
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
@import "@/assets/css/element-variables.scss";
$tagsViewHeight: 34px;
.tags-view-container {
  background-color: #8CAAFF !important;
  position: relative;
  height: $tagsViewHeight;
  width: 100%;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: calc(#{$tagsViewHeight} - 6px);
      line-height: 28px;
      color: #fff;
      padding: 0 14px;
      font-size: 12px;
      margin-top: 6px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        border-radius: 6px 6px 0px 0px;
        background-color: #f7f8fa;
        color: #171c3c;
      }
    }
  }
  .tags-view-item:hover {
    background-color: mix($--color-primary, #fff, 42%);
    border-radius: 6px 6px 0px 0px;
  }
  .tags-view-item::after {
    content: "";
    width: 1px;
    background: #f7f8fa;
    position: absolute;
    pointer-events: none;
    top: 30%;
    bottom: 30%;
    right: -2px;
  }
  .tags-view-item.active::before,
  .tags-view-item.active::after {
    content: "";
    height: 14px;
    width: 14px;
    background: transparent;
    pointer-events: none;
    position: absolute;
    top: 14px;
    z-index: 1;
  }
  .tags-view-item.active::before {
    left: -14px;
    border-bottom-right-radius: 6px;
    box-shadow: 4px 4px 0 0px #f7f8fa;
  }
  .tags-view-item.active::after {
    right: -14px;
    border-bottom-left-radius: 6px;
    box-shadow: -4px 4px 0 0px #f7f8fa;
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
