<template>
  <el-form
    ref="getForm"
    class="el-custom-form"
    :model="formData"
    :disabled="formDisabled"
    :validate-on-rule-change="false"
    :rules="rules"
    :show-message="!formDisabled"
    @submit.native.prevent
  >
    <div v-for="(fields,index) in formTemplate" :key="`warp-${index}`" class="form-row">
      <template v-for="(single,singleIndex) in fields">
        <el-form-item
          v-if="!(single.autoHidden && !formData[single.model]) && (!single.lendonAnswer || canLendonAnserDisplay(single))"
          :key="single.model ? (single.model + (single.lendonValue || '')) : `item-${singleIndex}`"
          :label="single.label"
          :class="`${single.itemClass} ${getItemWidth[single.model]}`"
          :prop="getProp[single.model]"
        >
          <template slot="label">
            <div v-if="single.label" class="custom-label" :title="single.label">
              <span class="inner">{{single.label}}</span>
            </div>
          </template>
          <!-- 下拉类型 -->
          <el-custom-select
            v-if="single.type === 'select'"
            v-model="formData[single.model]"
            :class-name="single.class"
            :filterable="single.filterable"
            :disabled="single.disabled || single.autoHidden"
            :placeholder="single.placeholder"
            :loading="single.loading"
            :value-key="single.wholeKey || 'value'"
            :allow-create="single.allowCreate"
            :remote="single.remote"
            :remote-method="(query) => handleSelectRemote(query,single)"
            @visible-change="(visible) => selectVisibleChange(visible,single)"
            @change="(val) => selectChange(val,single)"
          >
            <el-option
              v-for="(item,optionIndex) in formOptions[single.optionsKey].options"
              :key="`select-${optionIndex}`"
              :label="item[single.optionLabel || 'label']"
              :value="single.wholeValue ? item : item[single.optionValue || 'value']"
            />
          </el-custom-select>
          <!-- 计数器 -->
          <el-custom-input-number
            v-else-if="single.type === 'inputNumber'"
            v-model="formData[single.model]"
            :disabled="single.disabled || single.autoHidden"
            :max="single.max"
            :min="single.min"
            :precision="single.precision"
            :class-name="single.class"
            :placeholder="single.placeholder"
          />
          <!-- 输入框 -->
          <el-custom-input
            v-else-if="single.type === 'input'"
            v-model="formData[single.model]"
            :disabled="single.disabled || single.autoHidden"
            :class-name="single.class"
            :maxlength="single.maxlength"
            :minlength="single.minlength"
            :placeholder="single.placeholder"
            :type="single.inputType"
          />
          <!-- 单选框 -->
          <el-custom-radio
            v-else-if="single.type === 'radio'"
            v-model="formData[single.model]"
            :disabled="single.disabled || single.autoHidden"
            :class-name="single.class"
          >
            <el-radio
              v-for="item in formOptions[single.optionsKey].options"
              :key="item[single.optionValue || 'value']"
              :label="item[single.optionValue || 'value']"
            >{{item[single.optionLabel || 'label']}}</el-radio>
          </el-custom-radio>
          <!-- 多选框 -->
          <el-custom-checkbox
            v-else-if="single.type === 'checkbox'"
            v-model="formData[single.model]"
            :disabled="single.disabled || single.autoHidden"
            :class-name="single.class"
          >
            <el-checkbox
              v-for="item in formOptions[single.optionsKey].options"
              :key="item[single.optionValue || 'value']"
              :label="item[single.optionValue || 'value']"
            >{{item[single.optionLabel || 'label']}}</el-checkbox>
          </el-custom-checkbox>
          <!-- 日期选择器 -->
          <el-custom-date
            v-else-if="single.type === 'date'"
            v-model="formData[single.model]"
            :disabled="single.disabled || single.autoHidden"
            :class-name="single.class"
            :placeholder="single.placeholder"
          />
          <!-- 地址选择器 -->
          <cheap-address
            v-else-if="single.type === 'address'"
            :id="single.id"
            v-model="formData[single.model]"
            :disabled="single.disabled || single.autoHidden"
            :class-name="single.class"
            :tier="single.tier"
            :parent-code="single.parentCode"
            @change="(val) => { addressChange(val,single) }"
          />
          <!-- 上传 -->
          <upload
            v-else-if="single.type === 'upload' && !formDisabled"
            :file-list.sync="formData[single.model].files"
            :disabled="single.disabled || single.autoHidden"
            :class-name="single.class"
            :auto-upload="single.autoUpload"
            :action="single.action"
            @handleChangeFileList="(data)=>handleChangeFileList(data,single)"
          >
            <template v-if="single.prefixSlot" v-slot:prefix>
              <slot :name="single.prefixSlot" :item="single" />
            </template>
            <template v-if="single.suffixSlot" v-slot:suffix>
              <slot :name="single.suffixSlot" :item="single" />
            </template>
          </upload>
          <upload-show
            v-else-if="single.type === 'upload' && formDisabled"
            :file-list="formData[single.model].files"
            @handleDownload="handleUploadDownload"
          />
          <!-- 自定义插槽 -->
          <slot v-else-if="single.type === 'slot'" :name="single.slotName" :item="single" />

          <!-- 后缀 -->
          <span v-if="single.suffix" class="item-suffix" v-html="single.suffix" />
        </el-form-item>
      </template>
    </div>
  </el-form>
</template>


<script>
import defaultConfig from '@/components/_global/CreateForm/default'
import {
  ElCustomSelect,
  ElCustomInputNumber,
  ElCustomInput,
  ElCustomRadio,
  ElCustomCheckbox,
  ElCustomDate,
  CheapAddress
} from './components'
import Upload from '../Upload'
import UploadShow from '../Upload/UploadShow'

export default {
  components: {
    ElCustomSelect,
    ElCustomInputNumber,
    ElCustomInput,
    ElCustomRadio,
    ElCustomCheckbox,
    ElCustomDate,
    CheapAddress,
    Upload,
    UploadShow
  },
  props: {
    formData: {
      type: Object,
      required: true
    },
    formOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    formTemplate: {
      type: Array,
      required: true
    },
    formRef: {
      type: Object,
      default() {
        return {}
      }
    },
    formDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultRule: {
        required: true,
        trigger: 'blur'
      },
      getItemWidth: {},
      rules: {},
      getProp: {},
      lendonPublic: {},
      lendonAnswer: {}
    }
  },
  watch: {
    formTemplate: {
      immediate: true,
      handler() {
        this.initForm()
      }
    },
    formData: {
      immediate: true,
      handler() {
        this.updateLendonPublic()
        this.updateLendonAnswerRule()
      }
    }
  },
  mounted() {
    this.$emit('update:formRef', this.$refs['getForm'])
  },
  methods: {
    selectVisibleChange(visible, item) {
      const { remoteMethod, remote, isLoadedRemote } = item

      if (
        remote &&
        this.$common.lodash.isFunction(remoteMethod) &&
        !isLoadedRemote &&
        visible
      ) {
        // 首次加载请求远程展示所有options
        item.isLoadedRemote = true
        this.handleSelectRemote('', item)
      }
    },
    // 下拉框远程搜索
    handleSelectRemote(query, item) {
      if (this.$common.lodash.isFunction(item.remoteMethod)) {
        this.formOptions[item.optionsKey].options = []
        item.loading = true

        window.Promise.resolve(
          item.remoteMethod({
            query,
            item,
            formData: this.formData,
            formRef: this.$refs['getForm']
          })
        ).then((res) => {
          if (Array.isArray(res)) {
            this.formOptions[item.optionsKey].options = res
          }

          item.loading = false
        })
      }
    },
    selectChange(value, item) {
      const { handleChange } = item
      this.updateLendonPublic(item)

      if (this.$common.lodash.isFunction(handleChange)) {
        handleChange({
          value,
          item,
          formData: this.formData,
          formRef: this.$refs['getForm'],
          formOptions: this.formOptions
        })
      }
    },
    updateLendonPublic(single = {}) {
      const { lendonKey } = single
      const lendonPublic = { ...this.lendonPublic }
      let hasChange = false

      for (const lendonKey in lendonPublic) {
        const item = lendonPublic[lendonKey]
        if (item.lendonValue !== this.formData[item.model]) {
          hasChange = true
        }
        item.lendonValue = this.formData[item.model]
      }

      if (Object.keys(lendonPublic).includes(lendonKey) && hasChange) {
        const form = this.$refs['getForm']
        let clearValidateArr = []

        for (const answerKey in this.lendonAnswer) {
          const answer = this.lendonAnswer[answerKey]
          if (lendonKey === answer.lendonKey) {
            const lendonPublicValue = lendonPublic[lendonKey].lendonValue
            const lendonPublicType = Object.prototype.toString.call(
              lendonPublicValue
            )

            let initValue
            if (lendonPublicType === '[object Array]') {
              initValue = []
            } else if (
              ['[object Number]', '[object Undefined]'].includes(
                lendonPublicType
              )
            ) {
              initValue = undefined
            } else {
              initValue = null
            }

            this.formData[answer.model] = initValue
            clearValidateArr.push(answer.model)
          }
        }

        this.lendonPublic = lendonPublic

        clearValidateArr = [...new Set(clearValidateArr)]
        this.updateLendonAnswerRule()

        this.$nextTick(() => {
          form && form.clearValidate(clearValidateArr)
        })
      }
    },
    handleUploadDownload(file) {
      this.$emit('handleUploadDownload', file)
    },
    handleChangeFileList(data, single) {
      const { model } = single

      this.$nextTick(() => {
        this.$refs['getForm'] && this.$refs['getForm'].clearValidate(model)
      })
    },
    // handleSuccessUpload(single) {
    //   const { model } = single
    //   this.$nextTick(() => {
    //     this.$refs['getForm'] && this.$refs['getForm'].clearValidate(model)
    //   })
    // },
    addressChange(val, single) {
      const { model } = single
      this.$nextTick(() => {
        this.$refs['getForm'] && this.$refs['getForm'].clearValidate(model)
      })
    },
    initForm() {
      const getProp = {}
      const getItemWidth = {}
      const lendonPublic = {}
      const lendonAnswer = {}

      this.formTemplate.forEach((row, rowIndex) => {
        row.forEach((template, templateIndex) => {
          const item = { ...defaultConfig[template.type], ...template }
          this.formTemplate[rowIndex][templateIndex] = item

          this.createProp(item, getProp)
          this.createItemClass(item, row, getItemWidth)
          this.createLendonPublic(item, lendonPublic)
          this.createLendonAnswer(item, lendonAnswer)
        })
      })

      this.getProp = getProp
      this.getItemWidth = getItemWidth
      this.lendonPublic = lendonPublic
      this.lendonAnswer = lendonAnswer
    },
    updateLendonAnswerRule() {
      const rules = {}
      this.formTemplate.forEach((row, rowIndex) => {
        row.forEach((template, templateIndex) => {
          const item = { ...defaultConfig[template.type], ...template }

          let activeItem = true
          if (item.lendonAnswer) {
            activeItem = this.canLendonAnserDisplay(item)
          }

          activeItem && this.createRule(item, rules)
        })
      })

      this.rules = rules
    },
    createRule(item, rules) {
      const { required, trigger } = this.defaultRule

      let rule
      if (item.ruleValidator) {
        rule = {
          required: !this.$common.lodash.isBoolean(item.ruleRequired)
            ? required
            : item.ruleRequired,
          trigger: item.ruleTrigger || trigger,
          validator: (rule, value, callback) => {
            item.ruleValidator({
              rule,
              value,
              callback,
              item,
              formData: this.formData,
              formRef: this.$refs['getForm']
            })
          }
        }
      } else {
        rule = {
          required: !this.$common.lodash.isBoolean(item.ruleRequired)
            ? required
            : item.ruleRequired,
          message: item.ruleMessage,
          trigger: item.ruleTrigger || trigger,
          type: item.ruleType
        }
      }

      rules[item.model] = rule
    },
    createProp(item, getProp) {
      getProp[item.model] = item.model
    },
    createItemClass(item, row, getItemWidth) {
      let itemClass = ''
      item.enablePercentage && (itemClass += `item-w-1/${row.length} `)
      item.inputType === 'textarea' && (itemClass += `textarea-item `)
      item.type === 'upload' && (itemClass += `upload-item `)

      getItemWidth[item.model] = itemClass
    },
    createLendonPublic(item, lendonPublic) {
      if (item.lendonPublic) {
        const { lendonKey, model } = item

        lendonPublic[lendonKey] = {
          lendonKey,
          model
        }
      }
    },
    createLendonAnswer(item, lendonAnswer) {
      if (item.lendonAnswer) {
        const { lendonKey, model, lendonValue } = item

        lendonAnswer[model] = {
          lendonKey,
          model,
          lendonValue
        }
      }
    },
    canLendonAnserDisplay(item) {
      const { lendonAnswer, lendonKey, lendonType, lendonValue } = item

      if (lendonAnswer) {
        if (Array.isArray(lendonValue)) {
          if (lendonType === 'unequal') {
            return !lendonValue.includes(
              this.lendonPublic[lendonKey].lendonValue
            )
          } else {
            return lendonValue.includes(
              this.lendonPublic[lendonKey].lendonValue
            )
          }
        } else {
          if (lendonType === 'unequal') {
            return this.lendonPublic[lendonKey].lendonValue !== lendonValue
          } else {
            return this.lendonPublic[lendonKey].lendonValue === lendonValue
          }
        }
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-custom-form {
  .form-row {
    width: 100%;
    @include createFlex($items: center);
    // flex-wrap: wrap;

    .el-form-item:not(:last-child) {
      margin-right: 40px;
    }

    .item-suffix {
      @include absolute-tr;
      background: $color-white;
      height: calc(100% - 6px);
      top: 3px;
      right: 2px;
      padding: 0px 10px;
      @include createFlex($items: center);
    }

    $list: ((1, 1), (1, 2), (1, 3), (1, 4), (1, 5));

    @each $myself, $total in $list {
      .item-w-#{$myself}\/#{$total} {
        width: percentage($myself / $total);

        /deep/ .el-form-item__content {
          flex: auto;
        }
      }
    }
  }

  .custom-label {
    line-height: 1.2;
    display: inline-block;
    width: 100%;
  }

  .upload-item {
    align-items: flex-start;

    /deep/ .el-form-item__label {
      width: calc(10em + 12px);
      // margin-right: 0px;
    }
    // 上传时省略号
    .custom-label {
      @include multiOverHidden($line-number: 2, $bg: white, $line-height: 1.2);
      // padding-right: 1.2em;
    }
  }
}
</style>
