
<template>
  <page-view
    title="设备编号：234231029431"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="设备名">{{ detail.name }}</detail-list-item>
      <detail-list-item term="所属场景">XX服务</detail-list-item>
      <detail-list-item term="创建时间">2018-08-07</detail-list-item>
      <detail-list-item term="设备类型">
        <a>12421</a>
      </detail-list-item>
      <detail-list-item term="更新时间">2018-12-11</detail-list-item>
      <detail-list-item term="备注">小区开关</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">设备状态</div>
        <div class="heading">开启</div>
      </a-col>
      <a-col :xs="12" :sm="12">
        <div class="text">开关状态</div>
        <div class="heading">开启</div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button type="primary">打开开关</a-button>
    </template>

    <!-- 操作 -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <s-table
        ref="operationTable"
        v-show="activeTabKey === '1'"
        :columns="deviceOperationColumns"
        :data="deviceOperateLogDataSource"
        showPagination="auto"
      >
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </s-table>
      <s-table
        ref="operationEchoTable"
        v-show="activeTabKey === '2'"
        :columns="deviceUploadColumns"
        :data="deviceOperateEchoDataSource"
        showPagination="auto"
      >
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </s-table>
    </a-card>
  </page-view>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { mixinDevice, mixinMqtt } from '@/utils/mixin'
import { PageView } from '@/layouts'
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item

export default {
  name: 'Advanced',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    STable
  },
  mixins: [mixinDevice, mixinMqtt],
  mounted() {
    if (Object.keys(this.detail).length === 0) return this.$router.push('/device/list')
  },
  watch: {
    $router() {
      this.tab
    }
  },
  data() {
    return {
      queryParam: {},
      tabList: [
        {
          key: '1',
          tab: '操作日志'
        },
        {
          key: '2',
          tab: '设备上报日志'
        }
      ],
      activeTabKey: '1',
      deviceOperateLogDataSource: parameter =>
        this.QueryDeviceOperateLogList(Object.assign(parameter, this.queryParam)),
      deviceOperateEchoDataSource: parameter =>
        this.QueryDeviceOperateEchoList(Object.assign(parameter, this.queryParam))
    }
  },
  computed: {
    ...mapGetters(['deviceOperationLogColumns', 'deviceUploadLogColumns']),
    ...mapState({
      detail: state => state.device.detail,
      deviceOperationColumns: state => state.device.operationColumns,
      deviceUploadColumns: state => state.device.uploadColumns
    })
  },
  methods: {
    ...mapActions(['QueryDeviceOperateLogList', 'QueryDeviceOperateEchoList']),
    refsTable() {
      const { deviceSecurityId } = this.detail.deviceProtocol
      this.queryParam.deviceSecurityId = deviceSecurityId
      this.$refs.operationEchoTable.refresh()
      this.$refs.operationTable.refresh()
    },
    resetTable() {
      const { deviceSecurityId } = this.detail.deviceProtocol
      this.queryParam = { deviceSecurityId }
      this.$refs.operationEchoTable.refresh()
      this.$refs.operationTable.refresh()
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        agree: '成功',
        reject: '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter(type) {
      const statusTypeMap = {
        agree: 'success',
        reject: 'error'
      }
      return statusTypeMap[type]
    }
  }
}
</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
  .text {
  }
  .status-list {
    text-align: left;
  }
}
</style>
