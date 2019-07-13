<template>
  <a-modal :visible="visible">创建设备</a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    create() {
      this.visible = true
    }
  }
}
</script>

<style>
</style>
