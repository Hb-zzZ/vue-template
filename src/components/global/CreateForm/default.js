/**
开启百分比
enablePercentage: Boolean
自定义验证规则
ruleValidator: Fn( {rule, value, callback, formData:this.formData, item, formRef:this.$refs['getForm']} )
 **/
import verify from './verify'

export default {
  select: {
    type: 'select',
    class: 'normal-input',
    ruleType: 'string',
    ruleMessage: '不能为空',
    filterable: false,
    placeholder: '请选择',
    autoHidden: false,
    optionValue: 'value',
    optionLabel: 'label',
    itemClass: '',
    model: ''
  },

  inputNumber: {
    type: 'inputNumber',
    autoHidden: false,
    max: 999999999999999,
    min: 0,
    precision: 2,
    class: 'normal-input',
    placeholder: '请输入',
    ruleType: 'number',
    ruleMessage: '不能为空',
    itemClass: ' '
  },

  input: {
    type: 'input',
    class: 'normal-input',
    ruleType: 'string',
    ruleMessage: '不能为空',
    autoHidden: false,
    maxlength: '300',
    minlength: '0',
    placeholder: '请输入',
    inputType: 'text',
    itemClass: ' '
  },

  radio: {
    type: 'radio',
    ruleType: 'string',
    ruleMessage: '不能为空',
    autoHidden: false,
    optionValue: 'value',
    optionLabel: 'label',
    class: ' ',
    itemClass: ' '
  },

  checkbox: {
    type: 'checkbox',
    ruleType: 'array',
    ruleMessage: '不能为空',
    autoHidden: false,
    optionValue: 'value',
    optionLabel: 'label',
    class: ' ',
    itemClass: ' '
  },

  date: {
    type: 'date',
    class: 'normal-input',
    ruleType: 'string',
    ruleMessage: '不能为空',
    placeholder: '请选择',
    itemClass: ' '
  },

  slot: {
    type: 'slot',
    class: ' ',
    ruleType: 'string',
    ruleMessage: '不能为空',
    placeholder: '请选择',
    itemClass: ' '
  },

  address: {
    type: 'address',
    class: ' ',
    tier: 'province',
    itemClass: ' ',
    ruleType: 'string',
    ruleMessage: '不能为空',
    id: '1',
    parentCode: null
  },

  upload: {
    type: 'upload',
    autoHidden: false,
    class: ' ',
    autoUpload: true,
    action: '',
    enablePercentage: true,
    ruleValidator: verify.upload
  }
}
