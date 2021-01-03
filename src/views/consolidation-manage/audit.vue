<template>
  <div class="app-container list">
    <div class="toolbar">
      <el-input v-model.trim="query.consolidationCertificateCode" class="query-item" style="width: 200px" placeholder="请输入盘整凭证编号" clearable @clear="handleQuery" />
      <el-input v-model.trim="query.consolidationDate" class="query-item" style="width: 120px" placeholder="盘整日期" clearable @clear="handleQuery" />
      <el-input v-model.trim="query.users.id" class="query-item" style="width: 120px" placeholder="盘整人员" clearable @clear="handleQuery" />
      <el-select v-model="query.storeId" class="query-item" style="width: 120px" placeholder="仓库名称" clearable @clear="handleQuery">
        <el-option v-for="item in stores" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="query.areaId" class="query-item" style="width: 120px" placeholder="区域名称" clearable @clear="handleQuery">
        <el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="query.containerId" class="query-item" style="width: 120px" placeholder="货柜名称" clearable @clear="handleQuery">
        <el-option v-for="item in containers" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <!--      <el-button class="tool tool-create" type="primary" icon="vue-icon-create" @click="handleCreate">添加</el-button>-->
      <!--      <el-button class="tool tool-delete" type="danger" icon="vue-icon-delete" @click="handleDeletes">批量删除</el-button>-->
      <el-button class="tool tool-export" :loading="loading.export" type="primary" icon="vue-icon-excel" @click="handleExport">导出</el-button>
    </div>

    <el-table ref="listTable" v-loading="loading.list" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货物ID" prop="good.id" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="货物编号" prop="good.code" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="货物名称" prop="good.name" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="货物颜色" prop="goodsColor.name" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="货物规格" prop="good.specification" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="货物面料" prop="good.fabrics" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="单位名称" prop="cellType.name" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="存储方式" prop="goodsStorageMode.name" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="货物加权平均价" prop="A" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="货物总价" prop="B" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="盈亏金额" prop="C" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="盘前数量" prop="a" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="盘后数量" prop="b" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="差额" prop="c" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="单位数量" prop="d" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="审批状态" :sort-orders="sortOrders" align="center">
        <template slot-scope="{row}">
          <span>{{ row.enable===1 ? '未审批' : '已审批' }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="排序上移" placement="top-end">
            <el-button type="primary" plain class="button-operate button-rankup" size="mini" @click="handleRankup(row)"><i class="vue-icon-rankup" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>
          </el-tooltip>
          <!--          <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <!--          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">-->
          <!--            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>-->
          <!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination :hidden="page.total==0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />

    <el-dialog v-loading="loading.detail" custom-class="dialog-detail" :title="detail.dialog.title" :visible.sync="detail.dialog.visible" :modal="false" :modal-append-to-body="false">
      <el-form ref="formDetail" label-position="right" :label-width="detail.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="编号">
              {{ detail.models.code }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="名称">
              {{ detail.models.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="地址">
              {{ detail.models.address }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="是否启用">
              {{ detail.models.enable === 1 ? '启用' : '未启用' }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as utils from '@/utils'
import adaptive from '@/directive/el-table'
// import setRule from '@/utils/form-validate'
import Pagination from '@/components/Pagination'
import * as api from '@/api/consolidation-manage/audit'
import * as apiStores from '@/api/store-manage/store'
import * as apiAreas from '@/api/store-manage/area'
import * as apiContainers from '@/api/store-manage/container'

export default {
  name: 'Audit',
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      datas: null,
      areas: null,
      stores: null,
      containers: null,
      query: { consolidationCertificateCode: null, consolidationDate: null, users: { id: null }, storeId: null, areaId: null, containerId: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '盘整信息', visible: false, labelWidth: '90px' },
        models: { good: { id: null, code: null, name: null, specification: null, fabrics: null }, goodsColors: { name: null },
          cellType: { name: null }, goodsStorageMode: { name: null }, a: null, b: null, c: null, d: null, A: null, B: null, C: null }
      },
      loading: { list: true, export: false, detail: false, update: false },
      sortOrders: ['ascending', 'descending']
    }
  },
  created() {
    this.getDatas()
    this.getStoreId()
    this.getAreaId()
    this.getContainerId()
  },
  methods: {
    getDatas() {
      this.loading.list = true
      api.getList(this.query, this.page, this.sort).then(response => {
        console.log('页面返回值2', response)
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
    },
    getStoreId() {
      apiStores.getlist().then(response => {
        this.stores = response.data
      }).catch(reject => {
      })
    },
    getAreaId() {
      apiAreas.getlist().then(response => {
        this.areas = response.data
      }).catch(reject => {
      })
    },
    getContainerId() {
      apiContainers.getlist().then(response => {
        this.containers = response.data
      }).catch(reject => {
      })
    },
    handleQuery() {
      this.page.current = 1
      this.getDatas()
    },
    handleSort(data) {
      this.sort.prop = data.prop
      this.sort.order = data.order
      this.getDatas()
    },
    handleDetail(row) {
      // 若列表数据展示了全部属性，则可直接拷贝列表数据
      // this.detail.models = Object.assign({}, row)
      this.detail.dialog.visible = true
      this.loading.detail = true
      api.get(row.id).then(response => {
        this.detail.models = response.data
        this.loading.detail = false
      }).catch(reject => {
        this.loading.detail = false
      })
    },
    handleCreate() {
      this.create.dialog.visible = true
    },
    createData() {
      this.$refs['formCreate'].validate((valid) => {
        if (!valid) return false
        api.create(this.create.models).then(response => {
          // 为方便连续添加，create对话框不关闭
          // 需要清空的表单，手动清空，至少清空一个必填项，防止点击两遍
          this.create.models.name = ''
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    },
    handleRankup(row) {
      this.loading.list = true
      api.rankup(row.id).then(response => {
        this.getDatas()
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
    },
    handleUpdate(row) {
      // 若列表数据展示了全部属性，则可直接拷贝列表数据用于编辑
      // this.update.models = Object.assign({}, row)
      this.update.dialog.visible = true
      this.loading.update = true
      api.get(row.id).then(response => {
        this.update.models = response.data
        this.loading.update = false
      }).catch(reject => {
        this.loading.update = false
      })
      this.$nextTick(() => {
        this.$refs['formUpdate'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formUpdate'].validate((valid) => {
        if (!valid) return false
        const tempData = Object.assign({}, this.update.models)
        api.update(tempData).then(response => {
          // 重新获取数据
          this.getDatas()
          this.update.dialog.visible = false
        }).catch(reject => {
        })
      })
    },
    handleDelete(row) {
      this.deleteData([row.id])
    },
    handleDeletes(row) {
      if (this.$refs.listTable.selection.length === 0) {
        this.$message({ type: 'warning', message: '请在下面表格的左侧勾选需要删除的数据', duration: 4000 })
        return false
      }
      const ids = []
      for (const item of this.$refs.listTable.selection) {
        ids.push(item.id)
      }
      this.deleteData(ids)
    },
    deleteData(ids) {
      this.$confirm('数据删除后，不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.del(ids).then(response => {
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    },
    handleExport() {
      this.loading.export = true
                import('@/vendor/Export2Excel').then(excel => {
                  const tHeader = ['类型名称']
                  const filterKeys = ['name']
                  const data = utils.formatJson(filterKeys, this.datas)
                  excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: '仓库类型'
                  })
                  this.loading.export = false
                })
    }
  }
}
</script>

<style scoped>

</style>
