<template>
  <div class="app-container list">
    <div class="toolbar">
      <el-select v-model="query.gender" class="query-item" style="width:120px" placeholder="性别" clearable @clear="handleQuery">
        <el-option label="女" value="0" />
        <el-option label="男" value="1" />
        <el-option label="不限" value="2" />
      </el-select>
      <el-select v-model="query.lostReasonId" class="query-item" style="width:300px" placeholder="走失原因" clearable filterable @clear="handleQuery">
        <el-option v-for="item in reasons" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
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
      <el-table-column label="等级" prop="level" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.level + '级' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="走失年龄下界" prop="ageBelow" :sort-orders="sortOrders" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="走失年龄下界" prop="ageOver" :sort-orders="sortOrders" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="性别" prop="gender" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span v-if="row.gender == 'FEMALE'">女</span>
          <span v-if="row.gender == 'MALE'">男</span>
          <span v-if="row.gender == 'UNKNOWN'">不限</span>
        </template>
      </el-table-column>
      <el-table-column label="走失超过时间" prop="lostDuration" :sort-orders="sortOrders" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="有无精神病史" prop="mentalMedicalHistory" :sort-orders="sortOrders" align="center" width="120" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span v-if="row.mentalMedicalHistory == true">有</span>
          <span v-if="row.mentalMedicalHistory == false">无</span>
        </template>
      </el-table-column>
      <el-table-column label="走失原因" prop="lostReasonName" :sort-orders="sortOrders" align="center" width="300" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" :sort-orders="sortOrders" align="left" show-overflow-tooltip />
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
            <el-form-item label="等级">
              {{ detail.models.level + '级' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失年龄下界">
              {{ detail.models.ageBelow }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失年龄上界">
              {{ detail.models.ageOver }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="性别">
              <span v-if="detail.models.gender == 'FEMALE'">女</span>
              <span v-if="detail.models.gender == 'MALE'">男</span>
              <span v-if="detail.models.gender == 'UNKNOWN'">不限</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失超过时间">
              {{ detail.models.lostDuration }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失原因">
              {{ detail.models.lostReasonName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="有无精神病史">
              <span v-if="detail.models.mentalMedicalHistory == 0">无</span>
              <span v-if="detail.models.mentalMedicalHistory == 1">有</span>
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
            <el-form-item label="等级" prop="level">
              <el-input v-model="create.models.level" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="年龄区间" prop="ageBelow">
              <el-input v-model="create.models.ageBelow" type="number" style="width: 40%" /> ~
              <el-input v-model="create.models.ageOver" type="number" style="width: 40%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="create.models.gender">
                <el-option label="女" value="0" />
                <el-option label="男" value="1" />
                <el-option label="不限" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失超过时间" prop="lostDuration">
              <el-input v-model="create.models.lostDuration" style="width: 40%" type="number"/> (小时/h)
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失原因" prop="lostReasonId">
              <el-select v-model="create.models.lostReasonId" clearable filterable>
                <el-option v-for="item in reasons" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="有无精神病史" prop="mentalMedicalHistory">
              <el-switch v-model="create.models.mentalMedicalHistory" :active-value="true" :inactive-value="false" />
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
            <el-form-item label="等级" prop="level">
              <el-input v-model="update.models.level" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="年龄区间" prop="ageBelow">
              <el-input v-model="update.models.ageBelow" type="number" style="width: 40%" /> ~
              <el-input v-model="update.models.ageOver" type="number" style="width: 40%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="update.models.gender">
                <el-option label="女" value="FEMALE" />
                <el-option label="男" value="MALE" />
                <el-option label="不限" value="UNKNOWN" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失超过时间" prop="lostDuration">
              <el-input v-model="update.models.lostDuration" style="width: 40%" type="number"/> (小时/h)
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失原因" prop="lostReasonId">
              <el-select v-model="update.models.lostReasonId" clearable filterable>
                <el-option v-for="item in reasons" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="有无精神病史" prop="mentalMedicalHistory">
              <el-switch v-model="update.models.mentalMedicalHistory" :active-value="true" :inactive-value="false" />
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
import * as reason from '@/api/standard-manage/reason'
import * as standard from '@/api/standard-manage/standard'

export default {
  name: 'Standard',
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      access: this.$store.getters.access['StandardManage']['Standard'],
      datas: null,
      reasons: null,
      currentLevel: null,
      query: { gender: null, lostReasonId: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '等级信息', visible: false, labelWidth: '120px' },
        models: { ageBelow: null, ageOver: null, gender: null, lostDuration: null, lostReasonId: null, lostReasonName: null, mentalMedicalHistory: null, level: null, remark: null }
      },
      create: {
        dialog: { title: '添加等级', visible: false, labelWidth: '120px' },
        models: { ageBelow: null, ageOver: null, gender: null, lostDuration: null, lostReasonId: null, lostReasonName: null, mentalMedicalHistory: null, level: null, remark: null },
        rules: {
          ageBelow: setRule('年龄区间', [{ required: true }]),
          gender: setRule('性别', [{ selected: true }]),
          lostDuration: setRule('走失超过时间', [{ required: true }]),
          lostReasonId: setRule('走失原因', [{ selected: true }]),
          mentalMedicalHistory: setRule('有无精神病史', [{ selected: true }])
        }
      },
      update: {
        dialog: { title: '编辑等级', visible: false, labelWidth: '120px' },
        models: { ageBelow: null, ageOver: null, gender: null, lostDuration: null, lostReasonId: null, lostReasonName: null, mentalMedicalHistory: null, level: null, remark: null },
        rules: {
          ageBelow: setRule('年龄区间', [{ required: true }]),
          gender: setRule('性别', [{ selected: true }]),
          lostDuration: setRule('走失超过时间', [{ required: true }]),
          lostReasonId: setRule('走失原因', [{ selected: true }]),
          mentalMedicalHistory: setRule('有无精神病史', [{ selected: true }])
        }
      },
      loading: { list: true, export: false, detail: false, update: false },
      sortOrders: ['ascending', 'descending']
    }
  },
  created() {
    this.getDatas()
    this.getReason()
  },
  methods: {
    getDatas() {
      this.loading.list = true
      standard.getList(this.query, this.page, this.sort).then(response => {
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
      // var j = standard.getList(this.query, this.page, this.sort)
      // this.datas = j.data.items
      // this.page.total = j.data.total
      // this.loading.list = false
    },
    getReason() {
      reason.getlist().then(response => {
        this.reasons = response.data
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
      this.create.models.level = this.datas == null ? 1 : this.datas.length + 1
      this.create.dialog.visible = true
    },
    createData() {
      if (this.create.models.ageOver == null) {
        this.$message({ type: 'warning', message: '请确定年龄区间上限', duration: 4000 })
        return false
      }
      if (this.create.models.ageBelow == null) {
        this.$message({ type: 'warning', message: '请确定年龄区间下限', duration: 4000 })
        return false
      }
      if (parseInt(this.create.models.ageBelow) > parseInt(this.create.models.ageOver)) {
        this.$message({ type: 'warning', message: '年龄区间下限不能大于上限', duration: 4000 })
        return false
      }
      this.$refs['formCreate'].validate((valid) => {
        if (!valid) return false
        standard.create(this.create.models).then(response => {
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
      if (this.update.models.ageOver == null) {
        this.$message({ type: 'warning', message: '请确定年龄区间上限', duration: 4000 })
        return false
      }
      if (this.update.models.ageBelow == null) {
        this.$message({ type: 'warning', message: '请确定年龄区间下限', duration: 4000 })
        return false
      }
      if (parseInt(this.update.models.ageBelow) > parseInt(this.update.models.ageOver)) {
        this.$message({ type: 'warning', message: '年龄区间下限不能大于上限', duration: 4000 })
        return false
      }
      this.$refs['formEdit'].validate((valid) => {
        if (!valid) return false
        const tempData = Object.assign({}, this.update.models)
        standard.update(tempData).then(response => {
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
        standard.del(ids).then(response => {
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
