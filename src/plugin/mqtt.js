import mqtt from 'mqtt'
import config from '@/config/mqtt.config'

const { brokerUrl } = config

// const client = {}

const client = mqtt.connect(brokerUrl, config)

client.on('connect', function () {
  console.log('success connect!')
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

const vueMqtt = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install (Vue, instance) {
    if (this.installed) {
      return
    }
    this.installed = true

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install axios')
      return
    }

    Vue.mqtt = instance

    Object.defineProperties(Vue.prototype, {
      mqtt: {
        get: function get () {
          return instance
        }
      },
      $mqtt: {
        get: function get () {
          return instance
        }
      }
    })
  }
}

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(vueMqtt, client)
  }
}

export default installer
