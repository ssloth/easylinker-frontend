// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'
import { Message } from 'paho-mqtt'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixSiderbar: state => state.app.fixSiderbar,
      fixSidebar: state => state.app.fixSiderbar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      sidebarOpened: state => state.app.sidebar,
      multiTab: state => state.app.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

const mixinSelectMap = {
  methods: {
    getNameByKey (map, key) {
      const result = map.find(item => item.key === key)
      return result ? result.name : '--'
    }
  }
}

const mixinMqtt = {
  created () {
    if (this.subscribe) this.subscribe()
  },
  unmounted () {
    if (this.unsubscribe) this.unsubscribe()
  },
  computed: {
    ...mapState({
      detail: state => state.device.detail
    }),
    topic () {
      const { deviceProtocol, securityId } = this.detail
      if (deviceProtocol !== 'MQTT') return null
      return `/device/${securityId}/`
    }
  },
  methods: {
    subscribe () {
      if (this.detail.deviceProtocol === 'MQTT' && this.$mqtt) {
        console.log(this.$mqtt)
        this.$mqtt.subscribe(this.detail.topic)
        this.$mqtt.onMessageArrived = message => {
          console.log('onMessageArrived:' + message.payloadString)
        }
      }
    },
    unsubscribe () {
      if (this.detail.deviceProtocol === 'MQTT' && this.$mqtt) {
        this.$mqtt.unsubscribe(this.detail.topic)
        this.$mqtt.onMessageArrived = null
      }
    },
    publish (data) {
      if (this.detail.deviceProtocol === 'MQTT' && this.$mqtt && this.$mqtt.isConnected()) {
        let stringData = ''
        try {
          stringData = JSON.stringify(data)
        } catch (error) {}
        const message = new Message(stringData)
        this.$mqtt.destinationName = this.detail.topic + 's2c'
        this.$mqtt.send(message)
      }
    }
  }
}

export { mixin, AppDeviceEnquire, mixinDevice, mixinSelectMap, mixinMqtt }
