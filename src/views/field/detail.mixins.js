export default {
  data () {
    return {
      fieldId: this.$route.query.id + '',
      fieldType: '',
      titleName: '',
      openStatus: false,
      mainImg: '', // @#注意：主图不重复展示在列表中

      space: {},
      stationNum: '',
      field: {},
      appointmentTimeType: 2, // 是否区分工作日 1:不区分 2:区分
      store: {},
      equipments: {},
      fieldImgs: {},

      typeList: [
        { key: '0', label: '全部' },
        { key: '1', label: '会议室' },
        // { key: '2', label: '路演厅' },
        { key: '3', label: '工位' },
        { key: '5', label: '办公室' },
        { key: '4', label: '其他' }
      ],

      openData: [],

      // 会议室和其他、工位
      // 整周
      openWeek: [{
        type: 1,
        status: 1,
        workState: 1,
        restState: 1,
        startTime: '',
        endTime: '',
        price: '' // 收费标准
      }],
      // 基本价格，工作日、非工作日
      openPeriod: [{
        type: 1,
        status: 1,
        startTime: '',
        endTime: '',
        price: '', // 收费标准
        workState: 1,
        restState: 1
      }, {
        type: 2,
        status: 1,
        startTime: '',
        endTime: '',
        price: '', // 收费标准
        workState: 1,
        restState: 1
      }],
      openOffice: [], // 办公室

      // 对外价格，价格总览
      openPrice: [],
      openPriceUnit: {
        type: '',   // 1工作日 2非工作日 or整周
        itmeType: '', // 0 免费时段 1普通时段 2特殊时段
        startTime: '',
        endTime: '',
        longTime: '',
        price: '',
        appointmentTimeType: '' // 是否区分工作日 1:不区分 2:区分
      }
    }
  }
}
