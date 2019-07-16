import moment from 'moment'
export const columnsHTTP = [
  {
    title: '设备编号',
    dataIndex: 'securityId',
    width: '100px',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    width: '150px'
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    width: '100px'
  },
  {
    title: '设备描述',
    dataIndex: 'info'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    width: '200px',
    sorter: true
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    width: '200px',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    // width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
