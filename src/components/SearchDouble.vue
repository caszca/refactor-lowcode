<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容" />
  </div>
</template>

<script>

export default {
  props: {
    input: { type: String, default: '' },
    doubleWords: { type: Object, default: () => ({}) },
    placeholder: { type: String, default: '请选择' },
    searchKey: { type: Object, default: () => ({}) },
    regKey: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
    }
  },
  computed: {},
  created() {
  },
  methods: {
    doubleWordsAdd() {
      console.log(this.doubleWords)
      console.log(this.input)
    }
  }
}
</script>

