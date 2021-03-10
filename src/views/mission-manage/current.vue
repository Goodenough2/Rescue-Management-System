<template>
  <div class="app-container list">
    <div class="toolbar">
      <el-input v-model.trim="query.code" class="query-item" style="width: 120px" placeholder="任务编号" clearable @clear="handleQuery" />
      <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="任务名称" clearable @clear="handleQuery" />
      <el-select v-model="query.status" class="query-item" style="width:150px" placeholder="任务状态" clearable filterable @clear="handleQuery">
        <el-option label="走失老人录入" value="1" />
        <el-option label="任务生成" value="2" />
        <el-option label="团队接单" value="3" />
        <el-option label="老人搜寻" value="4" />
        <el-option label="出现目标老人" value="5" />
        <el-option label="家属辨认" value="6" />
        <el-option label="精准救援" value="7" />
        <!--        <el-option label="任务完成" value="8" />-->
      </el-select>
      <el-input v-model.trim="query.elderlyName" class="query-item" style="width: 120px" placeholder="老人姓名" clearable @clear="handleQuery" />
      <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <!--      <el-button v-if="access.create.allow" class="tool tool-create" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>-->
      <el-button v-if="access.delete.allow" class="tool tool-create" type="danger" icon="el-icon-delete" @click="handleDeletes">批量删除</el-button>
    </div>

    <el-table ref="listTable" v-loading="loading.list" v-adaptive="{ bottomOffset: 55 }" height="585px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务编号" prop="code" :sort-orders="sortOrders" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="任务名称" prop="name" :sort-orders="sortOrders" align="center" width="110" show-overflow-tooltip />
      <el-table-column label="任务等级" prop="level" :sort-orders="sortOrders" align="center" width="80" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-tag size="small" type="success">{{ row.level + '级' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" prop="status" :sort-orders="sortOrders" align="center" width="120" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span v-if="row.status == 1">走失老人录入</span>
          <span v-if="row.status == 2">任务生成</span>
          <span v-if="row.status == 3">团队接单</span>
          <span v-if="row.status == 4">老人搜寻</span>
          <span v-if="row.status == 5">出现目标老人</span>
          <span v-if="row.status == 6">家属辨认</span>
          <span v-if="row.status == 7">精准救援</span>
          <span v-if="row.status == 8">任务完成</span>
        </template>
      </el-table-column>
      <el-table-column label="任务所需人数" prop="memberNum" :sort-orders="sortOrders" align="center" width="110" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.memberNum + '人' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际人数" prop="currNum" :sort-orders="sortOrders" align="center" width="110" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.currNum + '人' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="走失老人姓名" prop="elderlyName" :sort-orders="sortOrders" align="center" width="110" show-overflow-tooltip />
      <el-table-column label="走失地" prop="elderlyLostAddress" :sort-orders="sortOrders" align="center" width="180" show-overflow-tooltip />
      <el-table-column label="信息最近更新时间" prop="elderlyUpdateTime" :sort-orders="sortOrders" align="center" width="200" show-overflow-tooltip sortable>
        <template slot-scope="{row}">
          <i class="el-icon-time" />
          <span style="margin-left: 5px">{{ row.elderlyUpdateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="搜寻备注" prop="elderlyRemark" :sort-orders="sortOrders" align="left" show-overflow-tooltip />
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
            <el-form-item label="任务编号">
              {{ detail.models.code }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="任务名称">
              {{ detail.models.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="所需人数">
              {{ detail.models.memberNum + '人' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="所需人数">
              {{ detail.models.currNum + '人' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="任务等级">
              {{ detail.models.level + '级' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="14" :md="18" :sm="24">
            <el-form-item label="任务进度">
              <el-steps :active="detail.models.status" finish-status="success" style="margin-top: 2px;margin-bottom: 5px">
                <el-step title="走失老人录入" />
                <el-step title="任务生成" />
                <el-step title="团队接单" />
                <el-step title="老人搜寻" />
                <el-step title="出现目标老人" />
                <el-step title="家属辨认" />
                <el-step title="精准救援" />
                <el-step title="任务完成" />
              </el-steps>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="创建时间">
              {{ detail.models.elderlyCreateTime }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="最后更新时间">
              {{ detail.models.elderlyUpdateTime }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="14" :md="18" :sm="24">
            <el-form-item label="走失老人信息">
              <div class="elderlyInfo">
                <el-form ref="form" label-width="100px">
                  <el-row>
                    <el-col :xl="4" :md="6" :sm="24">
                      <el-form-item label="老人姓名">
                        {{ detail.models.elderlyName }}
                      </el-form-item>
                    </el-col>
                    <el-col :xl="4" :md="6" :sm="24">
                      <el-form-item label="老人年龄">
                        {{ detail.models.elderlyAge }}
                      </el-form-item>
                    </el-col>
                    <el-col :xl="8" :md="10" :sm="24">
                      <el-form-item label="走失时间">
                        {{ detail.models.elderlyLostTime }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xl="8" :md="10" :sm="24">
                      <el-form-item label="身份证号">
                        {{ detail.models.elderlyIdCard }}
                      </el-form-item>
                    </el-col>
                    <el-col :xl="8" :md="10" :sm="24">
                      <el-form-item label="相貌特征">
                        {{ detail.models.elderlyLook }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xl="8" :md="10" :sm="24">
                      <el-form-item label="具体走失地">
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
                    <el-col :xl="8" :md="10" :sm="24">
                      <el-form-item label="走失原因">
                        {{ detail.models.elderlyLostReasonName }}
                      </el-form-item>
                    </el-col>
                    <el-col :xl="10" :md="12" :sm="24">
                      <el-form-item label="走失地址">
                        {{ detail.models.elderlyLostAddress }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xl="8" :md="10" :sm="24">
                      <el-form-item label="家属备注">
                        {{ detail.models.elderlyLook }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="搜寻队员描述">
              {{ detail.models.elderlyRemark }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="14" :md="18" :sm="24">
            <el-form-item label="搜寻队员信息" v-if="detail.models.members.length != 0">
              <div v-for="(member, index) in detail.models.members" :key="index"  class="elderlyInfo">
                <el-form ref="form" label-width="100px">
                  <el-row>
                    <el-col :xl="4" :md="6" :sm="24">
                      <el-form-item :key="member.key" :label="'队员' + (index + 1) + '姓名'">
                        {{ member.name }}
                      </el-form-item>
                    </el-col>
                    <el-col :xl="8" :md="10" :sm="24">
                      <el-form-item :key="member.key" label="电话号码">
                        {{ member.phoneNumber }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-form-item>
            <el-form-item label="搜寻队员信息" v-if="detail.models.members.length == 0">
              <el-tag type="warning">暂无团队接受此任务</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="任务备注">
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
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="update.models.name" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="任务编号" prop="code">
              <el-input v-model="update.models.code" />
            </el-form-item>
          </el-col>
        </el-row>
<!--        <el-row>-->
<!--          <el-col :xl="6" :md="12" :sm="24">-->
<!--            <el-form-item label="任务等级" prop="level">-->
<!--              <el-select v-model="update.models.level">-->
<!--                <el-option label="女" value="0" />-->
<!--                <el-option label="男" value="1" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="任务所需人数" prop="memberNum">
              <el-input v-model="update.models.memberNum" />
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
import * as mission from '@/api/mission-manage/mission'
import * as elderly from '@/api/elderly-manage/elderly'

export default {
  name: 'Current',
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      access: this.$store.getters.access['MissionManage']['Current'],
      datas: null,
      elderlies: null,
      center: { lng: 0, lat: 0 },
      zoom: 13,
      markers: [{ lng: 117.207875, lat: 39.092447, showFlag: false }],
      keyword: null,
      location: null,
      infoWindow: {
        show: true,
        contents: '地址为：'
      },
      query: { name: null, code: null, status: null, elderlyName: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '任务信息', visible: false, labelWidth: '120px' },
        models: { name: null,
          code: null,
          status: null,
          remark: null,
          elderlyId: null,
          elderlyName: null,
          elderlyGender: null,
          elderlyAge: null,
          elderlyHeight: null,
          elderlyLostTime: null,
          elderlyProvince: null,
          elderlyCity: null,
          elderlyArea: null,
          elderlyLostAddress: null,
          elderlyLostLng: null,
          elderlyLostLat: null,
          elderlyLostReasonName: null,
          elderlyLook: null,
          elderlyJob: null,
          elderlyIdCard: null,
          elderlyDescription: null,
          elderlyCreateTime: null,
          elderlyLostReasonId: null,
          elderlyUpdateTime: null,
          elderlyRemark: null,
          level: null,
          memberNum: null,
          elderlyMentalMedicalHistory: null,
          currNum: null,
          members: []
        }
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
        dialog: { title: '编辑任务信息', visible: false, labelWidth: '120px' },
        models: {
          code: null,
          status: null,
          remark: null,
          elderlyId: null,
          elderlyName: null,
          elderlyGender: null,
          elderlyAge: null,
          elderlyHeight: null,
          elderlyLostTime: null,
          elderlyProvince: null,
          elderlyCity: null,
          elderlyArea: null,
          elderlyLostAddress: null,
          elderlyLostLng: null,
          elderlyLostLat: null,
          elderlyLostReasonName: null,
          elderlyLook: null,
          elderlyJob: null,
          elderlyIdCard: null,
          elderlyDescription: null,
          elderlyCreateTime: null,
          elderlyLostReasonId: null,
          elderlyUpdateTime: null,
          elderlyRemark: null,
          level: null,
          memberNum: null,
          elderlyMentalMedicalHistory: null,
          currNum: null,
          members: []
        },
        rules: {
          name: setRule('姓名', [{ required: true }]),
          code: setRule('编码', [{ required: true }]),
          memberNum: setRule('任务所需人数', [{ required: true }])
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
      mission.getList(this.query, this.page, this.sort).then(response => {
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
      // var j = mission.getList(this.query, this.page, this.sort)
      // this.datas = j.data.items
      // this.page.total = j.data.total
      // this.loading.list = false
    },
    getElderly() {
      elderly.getlist().then(response => {
        this.elderlies = response.data
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
      this.detail.models = Object.assign({}, row)
      const temp = { lng: 0, lat: 0 }
      temp.lat = this.detail.models.elderlyLostLat
      temp.lng = this.detail.models.elderlyLostLng
      this.center.lat = this.detail.models.lostLat
      this.center.lng = this.detail.models.lostLng
      this.markers.splice(0, 1, temp)
      this.detail.dialog.visible = true
    },
    handleCreate() {
      this.create.dialog.visible = true
      this.create.models.gender = this.create.models.gender.toString()
    },
    createData() {
      this.$refs['formCreate'].validate((valid) => {
        if (!valid) return false
        mission.create(this.create.models).then(response => {
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
      // this.update.models.gender = this.update.models.gender.toString()
      this.update.dialog.visible = true
      this.$nextTick(() => {
        this.$refs['formEdit'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formEdit'].validate((valid) => {
        if (!valid) return false
        const tempData = Object.assign({}, this.update.models)
        mission.update(tempData).then(response => {
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
        mission.del(ids).then(response => {
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    },
    handlerDetail({ BMap, map }) {
      this.center.lng = this.detail.models.elderlyLostLng
      this.center.lat = this.detail.models.elderlyLostLat
      this.zoom = 19
    }
  }
}
</script>

<style lang="scss" scoped>
.elderlyInfo {
  border: #20a0ff dashed;
  margin-top: 8px;
  margin-bottom: 10px;
}
</style>

<style>
.mapSmall {
  width: 600px;
  height: 300px;
  /*margin-left: 0px;*/
  margin-top: 6px;
  margin-bottom: 6px;
}
/* 去除百度地图版权那行字 和 百度logo */
.BMap_cpyCtrl {
  display: none !important;
}
.anchorBL {
  display: none !important;
}

</style>
