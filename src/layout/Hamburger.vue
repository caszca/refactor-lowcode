<template>
  <div class="hamburger" @click="toggleClick">
    <svg-icon icon-class="menu-line" :class="{'is-active':isActive}" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: { type: Boolean, default: false }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  font-size: 14px;
}
.svg-icon:active {
  background: rgba(255, 255, 255, 0.2);
}

.hamburger.is-active {
  color: #fff;
  transform: rotate(180deg);
}
</style>
