<template>
  <a-modal :visible="visible" @cancel="handleCancel" @ok="handleSubmit">
    <div class="container">
      <a-tabs :activeKey="activeKey" @change="handleTabChange">
        <a-tab-pane tab="纯文本" :key="0">
          <a-textarea placeholder="输入发送的文字" :rows="8" />
        </a-tab-pane>
        <a-tab-pane tab="JSON" :key="1">
          <a-form-item label="协议类型" :labelCol="labelCol">
            <a-textarea placeholder="输入发送的JSON" :rows="8" />
          </a-form-item>
        </a-tab-pane>
        <a-button class="format-button" slot="tabBarExtraContent" @click="handleFormat">格式化JSON</a-button>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      visible: false
    }
  },
  methods: {
    create() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    handleSubmit() {},
    handleTabChange(e) {
      console.log(e)
    },
    handleFormat() {}
  }
}
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
