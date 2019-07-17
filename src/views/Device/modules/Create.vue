<template>
  <a-modal title="新建设备" :visible="visible" :confirmLoading="confirmLoading" @cancel="handleCancel" @ok="handleSubmit">
    <a-form :form="form">
      <!-- step1 -->
      <div v-show="currentStep === 0">
        <a-form-item label="场景名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            showSearch
            v-decorator="['sceneSecurityId']"
          >
            <a-select-option
              v-for="item in sceneListSelect"
              :key="item.key"
              :value="item.key"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </div>

      <a-form-item label="设备类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select
          showSearch
          v-decorator="['deviceType', {rules: [{required: true, message: '请选择设备类型！'}]}]"
        >
          <a-select-option
            v-for="item in deviceTypeMap"
            :key="item.key"
            :value="item.key"
          >{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="协议类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select
          showSearch
          v-decorator="['deviceProtocol',{rules: [{required: true, message: '请选择协议类型！'}]}]"
        >
          <a-select-option
            v-for="item in deviceProtocolMap"
            :key="item.key"
            :value="item.key"
          >{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="设备名" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['name', {rules: [{required: true, message: '请输入设备名称！'}]}]" />
      </a-form-item>
      <a-form-item label="设备描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['info', {rules: [{required: true, message: '请输入设备描述！'}]}]" />
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleSubmit">完成</a-button>
    </template>
  </a-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      confirmLoading: false,
      visible: false,
      currentStep: 0,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapState({
      deviceTypeMap: state => state.device.deviceTypeMap,
      deviceProtocolMap: state => state.device.deviceProtocolMap
    }),
    ...mapGetters(['sceneListSelect'])
  },
  methods: {
    ...mapActions(['AddDevice']),
    create () {
      this.visible = true
    },
    handleBackward () {
      this.currentStep -= 1
    },
    handleCancel () {
      this.visible = false
    },
    handleNext () {
      if (this.currentStep === 2) {
        this.handleSubmit()
      }
      this.currentStep += 1
    },
    handleSubmit () {
      const {
        AddDevice,
        form: { validateFields }
      } = this

      validateFields((errors, values) => {
        if (!errors) {
          AddDevice(values).then(res => {
            this.confirmLoading = false
            this.visible = false
          })
        } else {
          this.confirmLoading = false
        }
        this.$emit('ok', values)
      })
    }
  }
}
</script>

<style>
</style>
