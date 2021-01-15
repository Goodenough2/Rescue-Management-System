<template>
  <div class="app-container list">
    <div class="toolbar">
      <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="角色名" clearable @clear="handleQuery" />
      <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <el-button class="tool tool-create" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button class="tool tool-create" type="danger" icon="el-icon-delete" @click="handleDeletes">批量删除</el-button>
    </div>

    <el-table ref="listTable" v-loading="loading.list" v-adaptive="{ bottomOffset: 55 }" height="585px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="100" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名" prop="name" :sort-orders="sortOrders" align="center" width="150" show-overflow-tooltip />
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
            <el-button type="primary" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination :hidden="page.total==0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />

    <el-dialog v-loading="loading.detail" custom-class="dialog-fullscreen dialog-detail" :title="detail.dialog.title" :visible.sync="detail.dialog.visible" :modal="false" :modal-append-to-body="false">
      <el-form ref="formDetail" label-position="right" :label-width="detail.dialog.labelWidth">
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="角色名">
              {{ detail.models.name }}
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
            <el-form-item label="角色名" prop="name">
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
        <!--        todo 权限列表添加-->
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
            <el-form-item label="角色名" prop="name">
              <el-input v-model="update.models.name" />
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
        <!--        todo 权限列表添加-->
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
// import TreeTransfer from 'el-tree-transfer'

export default {
  name: 'Role',
  // components: { Pagination, TreeTransfer },
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      access: this.$store.getters.access['SystemManage']['Role'],
      datas: null,
      title: ['权限列表', '赋予权限'],
      x: 0,
      // fromData: [
      //   { id: 1, pid: 0, label: '货物管理' },
      //   { id: 2, pid: 1, label: '货物颜色' },
      //   { id: 3, pid: 1, label: 'no.3' },
      //   { id: 4, pid: 1, label: 'no.4' },
      //   { id: 5, pid: 1, label: 'no.5' },
      //   { id: 6, pid: 2, label: 'no.6' },
      //   { id: 7, pid: 2, label: 'no.7' },
      //   { id: 8, pid: 2, label: 'no.8' }
      // ],
      // // 所有权限数据
      // accessList: [],
      // // 详情中权限数据
      // accessDetail: [],
      // // 修改中的未获得的权限
      // accessFrom: [],
      // // 修改或添加时，存放赋予的权限
      // accessTo: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // },
      query: { name: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '角色信息', visible: false, labelWidth: '120px' },
        models: { name: null, type: null, remark: null, access: [] }
      },
      create: {
        dialog: { title: '添加角色', visible: false, labelWidth: '120px' },
        models: { name: null, remark: null, access: [] },
        rules: {
          name: setRule('角色名称', [{ required: true }, { length: [0, 50] }]),
          remark: setRule('备注', [{ length: [0, 255] }])
        }
      },
      update: {
        dialog: { title: '编辑角色信息', visible: false, labelWidth: '120px' },
        models: { name: null, remark: null, access: null },
        rules: {
          name: setRule('角色名称', [{ required: true }, { length: [0, 50] }]),
          remark: setRule('备注', [{ length: [0, 255] }])
        }
      },
      loading: { list: true, export: false, detail: false, update: false },
      sortOrders: ['ascending', 'descending']
    }
  },
  created() {
    this.getDatas()
    // this.getAllAccess()
  },
  methods: {
    getDatas() {
      this.loading.list = true
      role.getList(this.query, this.page, this.sort).then(response => {
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
    },
    // // 数组转为Tree
    // arrayToTree(list, pid = null) {
    //   return list.filter(item => item.pid === pid).map(item => ({
    //     ...item,
    //     children: this.arrayToTree(list, item.id)
    //   }))
    // },
    // arrayToTree2(list, pid = 0) {
    //   return list.filter(item => item.pid === pid).map(item => ({
    //     ...item,
    //     children: this.arrayToTree(list, item.id)
    //   }))
    // },
    // // Tree转为array
    // treeToArray(data) {
    //   return data.reduce((arr, { id, label, pid, children = [] }) =>
    //     arr.concat([{ id, label, pid }], this.treeToArray(children, id)), [])
    // },
    // getAllAccess() {
    //   role.getAllAccess().then(response => {
    //     this.accessList = this.arrayToTree(response.data)
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
      this.detail.models = Object.assign({}, row)
      this.detail.dialog.visible = true
      this.loading.detail = true
      this.loading.detail = false
      // 运用请求的方式获取角色信息
      // role.get(row.id).then(response => {
      //   this.detail.models = response.data.role
      //   // console.log(response)
      //   // 获取此id的access，转成tree
      //   // this.accessDetail = this.arrayToTree(response.data.access)
      //   this.loading.detail = false
      // }).catch(reject => {
      //   this.loading.detail = false
      // })
    },
    // // 监听穿梭框组件添加, accessTo用来接受添加与修改中的 赋予权限数据
    // add(fromData, toData, obj) {
    //   this.accessTo = toData
    // },
    // // 监听穿梭框组件移除, toData为右侧权限数据
    // remove(fromData, toData, obj) {
    //   this.accessTo = toData
    // },
    handleCreate() {
      this.create.dialog.visible = true
      this.x = 1
      // console.log(this.accessList)
    },
    createData() {
      this.$refs['formCreate'].validate((valid) => {
        if (!valid) return false
        // if (this.accessTo !== []) {
        //   this.create.models.access = this.treeToArray(this.accessTo)
        // } else {
        //   this.create.models.access = []
        // }
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
    // 一个数组去掉另一个数组中的对象
    // moveToData(fromData, toData) {
    //   const idList = toData.map(v => v.id)
    //   // console.log(idList)
    //   fromData = fromData.filter(item => {
    //     return !idList.includes(item.id)
    //   })
    //   return fromData
    // },
    handleUpdate(row) {
      // 若列表数据展示了全部属性，则可直接拷贝列表数据用于编辑
      this.update.models = Object.assign({}, row)
      this.update.dialog.visible = true
      this.loading.update = true
      this.loading.update = false

      // role.get(row.id).then(response => {
      //   this.detail.models = response.data.role
      // console.log(response)
      // 获取此id的access，转成tree
      // this.accessDetail = this.arrayToTree(response.data.access)
      // // console.log(this.detail.models)
      // this.update.models = Object.assign({}, this.detail.models)
      // // console.log(this.update.models)
      // // 获取当前已有权限: tree型
      // this.accessTo = this.accessDetail
      // // 所有权限去掉当前权限 = 未获得权限: accessfrom: array
      // const accessfrom = this.moveToData(this.treeToArray(this.accessList), this.treeToArray(this.accessTo))
      // console.log(accessfrom)
      // console.log(this.treeToArray(this.accessList))
      // console.log(this.treeToArray(this.accessTo))
      // if (this.x === 0) {
      //   this.accessFrom = this.arrayToTree(accessfrom)
      // }
      // if (this.x === 1) {
      //   this.accessFrom = this.arrayToTree2(accessfrom)
      // }
      // console.log(this.accessFrom)
      //   this.loading.update = false
      //   this.update.dialog.visible = true
      // }).catch(reject => {
      //   this.loading.update = false
      // })

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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
