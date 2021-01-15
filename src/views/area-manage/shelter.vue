<template>
  <div class="app-container list">
    <div class="toolbar">
      <el-cascader
        v-model="selectedOptions"
        style="width: 270px;"
        placeholder="所在地"
        size="medium"
        :options="options"
        @change="handleChange"
      />
      <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="名称" clearable @clear="handleQuery" />
      <el-input v-model.trim="query.address" class="query-item" style="width: 120px" placeholder="详细地址" clearable @clear="handleQuery" />
      <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <el-button class="tool tool-export" :loading="loading.export" type="primary" icon="vue-icon-excel" @click="handleExport">导出</el-button>
      <!--      <el-button class="tool tool-create" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>-->
      <!--      <el-button class="tool tool-create" type="danger" icon="el-icon-delete" @click="handleDeletes">批量删除</el-button>-->
    </div>

    <el-table ref="listTable" v-loading="loading.list" v-adaptive="{ bottomOffset: 55 }" height="585px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="50" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省份" prop="province" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="市" prop="city" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="区/县" prop="area" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="名称" prop="name" :sort-orders="sortOrders" align="center" width="280" show-overflow-tooltip />
      <el-table-column label="详细地址" prop="address" :sort-orders="sortOrders" align="center" width="420" show-overflow-tooltip />
      <el-table-column label="电话" prop="telephone" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" :sort-orders="sortOrders" align="left" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="80">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>
          </el-tooltip>
          <!--          <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <!--          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>-->
          <!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination :hidden="page.total==0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />

    <el-dialog v-loading="loading.detail" custom-class="dialog-fullscreen dialog-detail" :title="detail.dialog.title" :visible.sync="detail.dialog.visible" :modal="false" :modal-append-to-body="false">
      <el-form ref="formDetail" label-position="right" :label-width="detail.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="省份">
              {{ detail.models.province }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="市">
              {{ detail.models.city }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="区/县">
              {{ detail.models.area }}
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
            <el-form-item label="详细地址">
              {{ detail.models.address }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="具体位置">
              <baidu-map class="mapSmall" :center="center" :zoom="zoom" :scroll-wheel-zoom="false" @ready="handlerDetail">
                <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :is-open="true" />
                <bml-marker-cluster :average-center="true">
                  <bm-marker v-for="marker of markers" :key="marker.lng" :position="{lng: marker.lng, lat: marker.lat}" />
                </bml-marker-cluster>
              </baidu-map>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="电话">
              {{ detail.models.telephone }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="备注">
              {{ detail.models.remark }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog custom-class="dialog-fullscreen dialog-create" :title="create.dialog.title" :visible.sync="create.dialog.visible" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false">
      <el-form ref="formCreate" :rules="create.rules" :model="create.models" label-position="right" :label-width="create.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="省份" prop="name">
              <el-input v-model="create.models.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sl="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="create.models.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="create.dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="createData()">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog v-loading="loading.update" custom-class="dialog-fullscreen dialog-update" :title="update.dialog.title" :visible.sync="update.dialog.visible" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false">
      <el-form ref="formUpdate" :rules="update.rules" :model="update.models" label-position="right" :label-width="update.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="省份" prop="province">
              <el-input v-model="update.models.province" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="市" prop="city">
              <el-input v-model="update.models.city" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="区/县" prop="area">
              <el-input v-model="update.models.area" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="具体位置" prop="name">
              <el-input v-model="update.models.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="update.models.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="电话" prop="telephone">
              <el-input v-model="update.models.telephone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sl="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="update.models.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="update.dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="updateData()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import adaptive from '@/directive/el-table'
import setRule from '@/utils/form-validate'
import Pagination from '@/components/Pagination'
import * as role from '@/api/system-manage/role'
import * as place from '@/api/area-manage/place'
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  name: 'Shelter',
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      access: this.$store.getters.access['AreaManage']['Shelter'],
      datas: null,
      center: { lng: 0, lat: 0 },
      zoom: 13,
      markers: [{ lng: 117.207875, lat: 39.092447, showFlag: false }],
      detialmap: null,
      // 三级地址联动数据项（不带全部）
      options: regionData,
      selectedOptions: [],
      x: 0,
      query: { type: 2, name: null, address: null, province: null, city: null, area: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '详细信息', visible: false, labelWidth: '120px' },
        models: { name: null, province: null, city: null, area: null, address: null, lng: 0, lat: 0, telephone: null, remark: null }
      },
      create: {
        dialog: { title: '添加信息', visible: false, labelWidth: '120px' },
        models: { name: null, province: null, city: null, area: null, address: null, lng: 0, lat: 0, telephone: null, remark: null },
        rules: {
          name: setRule('名称', [{ required: true }, { length: [0, 50] }]),
          province: setRule('所在地', [{ selected: true }]),
          address: setRule('详细地址', [{ required: true }]),
          lng: setRule('具体位置', [{ selected: true }]),
          telephone: setRule('所在地', [{ required: true }]),
          remark: setRule('备注', [{ length: [0, 255] }])
        }
      },
      update: {
        dialog: { title: '编辑角色信息', visible: false, labelWidth: '120px' },
        models: { name: null, province: null, city: null, area: null, address: null, lng: 0, lat: 0, telephone: null, remark: null },
        rules: {
          name: setRule('名称', [{ required: true }, { length: [0, 50] }]),
          province: setRule('所在地', [{ selected: true }]),
          address: setRule('详细地址', [{ required: true }]),
          lng: setRule('具体位置', [{ selected: true }]),
          telephone: setRule('所在地', [{ required: true }]),
          remark: setRule('备注', [{ length: [0, 255] }])
        }
      },
      loading: { list: true, export: false, detail: false, update: false },
      sortOrders: ['ascending', 'descending']
    }
  },
  created() {
    this.getDatas()
  },
  methods: {
    getDatas() {
      this.loading.list = true
      place.getList(this.query, this.page, this.sort).then(response => {
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
      // var j = police.getList(this.query, this.page, this.sort)
      // this.datas = j.data.items
      // this.page.total = j.data.total
      // this.loading.list = false
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
      this.detail.models = Object.assign({}, row)
      const temp = { lng: 0, lat: 0, showFlag: false }
      temp.lat = this.detail.models.lat
      temp.lng = this.detail.models.lng
      this.center.lat = this.detail.models.lat
      this.center.lng = this.detail.models.lng
      this.markers.splice(0, 1, temp)
      this.loading.detail = true
      this.detail.dialog.visible = true
      this.loading.detail = false
    },
    handleCreate() {
      this.create.dialog.visible = true
    },
    createData() {
      this.$refs['formCreate'].validate((valid) => {
        if (!valid) return false
        role.create(this.create.models).then(response => {
          // 为方便连续添加，create对话框不关闭
          // 需要清空的表单，手动清空，至少清空一个必填项，防止点击两遍
          this.create.models.name = ''
          // 因为添加修改共用了accessTo，进行清空操作
          this.accessTo = []
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    },
    handleUpdate(row) {
      // 若列表数据展示了全部属性，则可直接拷贝列表数据用于编辑
      this.update.models = Object.assign({}, row)
      this.update.dialog.visible = true
      this.loading.update = true
      this.loading.update = false

      this.$nextTick(() => {
        this.$refs['formUpdate'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formUpdate'].validate((valid) => {
        if (!valid) return false
        // this.update.models.access = this.treeToArray(this.accessTo)
        const tempData = Object.assign({}, this.update.models)
        role.update(tempData).then(response => {
          // 重新获取数据
          this.getDatas()
          this.update.dialog.visible = false
          this.accessTo = []
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
        role.del(ids).then(response => {
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    },
    handleChange(value) {
      // console.log(value)
      this.query.province = CodeToText[value[0]]
      this.query.city = CodeToText[value[1]]
      this.query.area = CodeToText[value[2]]
    },
    handlerDetail({ BMap, map }) {
      this.center.lng = this.detail.models.lng
      this.center.lat = this.detail.models.lat
      this.zoom = 19
      this.detialmap = map
      // var point = new BMap.Point(this.center.lng, this.center.lng)
      // map.centerAndZoom(point, 13)
      // var marker = new BMap.Marker(point) // 创建标注
      // map.addOverlay(marker) // 将标注添加到地图中
      // var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
      // map.addOverlay(circle)
    },
    handleExport() {
      this.loading.export = true
      place.exportExcel(this.query, this.page, this.sort).then(response => {
        const blob = new Blob([response])
        const fileName = '养老院信息.xls'
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

<style>
.mapSmall {
  width: 600px;
  height: 300px;
//margin-left: 50px;
  margin-top: 6px;
  margin-bottom: 6px;
  border: 2px dashed #ccc;
}
/* 去除百度地图版权那行字 和 百度logo */
.BMap_cpyCtrl {
  display: none !important;
}
.anchorBL {
  display: none !important;
}
</style>

