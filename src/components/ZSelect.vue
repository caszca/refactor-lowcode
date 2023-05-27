<template>
  <div class="z-select">
    <span class="z-select__label"><label>{{ label }}</label></span>
    <el-cascader v-if="type==='cascader'" v-model="selection" :disabled="disabled" :size="size" :options="options" :placeholder="placeholder" :props="defaultProps" @change="handleChange" />
    <el-input-number v-else-if="type==='number'" v-model="selection" :disabled="disabled" :min="0" :max="4" :size="size" @change="handleChange" />
    <el-select v-else v-model="selection" :disabled="disabled" :placeholder="placeholder" :size="size" :clearable="clearable" @change="handleChange">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ZSelect',
  // 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event
  model: {
    prop: 'value', // 注意，是prop，不带s
    event: 'input'
  },
  props: {
    value: { type: [String, Number, Array, Object], default: null },
    cascader: { type: Boolean, default: false }, // 是否是级联
    type: { type: String, default: 'select' },
    label: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: '' },
    size: { type: String, default: 'mini' },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true }
  },
  data() {
    return {
      selection: this.value,
      defaultProps: {
        children: 'childList',
        label: 'name',
        value: 'id'
      }
    }
  },
  watch: {
    value(val) {
      this.selection = val
    }
  },
  methods: {
    handleChange(newVal, oldVal) {
      this.$emit('input', newVal)
      this.$emit('change', newVal, oldVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.z-select {
  display: inline-flex;
}
.z-select__label {
  display: inline-flex;
  background: #FFF8F1;
  border: 1px solid #f2f2f2;
  border-right: 0;
  border-radius: 4px 0px 0px 4px;
  white-space: nowrap;
  align-items: center;
  padding: 0 12px;
  color: #666666;
  font-size: 12px;
  height: 28px;
  font-weight: 400;
  line-height: 28px;
  label {
    margin-left: 5px;
  }
}
::v-deep .el-input__inner {
  border: 1px solid #f2f2f2;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
::v-deep {
  .el-input-number__increase,
  .el-input-number__decrease {
    background-color: #fff;
  }
}
</style>
