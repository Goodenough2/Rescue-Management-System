<template>
  <div class="app-container list">
    <div class="toolbar">
      <el-select v-model="query.operateTypeId" class="query-item" style="width: 150px" placeholder="操作意图" clearable @clear="handleQuery">
        <el-option v-for="item in storeOperateTypes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="query.ioType" class="query-item" style="width: 120px" placeholder="是否启用" clearable @clear="handleQuery">
        <el-option label="出" value="0" />
        <el-option label="入" value="1" />
      </el-select>
      <el-select v-model="query.goodsCategoryId" class="query-item" style="width: 150px" placeholder="货物种类" clearable @clear="handleQuery">
        <el-option v-for="item in goodsCategories" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="query.operatorId" class="query-item" style="width: 150px" placeholder="操作人员" clearable @clear="handleQuery">
        <el-option v-for="item in operators" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="query.locationType" class="query-item" style="width: 150px" placeholder="存储位置类型" clearable @clear="handleQuery">
        <el-option label="运输设备" value="2" />
        <el-option label="单元格" value="3" />
        <el-option label="容器" value="4" />
      </el-select>
      <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <el-button class="tool tool-export" :loading="loading.export" type="primary" icon="vue-icon-excel" @click="handleExport">导出</el-button>
    </div>

    <audio id="audio" src="/static/audio/130808.wav" />

    <el-table ref="listTable" v-loading="loading.list" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" prop="operateTime" sortable="custom" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="操作意图" prop="storeOperateType.name" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="操作单编号" prop="documentCode" sortable="custom" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="货物种类" prop="goodsCategory.name" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="货物条形码" prop="goodsBarCode" sortable="custom" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="货物RFID码" prop="goodsRfidCode" sortable="custom" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="存储位置" prop="locationType" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.locationType===3 ? '单元格' :row.locationType===4 ? '容器':'运输设备' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存储位置条形码" prop="locationBarCode" sortable="custom" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="存储位置RFID码" prop="locationRfidCode" sortable="custom" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="数量" prop="quality" :sort-orders="sortOrders" align="center" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="60">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination :hidden="page.total==0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />

    <el-dialog v-loading="loading.detail" custom-class="dialog-fullscreen dialog-detail" :title="detail.dialog.title" :visible.sync="detail.dialog.visible" :modal="false" :modal-append-to-body="false">
      <el-form ref="formDetail" label-position="right" :label-width="detail.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="操作意图">
              {{ detail.models.storeOperateType.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="操作单编号">
              {{ detail.models.documentCode }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="货物种类">
              {{ detail.models.goodsCategory.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="货物条形码">
              {{ detail.models.goodsBarCode }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="货物RFID码">
              {{ detail.models.goodsRfidCode }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="存储位置类型">
              {{ detail.models.locationType===0 ? '单元格' :(detail.models.locationType===1 ? '容器':'设备') }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="存储位置RFID码">
              {{ detail.models.locationRfidCode }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="存储位置条形码">
              {{ detail.models.locationBarCode }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="数量">
              {{ detail.models.quality }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="操作时间">
              {{ detail.models.operateTime }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="操作人员">
              {{ detail.models.operator.userName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="送货人信息">
              {{ detail.models.deliveryman }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="描述">
              {{ detail.models.description }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import adaptive from '@/directive/el-table'
import Pagination from '@/components/Pagination'
import * as User from '@/api/system-manage/user'
// import * as goodsCategory from '@/api/goods-manage/goods-category'
import * as storeRecord from '@/api/log-manage/store-record'
import * as storeOperateType from '@/api/log-manage/store-operate-type'

export default {
  name: 'StoreRecord',
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      access: true,
      datas: null,
      operators: null,
      goodsCategories: null,
      storeOperateTypes: null,
      query: { operateTypeId: null, ioType: null, goodsCategoryId: null, locationType: null, operatorId: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '仓储记录信息', visible: false, labelWidth: '120px' },
        models: { documentCode: null, storeOperateType: { name: null }, ioType: null, goodsCategory: { name: null }, goodsBarCode: null, goodsRfidCode: null, locationType: null, locationBarCode: null, locationRfidCode: null, quality: null, operator: { userName: null }, operateTime: null, deliveryman: null, description: null }
      },
      loading: { list: true, export: false, detail: false, update: false },
      sortOrders: ['ascending', 'descending']
    }
  },
  created() {
    this.getDatas()
    this.getOperators()
    // this.getGoodsCategories()
    this.getStoreOperateTypes()
  },
  methods: {
    getDatas() {
      this.loading.list = true
      storeRecord.getList(this.query, this.page, this.sort).then(response => {
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
    },
    getOperators() {
      User.getlist().then(response => {
        this.operators = response.data
      }).catch(reject => {
      })
    },
    getStoreOperateTypes() {
      storeOperateType.getlist().then(response => {
        this.storeOperateTypes = response.data
      }).catch(reject => {
      })
    },
    // getGoodsCategories() {
    //   goodsCategory.getlist().then(response => {
    //     this.goodsCategories = response.data
    //   }).catch(reject => {
    //   })
    // },
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
      storeRecord.get(row.id).then(response => {
        this.detail.models = response.data
        this.loading.detail = false
      }).catch(reject => {
        this.loading.detail = false
      })
    },
    handleExport() {
      this.loading.export = true
      storeRecord.exportExcel(this.query, this.page, this.sort).then(response => {
        const blob = new Blob([response])
        const fileName = '仓储记录.xls'
        const elink = document.createElement('a')
        elink.onload = () => { URL.revokeObjectURL(elink.href) }
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
        this.loading.export = false
      }).catch(reject => {
        this.loading.export = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
