<template>
  <a-modal title="新建设备" :visible="visible" :confirmLoading="confirmLoading" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
        <a-step title="选择场景" />
        <a-step title="选择设备类型" />
        <a-step title="创建设备" />
      </a-steps>
      <a-form :form="form">
        <!-- step1 -->
        <div v-show="currentStep === 0">
          <a-form-item label="场景名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select showSearch v-decorator="['sceneSecurityId']">
              <a-select-option
                v-for="item in sceneListSelect"
                :key="item.key"
                :value="item.key"
              >{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <div v-show="currentStep === 1">
          <a-form-item label="设备类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select showSearch v-decorator="['deviceType']">
              <a-select-option
                v-for="item in deviceTypeList"
                :key="item.key"
                :value="item.key"
              >{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="协议类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select showSearch v-decorator="['deviceProtocol']">
              <a-select-option
                v-for="item in deviceProtocolList"
                :key="item.key"
                :value="item.key"
              >{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div v-show="currentStep === 2">
          <a-form-item label="设备名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['name', {rules: [{required: true, message: '请输入设备名称！'}]}]" />
          </a-form-item>
          <a-form-item label="设备描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['info', {rules: [{required: true, message: '请输入设备描述！'}]}]" />
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button
        key="back"
        @click="handleBackward"
        v-if="currentStep > 0"
        :style="{ float: 'left' }"
      >上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button
        key="forward"
        :loading="confirmLoading"
        type="primary"
        @click="handleNext(currentStep)"
      >{{ currentStep >= 2 && '完成' || '下一步' }}</a-button>
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
      deviceTypeList: state => state.device.deviceTypeList,
      deviceProtocolList: state => state.device.deviceProtocolList
    }),
    ...mapGetters(['sceneListSelect'])
  },
  methods: {
    ...mapActions(['createDeviceCoAP', 'createDeviceHTTP', 'createDeviceMQTT']),
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
        this.submit()
      }
      this.currentStep += 1
    },
    submit () {
      const {
        form: { validateFields }
      } = this

      validateFields((errors, values) => {
        if (!errors) {
          this.confirmLoading = false
          this.visible = false
          // this.AddScene(values).then(res => {
          //   this.confirmLoading = false
          //   this.visible = false
          //   this.resetForm()
          // })
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style>
</style>
