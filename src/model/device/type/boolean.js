import moment from 'moment'

export default [
  {
    title: '编号',
    dataIndex: 'id',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作内容',
    dataIndex: 'id',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作反馈',
    dataIndex: 'id',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '备注',
    dataIndex: 'id',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    width: 225,
    sorter: true
  }
]
