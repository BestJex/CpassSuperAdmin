import { API_PATH } from '@/config/env'
import { formatTimeString, downloadFile } from '@/config/utils'
import { fieldOrderList } from '@/service/order'
export default {
  data () {
    return {
      statusList: [
        { val: 5, text: '待支付' },
        { val: 10, text: '待使用' },
        { val: 20, text: '已使用' },
        { val: 30, text: '已取消' },
        { val: 40, text: '待退款' },
        { val: 50, text: '已退款' }
      ],
      formData: {
        name: '',
        bookDate: '',
        orderDate: '',
        status: ''
      }
    }
  },
  props: {},
  components: {},
  mounted() {
    this.getPageData()
  },
  watch: {},
  computed: {},
  methods: {
    formatPrice(row, column) {
      return '￥ ' + row.orderAmount
    },
    formatTime(row, column) {
      return row.created
      // return row.email.replace(/:\d{2}$/, '')
    },
    getPageData() {
      const paramsObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        orderNum: this.formData.name,
        bookStartDate: this.formData.bookDate ? formatTimeString(this.formData.bookDate[0]) : null,
        bookEndDate: this.formData.bookDate ? formatTimeString(this.formData.bookDate[1]) : null,
        orderStartDate: this.formData.orderDate ? formatTimeString(this.formData.orderDate[0]) : null,
        orderEndDate: this.formData.orderDate ? formatTimeString(this.formData.orderDate[1]) : null,
        orderStatus: this.formData.status
      }
      fieldOrderList(paramsObj).then(res => {
        if (res.status === 'true') {
          console.log('res', res)
          let data = res.info
          if (data) {
            this.pageTotal = data.total
            this.tableData = data.result
            // 支付状态payStatus, 10=未支付, 20=已支付, 30=已经退款
            this.tableData.forEach(v => {
              v.formatPrice = '￥ ' + v.orderAmount
              if (v.type === 1) {
                v.bookingPeriod = v.bookStartTime + '～' + v.bookEndTime
              } else {
                v.bookingPeriod = '-'
                v.bookDate = v.bookStartDate +  '～' + v.bookEndDate
              }
            })
          }

          this.tableLoading = false
          if (this.tableData.length === 0) {
            this.tableEmpty = '暂时无数据'
          }
        } else {
          this.setMsg('error', res.msg)
        }
      })
    },
    exportExcel() {
      if (!this.tableData.length) {
        return this.setMsg('暂无数据')
      }
      const formData = this.formData
      const downParams = {
        orderNum: formData.name,
        bookStartDate: formData.bookDate ? formatTimeString(formData.bookDate[0]) : null,
        bookEndDate: formData.bookDate ? formatTimeString(formData.bookDate[1]) : null,
        orderStartDate: formData.orderDate ? formatTimeString(formData.orderDate[0]) : null,
        orderEndDate: formData.orderDate ? formatTimeString(formData.orderDate[1]) : null,
        orderStatus: formData.status
      }
      let url = API_PATH + '/supervisor/platformOrder/export'
      downloadFile(url, downParams)
    }
  }
}
