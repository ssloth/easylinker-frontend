<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-row :gutter="24">
          <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="MQTT设备" :total="analyzeData.deviceCount.MQTT.total">
              <a-tooltip title="MQTT设备情况" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <span flag="up" style="margin-right: 16px;">
                  <span slot="term">在线</span>
                  {{ analyzeData.deviceCount.MQTT.online }}
                </span>
                <span flag="down">
                  <span slot="term">离线</span>
                  {{ analyzeData.deviceCount.MQTT.total - analyzeData.deviceCount.MQTT.online }}
                </span>
              </div>
            </chart-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="TCP设备" :total="analyzeData.deviceCount.TCP">
              <a-tooltip title="TCP设备情况" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <span flag="up" style="margin-right: 16px;">
                  <span slot="term">在线</span>
                  {{ analyzeData.deviceCount.TCP }}
                </span>
                <span flag="down">
                  <span slot="term">离线</span>
                  0
                </span>
              </div>
            </chart-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="CoAP设备" :total="analyzeData.deviceCount.CoAP">
              <a-tooltip title="CoAP设备情况" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <span flag="up" style="margin-right: 16px;">
                  <span slot="term">总数</span>
                  {{ analyzeData.deviceCount.CoAP }}
                </span>
              </div>
            </chart-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="HTTP设备" :total="analyzeData.deviceCount.HTTP">
              <a-tooltip title="HTTP设备情况" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <span flag="up" style="margin-right: 16px;">
                  <span slot="term">总数</span>
                  {{ analyzeData.deviceCount.HTTP }}
                </span>
              </div>
            </chart-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="UDP设备" :total="analyzeData.deviceCount.UDP">
              <a-tooltip title="UDP设备情况" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <span flag="up" style="margin-right: 16px;">
                  <span slot="term">总数</span>
                  {{ analyzeData.deviceCount.HTTP }}
                </span>
              </div>
            </chart-card>
          </a-col>
          <a-col :sm="24" :xl="9" :style="{ marginBottom: '12px' }">
            <a-card>
              <log-list title="重要日志" :list="this.rankList" />
            </a-card>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="设备类别占比" :style="{ marginBottom: '12px', minHeight: '500px' }">
          <div slot="extra" style="height: inherit;">
            <div class="analysis-salesTypeRadio">
              <a-radio-group defaultValue="a">
                <a-radio-button value="a">全部设备</a-radio-button>
              </a-radio-group>
            </div>

          </div>
          <h4>设备份额</h4>
          <div>
            <!-- style="width: calc(100% - 240px);" -->
            <div>
              <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                <v-tooltip :showTitle="false" dataKey="item*percent" />
                <v-axis />
                <!-- position="right" :offsetX="-140" -->
                <v-legend dataKey="item"/>
                <v-pie position="percent" color="item" :vStyle="pieStyle" />
                <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
              </v-chart>
            </div>

          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea
} from '@/components'
import LogList from './components/LogList'
import { mixinDevice } from '@/utils/mixin'
import { mapState } from 'vuex'
import { queryAnalyzeData, querySyslogListByUser } from '@/api/analysis'
import { PageView } from '@/layouts'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []

const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment()
      .add(i, 'days')
      .format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }
]

const searchTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: '搜索关键词'
  },
  {
    dataIndex: 'count',
    title: '用户数'
  },
  {
    dataIndex: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: 'range' }
  }
]
const searchData = []
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'MQTT', count: 1 },
  { item: 'TCP', count: 2 },
  { item: 'CoAP', count: 3 },
  { item: 'HTTP', count: 4 },
  { item: 'UDP', count: 5 }
]

const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    LogList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    PageView
  },
  data () {
    return {
      loading: true,
      rankList,
      // 查询参数
      queryParam: {
        page: 0,
        size: 10
      },
      // 日志信息
      analyzeLogMap: { },
      // 分析状态数据
      analyzeData: {
        deviceCount: {
          MQTT: {
            total: 0,
            online: 0
          },
          TCP: 0,
          UDP: 0,
          HTTP: 0,
          CoAP: 0,
          scene: 0
        },
        typeCount: {
          TEXT: 0,
          SWITCH: 0,
          VALUE: 0,
          FILE: 0,
          BOOLEAN: 0
        }
      },
      // 搜索用户数
      searchUserData,
      searchUserScale,
      searchTableColumns,
      searchData,

      barData,
      barData2,

      //
      pieScale,
      pieData,
      sourceData,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  created () {
    queryAnalyzeData().then(res => {
      this.analyzeData = res.data
      // 目前存在更改pieData数据时不改变的问题。。。
      sourceData[0].count = this.analyzeData.deviceCount.MQTT.total
      sourceData[1].count = this.analyzeData.deviceCount.TCP
      sourceData[2].count = this.analyzeData.deviceCount.CoAP
      sourceData[3].count = this.analyzeData.deviceCount.HTTP
      sourceData[4].count = this.analyzeData.deviceCount.UDP
      // this.$set(this.sourceData[0], "count",this.analyzeData.deviceCount.MQTT.total)
      console.log(this.analyzeData.deviceCount.MQTT.total)
      this.loading = !this.loading
    })
    querySyslogListByUser(Object.assign(this.queryParam)).then(res => {
      this.analyzeLogMap = res.data.content
      for (let i = 0; i < 6; i++) {
        rankList.push({
          name: this.analyzeLogMap[i].info,
          total: this.dateFormat(this.analyzeLogMap[i].createTime)
        })
      }
    })
  },
  methods: {
    dateFormat: function (timeStamp) {
      var date = new Date(timeStamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;

  &.desktop div[class^='ant-col']:last-child {
    position: absolute;
    right: 0;
    height: 100%;
  }
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>
