import common from '@/utils/common'
function commonJudge(
  data = {
    rule: {},
    reg: null,
    value: null,
    callback: () => {},
    errTitle: '输入格式不对'
  }
) {
  const { rule, reg, value, callback, errTitle } = data

  const valueNotExist = !value || (common.lodash.isString(value) && !value.trim())

  if (!rule.required && valueNotExist) {
    callback()
  } else if (valueNotExist) {
    callback(new Error('不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error(errTitle || '格式错误'))
  } else {
    callback()
  }
}

export default {
  // 时间验证 开始不能晚于结束
  timeRule(verify) {
    const { rule, value, callback, item, formData, formRef } = verify

    if (!rule.required && !value) {
      callback()
    }

    let clearValidateArr = []
    let pass = true

    // 开始时间 < 结束时间
    const verifyFn = (time) => {
      const { start, end } = time
      clearValidateArr = [...clearValidateArr, ...[start, end]]

      if (start && end && [start, end].includes(item.model)) {
        if (
          formData[start] &&
          formData[end] &&
          common.time2timestamp(formData[start]) > common.time2timestamp(formData[end])
        ) {
          pass = false
          callback(new Error(item.timeMessage || '开始日期不能晚于结束日期'))
        }
      }
    }

    item.timeFields.forEach((time) => {
      verifyFn(time)
    })

    if (pass) {
      clearValidateArr = [...new Set(clearValidateArr)]
      formRef && formRef.clearValidate(clearValidateArr)

      callback()
    }
  },
  // 验证手机
  phoneNumber(verify) {
    const { rule, value, callback } = verify
    const reg = /^[1]([3-9])[0-9]{9}$/
    commonJudge({ rule, reg, value, callback, errTitle: '手机号码错误' })
  },
  // 验证电话号码或手机
  telOrPhone(verify) {
    const { rule, value, callback } = verify
    const reg = /^[0-9][-0-9]{4,18}[0-9]$/
    commonJudge({
      rule,
      reg,
      value,
      callback,
      errTitle: '手机或电话号码格式错误'
    })
  },
  // 验证社会信用统一代码
  societyCreditCode(verify) {
    const { rule, value, callback } = verify
    const reg = /^[0-9A-Z]{18}$/
    return commonJudge({ rule, reg, value, callback, errTitle: '格式错误' })
  },
  // 验证银行账户
  bankCount(verify) {
    const { rule, value, callback } = verify
    const reg = /^\d{16}|\d{19}$/
    return commonJudge({
      rule,
      reg,
      value,
      callback,
      errTitle: '银行账户格式错误'
    })
  },
  // 验证身份证
  identityCard(verify) {
    const { rule, value, callback } = verify
    const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    return commonJudge({ rule, reg, value, callback, errTitle: '身份证错误' })
  },
  // 验证护照
  passport(verify) {
    const { rule, value, callback } = verify
    const reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
    return commonJudge({ rule, reg, value, callback, errTitle: '护照错误' })
  },
  // 验证邮编
  zip_code(verify) {
    const { rule, value, callback } = verify
    const reg = /^[1-9][0-9]{5}$/
    return commonJudge({ rule, reg, value, callback, errTitle: '邮编错误' })
  },
  // 上传验证
  upload(verify) {
    const { rule, value, callback } = verify
    if (!rule.required && common.lodash.isEmpty(value.files)) {
      callback()
    } else if (common.lodash.isEmpty(value.files)) {
      callback(new Error('请上传文件'))
    } else {
      callback()
    }
  }
}
