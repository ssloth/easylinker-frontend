import moment from 'moment'
export const columnHTTP = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '设备编号',
    dataIndex: 'id'
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    sorter: true,
    needTotal: true
  },
  {
    title: '设备描述',
    dataIndex: 'info',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
