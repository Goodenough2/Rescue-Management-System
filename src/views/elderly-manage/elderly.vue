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
      <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="姓名" clearable @clear="handleQuery" />
      <!--      <el-input v-model.trim="query.address" class="query-item" style="width: 120px" placeholder="详细地址" clearable @clear="handleQuery" />-->
      <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <el-button class="tool tool-create" type="primary" icon="el-icon-edit" @click="handleCreate">录入老人信息</el-button>
      <el-button class="tool tool-create" type="danger" icon="el-icon-delete" @click="handleDeletes">批量删除</el-button>
    </div>

    <el-table ref="listTable" v-loading="loading.list" v-adaptive="{ bottomOffset: 55 }" height="585px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="50" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省份" prop="province" :sort-orders="sortOrders" align="center" width="80" show-overflow-tooltip />
      <el-table-column label="市" prop="city" :sort-orders="sortOrders" align="center" width="80" show-overflow-tooltip />
      <el-table-column label="区/县" prop="area" :sort-orders="sortOrders" align="center" width="80" show-overflow-tooltip />
      <el-table-column label="姓名" prop="name" :sort-orders="sortOrders" align="center" width="80" show-overflow-tooltip />
      <el-table-column label="性别" :sort-orders="sortOrders" align="center" width="50" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span v-if="row.gender== 'FEMALE'">女</span>
          <span v-if="row.gender== 'MALE'">男</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age" :sort-orders="sortOrders" align="center" width="50" show-overflow-tooltip />
      <el-table-column label="走失时间" prop="lostTime" :sort-orders="sortOrders" align="center" width="170" show-overflow-tooltip />
      <el-table-column label="走失地点" prop="lostAddress" :sort-orders="sortOrders" align="center" width="220" show-overflow-tooltip />
      <el-table-column label="老人工作" prop="job" :sort-orders="sortOrders" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="最近更新时间" prop="updateTime" :sort-orders="sortOrders" align="center" width="170" show-overflow-tooltip />
      <el-table-column label="家属描述" prop="description" :sort-orders="sortOrders" align="left" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="家属信息" placement="top-end">
            <el-button type="success" plain class="button-operate button-detail" size="mini" @click="handleRelative(row)"><i class="el-icon-user" /></el-button>
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
            <el-form-item label="老人名字">
              {{ detail.models.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="老人性别">
              <span v-if="detail.models.gender=='FEMALE'">女</span>
              <span v-if="detail.models.gender=='MALE'">男</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="24" :md="24" :sm="24">
            <el-form-item label="老人照片">
              <div v-for="(photo, index) in detail.models.photos" :key="index">
                <img :src="'data:image/png;base64,'+ photo" style="width: 200px;height: 200px" alt="">
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="走失地址">
              {{ detail.models.lostAddress }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="具体走失位置">
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
            <el-form-item label="样貌特征">
              {{ detail.models.look }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="工作">
              {{ detail.models.job }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="身份证号">
              {{ detail.models.idCard }}
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
              <span v-if="detail.models.mentalMedicalHistory==false">无</span>
              <span v-if="detail.models.mentalMedicalHistory==true">有</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="家属描述">
              {{ detail.models.description }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="创建时间">
              {{ detail.models.createTime }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="最新更新时间">
              {{ detail.models.updateTime }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :md="12" :sm="24">
            <el-form-item label="队员备注">
              {{ detail.models.remark }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog v-loading="loading.relativeDetail" custom-class="dialog-fullscreen dialog-detail" :title="relativeDetail.dialog.title" :visible.sync="relativeDetail.dialog.visible" :modal="false" :modal-append-to-body="false">
      <el-form ref="formDetail" label-position="right" :label-width="relativeDetail.dialog.labelWidth">
        <!--        <el-row>-->
        <!--          <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">-->
        <!--            <el-form-item label="点击添加">-->
        <!--              <el-button @click="addDomain">新增家属信息</el-button>-->
        <!--            </el-form-item>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <div v-for="(relative, index) in relativeDetail.models" :key="index">
          <el-row>
            <el-col :xl="12" :lg="14" :md="16" :sm="17" :xs="20">
              <el-form-item :key="relative.key" :label="'家属' + (index + 1)+':'" :prop="'relatives.' + index + '.name'" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label="'姓名'" :prop="'relatives.' + index + '.name'">
                {{ relative.name }}
              </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label=" '性别' " :prop="'relatives.' + index + '.gender'">
                <span v-if="relative.gender == 0">女</span>
                <span v-if="relative.gender == 1">男</span>
              </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label=" '电话号码' " :prop="'relatives.' + index + '.phoneNumber'">
                {{ relative.phoneNumber }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label=" '与走失老人关系' " :prop="'relatives.' + index + '.relationship'">
                {{ relative.relationship }}
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="14" :md="16" :sm="17" :xs="20">
              <el-form-item :key="relative.key" :label=" '备注' " :prop="'relatives.' + index + '.remark'">
                {{ relative.remark }}
              </el-form-item>
            </el-col>
          </el-row>

        </div>
      </el-form>
    </el-dialog>

    <el-dialog v-loading="loading.update" custom-class="dialog-fullscreen dialog-update" :title="update.dialog.title" :visible.sync="update.dialog.visible" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false" :before-close="handleUpdateClose">
      <el-form ref="formUpdate" :rules="update.rules" :model="update.models" label-position="right" :label-width="update.dialog.labelWidth">
        <el-row>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="老人姓名" prop="name">
              <el-input v-model.number="update.models.name" />
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="老人性别" prop="gender">
              <el-select v-model="update.models.gender" clearable>
                <el-option label="女" value="0" />
                <el-option label="男" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="老人年龄" prop="age">
              <el-input v-model.number="update.models.age" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="走失时间" prop="lostTime">
              <el-date-picker
                v-model="update.models.lostTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="户籍所在地" prop="province">
              <el-cascader
                v-model="selectedUpdataOptions"
                size="large"
                :options="options"
                @change="handleUpdateChange"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="老人身高(cm)" prop="height">
              <el-input v-model.number="update.models.height" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="老人失踪原因" prop="lostReasonId">
              <el-select v-model="update.models.lostReasonId" style="width: 100%" clearable filterable>
                <el-option v-for="item in reasons" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="有无精神病史" prop="mentalMedicalHistory">
              <el-select v-model="update.models.mentalMedicalHistory" clearable>
                <el-option label="无" value="false" />
                <el-option label="有" value="true" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="8" :md="12" :sm="18" :xs="24">
            <el-form-item label="具体走失位置" prop="lostLng">
              <baidu-map class="mapSmall" :center="center" :zoom="zoom" :scroll-wheel-zoom="false" @ready="handler" @rightclick="getClickInfo">
                <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :is-open="true" />
                <bml-marker-cluster :average-center="true">
                  <bm-marker v-for="marker of markers" :key="marker.lng" :position="{lng: marker.lng, lat: marker.lat}" :icon="{url: require('@/static/icon2.png'), size: {width: 30, height: 40}}">
                    <bm-info-window title="<i class=&quot;el-icon-office-building&quot;></i><strong>走失位置</strong>" :position="{lng: marker.lng, lat: marker.lat}" :show="true">
                      <i class="el-icon-location-outline" />
                      <strong>{{ infoWindow.contents }}</strong>
                    </bm-info-window>
                  </bm-marker>
                </bml-marker-cluster>
              </baidu-map>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />
        <el-row>
          <el-col :xl="5" :lg="8" :md="12" :sm="18" :xs="24">
            <el-form-item label="走失位置" prop="lostAddress">
              <el-input v-model="update.models.lostAddress" />
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="8" :md="12" :sm="18" :xs="24">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="update.models.idCard" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
            <el-form-item label="点击添加">
              <el-button @click="addDomain">新增家属信息</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-for="(relative, index) in update.models.relatives" :key="index" class="unit">
          <el-row>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label="'家属' + (index + 1) + '姓名'" :prop="'relatives.' + index + '.name'" :rules="{ required: true, message: '请输入家属姓名', trigger: 'blur' }">
                <el-input v-model="relative.name" />
              </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label=" '性别' " :prop="'relatives.' + index + '.gender'" :rules="{required: true, message: '请选择家属性别', trigger: 'blur'}">
                <el-select v-model="relative.gender" clearable>
                  <el-option label="女" value="0" />
                  <el-option label="男" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label=" '电话号码' " :prop="'relatives.' + index + '.phoneNumber'" :rules="{ required: true, message: '请输入电话号码', trigger: 'blur' }">
                <el-input v-model="relative.phoneNumber" />
              </el-form-item>
            </el-col>
            <el-tooltip v-if="index>0" class="remove-unit" effect="dark" content="删除家属信息" placement="top-end">
              <el-button type="danger" plain icon="el-icon-delete" circle @click.prevent="removeDomain(relative)" />
            </el-tooltip>
          </el-row>
          <el-row>
            <el-col :xl="6" :lg="7" :md="10" :sm="12" :xs="15">
              <el-form-item :key="relative.key" :label=" '与走失老人的关系' " :prop="'relatives.' + index + '.relationship'" :rules="{ required: true, message: '请输入与走失老人的关系', trigger: 'blur' }">
                <el-input v-model="relative.relationship" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="14" :md="16" :sm="17" :xs="20">
              <el-form-item :key="relative.key" :label=" '备注' " :prop="'relatives.' + index + '.remark'">
                <el-input v-model="relative.remark" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="老人职业" prop="job">
              <el-input v-model.number="update.models.job" />
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
            <el-form-item label="老人相貌特征" prop="look">
              <el-input v-model.number="update.models.look" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :lg="10" :md="15" :sm="18" :xs="24">
            <el-form-item label="老人照片上传" prop="photos">
              <el-upload
                list-type="picture"
                action=""
                accept=".jpg, .png"
                :auto-upload="false"
                :file-list="fileList"
                :on-change="getFile"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleUploadRemove"
              >
                <el-button size="small" type="primary">选择图片上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png格式的文件</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sl="24">
            <el-form-item label="具体描述" prop="description">
              <el-input v-model="update.models.description" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="update.dialog.visible = false;fileList = []">取消</el-button>
        <el-button type="primary" @click="updateData()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import adaptive from '@/directive/el-table'
import setRule from '@/utils/form-validate'
import Pagination from '@/components/Pagination'
import * as elderly from '@/api/elderly-manage/elderly'
// import * as relative from '@/api/elderly-manage/relative'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import * as reason from '@/api/standard-manage/reason'

export default {
  name: 'Elderly',
  components: { Pagination },
  directives: { adaptive },
  data() {
    return {
      access: this.$store.getters.access['AreaManage']['Shelter'],
      datas: null,
      center: { lng: 0, lat: 0 },
      zoom: 13,
      markers: [{ lng: 117.207875, lat: 39.092447, showFlag: false }],
      keyword: null,
      location: null,
      infoWindow: {
        show: true,
        contents: '地址为：'
      },
      detialmap: null,
      detialBMap: null,
      // 三级地址联动数据项（不带全部）
      options: regionData,
      selectedOptions: [],
      selectedUpdataOptions: [],
      // 日期选择器快捷键
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      // 图片上传配置项
      dialogVisible: false,
      fileList: [],
      dialogImageUrl: null,
      reasons: null,
      query: { name: null, province: null, city: null, area: null },
      page: { total: 0, current: 1, size: 20 },
      sort: { prop: 'sort', order: 'ascending' },
      detail: {
        dialog: { title: '详细信息', visible: false, labelWidth: '120px' },
        models: { name: null, province: null, city: null, area: null, gender: null, lostLng: 0, lostLat: 0, age: null, height: null, lostTime: null, lostAddress: null, look: null, job: null, idCard: null, description: null, createTime: null, updateTime: null, remark: null, photos: [], lostReasonId: null, lostReasonName: null, mentalMedicalHistory: null }
      },
      relativeDetail: {
        dialog: { title: '家属信息', visible: false, labelWidth: '120px' },
        models: [{ name: null, gender: null, phoneNumber: null, relationship: null, remark: null }, { name: null, gender: null, phoneNumber: null, relationship: null, remark: null }]
      },
      update: {
        dialog: { title: '老人信息录入', visible: false, labelWidth: '150px' },
        models: {
          name: null,
          gender: null,
          age: null,
          height: null,
          lostTime: '',
          province: null,
          city: null,
          area: null,
          lostAddress: null,
          lostLng: null,
          lostLat: null,
          job: null,
          idCard: null,
          description: null,
          look: null,
          photos: [],
          lostReasonId: null,
          lostReasonName: null,
          mentalMedicalHistory: null,
          relatives: [
            { name: null, gender: null, phoneNumber: null, relationship: null, remark: null }
          ]
        },
        rules: {
          name: setRule('老人名字', [{ required: true }]),
          gender: setRule('老人性别', [{ selected: true }]),
          province: setRule('户籍所在地', [{ selected: true }]),
          age: setRule('老人年龄', [{ required: true }]),
          height: setRule('老人身高', [{ required: true }]),
          lostTime: setRule('走失时间', [{ required: true }]),
          address: setRule('户籍地址', [{ required: true }]),
          lostAddress: setRule('走失时的详细地址', [{ required: true }]),
          lostLng: setRule('走失位置', [{ selected: true }]),
          lostReasonId: setRule('走失原因', [{ selected: true }]),
          mentalMedicalHistory: setRule('有无精神病史', [{ selected: true }]),
          // photos: setRule('上传老人图片', [{ required: true }]),
          idCard: setRule('身份证号', [{ required: true }])
        }
      },
      loading: { list: true, export: false, detail: false, update: false, relativeDetail: false },
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
      elderly.getList(this.query, this.page, this.sort).then(response => {
        this.datas = response.data.items
        this.page.total = response.data.total
        this.loading.list = false
      }).catch(reject => {
        this.loading.list = false
      })
      // var j = elderly.getList(this.query, this.page, this.sort)
      // this.datas = j.data.items
      // this.page.total = j.data.total
      // this.loading.list = false
    },
    getReason() {
      reason.getlist().then(responses => {
        this.reasons = responses.data
      }).catch(reject => {})
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
      const temp = { lng: 0, lat: 0 }
      temp.lat = this.detail.models.lostLat
      temp.lng = this.detail.models.lostLng
      this.center.lat = this.detail.models.lostLat
      this.center.lng = this.detail.models.lostLng
      this.markers.splice(0, 1, temp)
      elderly.getPhoto(row.id).then(responses => {
        this.loading.detail = true
        this.detail.models['photos'] = responses.data
        this.loading.detail = false
        console.log(this.detail.models.photos)
      })
      this.detail.dialog.visible = true
    },
    handleRelative(row) {
      this.loading.relativeDetail = true
      this.relativeDetail.dialog.visible = true
      elderly.getRelative(row.id).then(response => {
        this.relativeDetail.models = response.data
      }).catch(reject => {
      })
      this.loading.relativeDetail = false
    },
    handleCreate() {
      this.$router.push({
        path: '/system-operation/informationEntry'
      })
    },
    handleUpdate(row) {
      // 若列表数据展示了全部属性，则可直接拷贝列表数据用于编辑
      this.update.models = Object.assign({}, row)
      this.selectedUpdataOptions.push(TextToCode[this.update.models.province].code)
      this.selectedUpdataOptions.push(TextToCode[this.update.models.province][this.update.models.city].code)
      this.selectedUpdataOptions.push(TextToCode[this.update.models.province][this.update.models.city][this.update.models.area].code)
      // this.dialogImageUrl = 'data:image/png;base64,' + this.update.models.photo
      this.fileList = []
      // this.update.models.lostTime = new Date(this.update.models.lostTime).toISOString()// 2016-06-26T16:00:00.000Z
      elderly.getPhoto(row.id).then(responses => {
        this.update.models['photos'] = responses.data
        for (var i in this.update.models.photos) {
          this.fileList.push({ name: this.update.models.name + '老人图片.png', url: 'data:image/png;base64,' + this.update.models.photos[i] })
        }
      }).catch(reject => {
      })

      const temp = { lng: 0, lat: 0, showFlag: false }
      temp.lat = this.update.models.lostLat
      temp.lng = this.update.models.lostLng
      this.center.lat = this.update.models.lostLat
      this.center.lng = this.update.models.lostLng
      this.markers.splice(0, 1, temp)
      this.infoWindow.contents = '地址：' + this.update.models.lostAddress
      this.update.models.gender = this.update.models.gender.toString()
      this.update.models.mentalMedicalHistory = this.update.models.mentalMedicalHistory.toString()
      this.loading.update = true
      this.update.dialog.visible = true
      this.loading.update = false
      this.$nextTick(() => {
        this.$refs['formUpdate'].clearValidate()
      })
    },
    updateData() {
      if (this.update.models.photos.length === 0) {
        this.$message({ type: 'warning', message: '请上传至少一张走失人员图片', duration: 4000 })
        return false
      }
      this.$refs['formUpdate'].validate((valid) => {
        if (!valid) return false
        const tempData = Object.assign({}, this.update.models)
        elderly.update(tempData).then(response => {
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
        elderly.del(ids).then(response => {
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
    handleUpdateChange(value) {
      // console.log(value)
      this.update.models.province = CodeToText[value[0]]
      this.update.models.city = CodeToText[value[1]]
      this.update.models.area = CodeToText[value[2]]
    },
    handlerDetail({ BMap, map }) {
      this.center.lng = this.detail.models.lostLng
      this.center.lat = this.detail.models.lostLat
      this.zoom = 19
      this.detialmap = map
      this.detialBMap = BMap
    },
    getFile(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        console.log(params, 'params')
        if (params.length > 0) {
          this.update.models.photos.push(params[1])
        }
      })
    },
    // 获取图片转base64
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    handleUploadRemove(file, fileList) {
      const t = fileList.indexOf(file)
      this.update.models.photos.splice(t, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handler({ BMap, map }) {
      this.center.lng = this.update.models.lostLng
      this.center.lat = this.update.models.lostLat
      this.zoom = 19
    },
    getClickInfo(e) {
      // this.center.lng = e.point.lng
      // this.center.lat = e.point.lat
      const temp = { lng: 0, lat: 0, showFlag: false }
      temp.lat = e.point.lat
      temp.lng = e.point.lng
      this.markers.splice(0, 1, temp)
      this.lng = e.point.lng
      this.lat = e.point.lat
      /* 创建地址解析器的实例 */
      const geoCoder = new BMap.Geocoder()
      /* 获取位置对应的坐标 */
      // geoCoder.getPoint(this.addressKeyword, point => {
      //   this.selectedLng = point.lng
      //   this.selectedLat = point.lat
      // })
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, res => {
        console.log(res)
        this.infoWindow.contents = '地址：' + res.address
      })
      this.update.models.lostLat = e.point.lat
      this.update.models.lostLng = e.point.lng
    },
    handleUpdateClose(done) {
      this.fileList = []
      done()
    },
    addDomain() {
      this.update.models.relatives.push(
        { name: null, gender: null, phoneNumber: null, relationship: null, remark: null }
      )
    },
    removeDomain(item) {
      if (this.update.models.relatives.length > 1) {
        var index = this.update.models.relatives.indexOf(item)
        if (index !== -1) {
          this.update.models.relatives.splice(index, 1)
        }
      }
    }
  }
}
</script>

<style>
.mapSmall {
  width: 600px;
  height: 300px;
  /*margin-left: 0px;*/
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

<style lang="scss" scoped>
  .unit {
    position: relative;
    margin: -1px 200px 0 150px;
    border: 1px dashed #ccc;
    padding-bottom: 8px;

    .remove-unit {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
</style>
