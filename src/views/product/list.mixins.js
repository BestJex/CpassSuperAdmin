import tableMixins from '@/mixins/table'
import { productList, productClose, productOpen } from '@/service/product'

export default {
  mixins: [tableMixins],
  data () {
    return {
      id: '',
      formData: {
        name: ''
      }
    }
  },
  mounted () {
    this.getPageData()
  },
  methods: {
    getPageData(page) {
      this.currentPage = page || this.currentPage
      const paramsObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        name: this.formData.name
      }

      productList(paramsObj).then(res => {
        if (res.status === 'true') {
          let data = res.info
          if (data) {
            this.pageTotal = data.total
            this.tableData = data.result
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

    // 更改禁用、恢复状态
    changeStatus(id, status) {
      if (status === 1) {
        // 恢复
        this.restore(id)
      } else {
        // 禁用
        this.disable(id)
      }
    },

    // 恢复状态
    restore(id) {
      let target = this.tableData.find(item => item.id === id)
      this.$confirm('此操作将恢复该版本, 是否继续?', '', {
        confirmButtonText: '确认恢复',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productOpen({ id: id, status: 1 }).then(res => {
          if (res.status === 'true') {
            // 提示操作成功
            this.$message({ type: 'success', message: '恢复成功!' })
          } else {
            // 提示恢复失败
            this.$message({ type: 'error', message: '恢复失败!' })
            target.status = 0
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        })
        target.status = 0
      })
    },

    // 禁用状态
    disable(id) {
      let target = this.tableData.find(item => item.id === id)
      this.$confirm('此操作将禁用该版本, 是否继续?', '', {
        confirmButtonText: '确认禁用',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productClose({ id: id, status: 0 }).then(res => {
          if (res.status === 'true') {
            // 提示操作成功
            this.$message({ type: 'success', message: '禁用成功!' })
            // 修改状态、刷新页面数据
          } else {
            // 提示操作成功
            this.$message({ type: 'error', message: '禁用失败!' })
            target.status = 1
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消禁用' })
        target.status = 1
      })
    }
  }
}
