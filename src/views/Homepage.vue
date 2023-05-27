<template>
  <div>欢迎使用</div>
</template>

<script>
import defaultSettings from '@/settings'

export default {
  name: 'Homepage',
  data() {
    return {
    }
  },
  computed: {
    settings() {
      return defaultSettings
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
