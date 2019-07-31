<template>
  <div v-html="image"/>
</template>

<script>
import jdenticon from 'jdenticon'

export default {
  data () {
    return {
      image: null
    }
  },
  mounted () {
    this.image = jdenticon.toSvg(this.value, this.size)
    console.log(this.image)
  },
  props: {
    value: String,
    size: Number
  }
}
</script>

<style>
</style>
