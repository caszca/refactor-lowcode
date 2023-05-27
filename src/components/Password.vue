<template>
  <el-row class="password" type="flex">
    <div :class="hasReset? 'input-password-box': 'normal-box'">
      <el-input v-model="password" type="password" :maxlength="CONSTANT.INFO_MAX_LENGTH" :placeholder="placeholder" :disabled="disabled" />
    </div>
    <div v-if="hasReset" class="reset" style="text-align:right"><span @click="reset">重置</span></div>
  </el-row>
</template>

<script>

export default {
  name: 'Password',
  props: {
    value: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '请输入' },
    hasReset: { type: Boolean, default: true },
    disabled: { type: Boolean, default: true }
  },
  data() {
    return {
      password: this.value
    }
  },
  watch: {
    value(val) {
      this.password = val
    }
  },
  created() {
  },
  methods: {
    async reset() {
      // if (this.disabled) return
      this.password = '000000'
      this.$emit('input', this.password)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/element-variables.scss";
.password {
  .input-password-box {
    width: calc(100% - 60px);
  }
  .normal-box{
    width: 100%;
  }
  .reset {
    width: 60px;
    cursor: pointer;
    color: $--color-primary;
    text-decoration: underline;
  }
  .reset.disabled {
    cursor: not-allowed;
    color: grey;
  }
}
</style>
