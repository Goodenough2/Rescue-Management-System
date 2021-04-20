<template>
  <div class="app-container list">
    <div class="toolbar">
      <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="家属姓名" clearable @clear="handleQuery" />
      <el-select v-model="query.gender" class="query-item" style="width:120px" placeholder="性别" clearable @clear="handleQuery">
        <el-option label="女" value="0" />
        <el-option label="男" value="1" />
      </el-select>
      <el-input v-model.trim="query.elderlyName" class="query-item" style="width: 120px" placeholder="老人姓名" clearable @clear="handleQuery" />
      <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <el-button v-if="access.create.allow" class="tool tool-create" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button v-if="access.delete.allow" class="tool tool-create" type="danger" icon="el-icon-delete" @click="handleDeletes">批量删除</el-button>
    </div>

    <el-table ref="listTable" v-loading="loading.list" v-adaptive="{ bottomOffset: 55 }" height="585px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="性别" prop="gender" :sort-orders="sortOrders" align="center" width="70" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span v-if="row.gender == 'FEMALE'">女</span>
          <span v-if="row.gender == 'MALE'">男</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" prop="phoneNumber" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="与老人关系" prop="relationship" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="所属老人" prop="elderlyName" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="老人身份证号" prop="elderlyIdCard" :sort-orders="sortOrders" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="家属备注" prop="remark" :sort-orders="sortOrders" align="left" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination :hidden="page.total==0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />

    <el-dialog v-loading="loading.detail" custom-class="dialog-fullscreen dialog-detail" :title="detail.dialog.title" :visible.sync="detail.dialog.visible" :modal="false" :modal-append-to-body="false">
      <el-form ref="formDetail" label-position="right" :label-width="detail.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="家属名称">
              {{ detail.models.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="家属性别">
              <span v-if="detail.models.gender == 0">女</span>
              <span v-if="detail.models.gender == 1">男</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="电话">
              {{ detail.models.phoneNumber }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="与老人关系">
              {{ detail.models.relationship }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="老人姓名">
              {{ detail.models.elderlyName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="老人身份证号">
              {{ detail.models.elderlyIdCard }}
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
            <el-form-item label="亲属姓名" prop="name">
              <el-input v-model="create.models.name" />   <!-- 在这里做了修改 -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="create.models.gender">
                <el-option label="女" value="0" />
                <el-option label="男" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="电话号码" prop="phoneNumber">
              <el-input v-model="create.models.phoneNumber" />   <!-- 在这里做了修改 -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="老人姓名" prop="elderlyId">
              <el-select v-model="create.models.elderlyId" clearable filterable>
                <el-option v-for="item in elderlies" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="与老人关系" prop="relationship">
              <el-input v-model="create.models.relationship" />
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
      <el-form ref="formEdit" :rules="update.rules" :model="update.models" label-position="right" :label-width="update.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="亲属姓名" prop="name">
              <el-input v-model="update.models.name" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="电话号码" prop="phoneNumber">
              <el-input v-model="update.models.phoneNumber" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="update.models.gender">
                <el-option label="女" value="FEMALE" />
                <el-option label="男" value="MALE" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="电话号码" prop="phoneNumber">
              <el-input v-model="update.models.phoneNumber" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="老人姓名" prop="elderlyId">
              <el-select v-model="update.models.elderlyId" clearable filterable>
                <el-option v-for="item in elderlies" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="与老人关系" prop="relationship">
              <el-input v-model="update.models.relationship" />
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
import * as relative from '@/api/elderly-manage/relative'
import * as elderly from '@/api/elderly-manage/elderly'

export default {
  name: 'Relative',
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      access: this.$store.getters.access['ElderlyManage']['Relative'],
      datas: null,
      elderlies: null,
      query: { name: null, gender: null, elderlyName: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '亲属信息', visible: false, labelWidth: '120px' },
        models: { name: null, gender: null, phoneNumber: null, relationship: null, elderlyId: null, elderlyName: null, remark: null, elderlyIdCard: null }
      },
      create: {
        dialog: { title: '添加亲属', visible: false, labelWidth: '120px' },
        models: { name: null, gender: null, phoneNumber: null, relationship: null, elderlyId: null, elderlyName: null, remark: null, elderlyIdCard: null },
        rules: {
          name: setRule('姓名', [{ required: true }]),
          gender: setRule('性别', [{ selected: true }]),
          phoneNumber: setRule('电话号码', [{ required: true }]),
          relationship: setRule('关系', [{ required: true }]),
          elderlyId: setRule('老人姓名', [{ selected: true }])
        }
      },
      update: {
        dialog: { title: '编辑亲属信息', visible: false, labelWidth: '120px' },
        models: { name: null, gender: null, phoneNumber: null, relationship: null, elderlyId: null, elderlyName: null, remark: null, elderlyIdCard: null },
        rules: {
          name: setRule('姓名', [{ required: true }]),
          gender: setRule('性别', [{ selected: true }]),
          phoneNumber: setRule('电话号码', [{ required: true }]),
          relationship: setRule('关系', [{ required: true }]),
          elderlyId: setRule('老人姓名', [{ selected: true }])
        }
      },
      loading: { list: true, export: false, detail: false, update: false },
      sortOrders: ['ascending', 'descending']
    }
  },
  created() {
    this.getDatas()
    this.getElderly()
  },
  methods: {
    getDatas() {
      this.loading.list = true
      relative.getList(this.query, this.page, this.sort).then(response => {
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
    },
    getElderly() {
      elderly.getlist().then(response => {
        this.elderlies = response.data
      }).catch(reject => {
      })
    },
    handleQuery() {
      this.page.current = 1
      if (this.query.gender === '') {
        this.query.gender = null
      }
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
      this.detail.dialog.visible = true
    },
    handleCreate() {
      this.create.dialog.visible = true
      this.create.models.gender = this.create.models.gender.toString()
    },
    createData() {
      this.$refs['formCreate'].validate((valid) => {
        if (!valid) return false
        relative.create(this.create.models).then(response => {
          // 为方便连续添加，create对话框不关闭
          // 需要清空的表单，手动清空，至少清空一个必填项，防止点击两遍
          this.create.models.name = '' // 这里做了修改
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    },
    handleUpdate(row) {
      // 若列表数据展示了全部属性，则可直接拷贝列表数据用于编辑
      this.update.models = Object.assign({}, row)
      this.update.models.gender = this.update.models.gender.toString()
      this.update.dialog.visible = true
      this.$nextTick(() => {
        this.$refs['formEdit'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formEdit'].validate((valid) => {
        if (!valid) return false
        const tempData = Object.assign({}, this.update.models)
        relative.update(tempData).then(response => {
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
        relative.del(ids).then(response => {
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
