<template>
  <div class="app-container list">
    <el-form ref="formCreate" :rules="create.rules" :model="create.models" label-position="right" :label-width="create.dialog.labelWidth">
      <el-row>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="老人姓名" prop="name">
            <el-input v-model.number="create.models.name" />
          </el-form-item>
        </el-col>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="老人性别" prop="gender">
            <el-select v-model="create.models.gender" clearable>
              <el-option label="女" value="0" />
              <el-option label="男" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="老人年龄" prop="age">
            <el-input v-model.number="create.models.age" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="走失时间" prop="lostTime">
            <el-date-picker
              v-model="create.models.lostTime"
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
              v-model="selectedOptions"
              size="large"
              :options="options"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="老人身高(cm)" prop="height">
            <el-input v-model.number="create.models.height" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="老人失踪原因" prop="lostReasonId">
            <el-select v-model="create.models.lostReasonId" style="width: 100%" clearable filterable>
              <el-option v-for="item in reasons" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="有无精神病史" prop="mentalMedicalHistory">
            <el-select v-model="create.models.mentalMedicalHistory" clearable>
              <el-option label="无" value="false" />
              <el-option label="有" value="true" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="5" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="走失位置" prop="lostLng">
            <el-button @click="addAddress">点击选择位置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <baidu-map class="mapSmall" :center="center" :zoom="zoom" :scroll-wheel-zoom="false" @ready="handler">
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
      </el-row>
      <el-row>
        <el-col :xl="5" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="走失位置" prop="lostAddress">
            <el-input v-model="create.models.lostAddress" />
          </el-form-item>
        </el-col>
        <el-col :xl="5" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="create.models.idCard" />
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
      <div v-for="(relative, index) in create.models.relatives" :key="index" class="unit">
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
            <el-input v-model.number="create.models.job" />
          </el-form-item>
        </el-col>
        <el-col :xl="5" :lg="8" :md="10" :sm="18" :xs="24">
          <el-form-item label="老人相貌特征" prop="look">
            <el-input v-model.number="create.models.look" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="10" :md="115" :sm="18" :xs="24">
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
            <el-input v-model="create.models.description" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="createData()">录入信息</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-loading="loading.address" custom-class="dialog-fullscreen dialog-update" :title="address.dialog.title" :visible.sync="address.dialog.visible" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false">
      <el-form ref="formUpdate" :rules="address.rules" :model="address.models" label-position="right" :label-width="address.dialog.labelWidth">
        <el-row>
          <el-col class="prompt" :xl="10" :md="15" :sm="24">
            <el-form-item label="提示:">
              {{ "请在途中选择单击鼠标右键选择对应走失位置，同时也可以通过下方地址，区域栏进行具体位置的检索操作" }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :md="10" :sm="24">
            <el-form-item label="地址">
              <el-input v-model="keyword" placeholder="示例：***医院" />
            </el-form-item>
          </el-col>
          <el-col :xl="5" :md="10" :sm="24">
            <el-form-item label="区域">
              <el-input v-model="location" placeholder="示例：天津市" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="false" @ready="handler" @rightclick="getClickInfo">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{width:40,height:20}" />
        <bm-view style="width: 100%; height:450px; flex: 1" />
        <bm-local-search :keyword="keyword" :auto-viewport="true" />
        <bml-marker-cluster :average-center="true">
          <bm-marker v-for="marker of markers" :key="marker.lng" :position="{lng: marker.lng, lat: marker.lat}" :icon="{url: require('@/static/icon2.png'), size: {width: 30, height: 40}}">
            <bm-info-window title="<i class=&quot;el-icon-office-building&quot;></i><strong>走失位置</strong>" :position="{lng: marker.lng, lat: marker.lat}" :show="true">
              <i class="el-icon-location-outline" />
              <strong>{{ infoWindow.contents }}</strong>
            </bm-info-window>
          </bm-marker>
        </bml-marker-cluster>
      </baidu-map>
      <div slot="footer" class="dialog-footer">
        <el-button @click="address.dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="addressData()">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import adaptive from '@/directive/el-table'
import setRule from '@/utils/form-validate'
import * as elderly from '@/api/elderly-manage/elderly'
import * as reason from '@/api/standard-manage/reason'
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  name: 'InformationEntry',
  directives: { adaptive },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 13,
      markers: [{ lng: 0, lat: 0, showFlag: false }],
      keyword: null,
      location: null,
      infoWindow: {
        show: true,
        contents: '地址为：'
      },
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
      // 三级地址联动数据项（不带全部）
      options: regionData,
      selectedOptions: [],
      // 图片上传配置项
      dialogVisible: false,
      fileList: [],
      dialogImageUrl: null,
      reasons: null,
      create: {
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
          lostReasonId: null,
          mentalMedicalHistory: null,
          photos: [],
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
          photos: setRule('上传老人图片', [{ selected: true }]),
          lostReasonId: setRule('走失原因', [{ selected: true }]),
          mentalMedicalHistory: setRule('有无精神病史', [{ selected: true }]),
          idCard: setRule('身份证号', [{ required: true }])
        }
      },
      address: {
        dialog: { title: '走失位置选择', visible: false, labelWidth: '150px' },
        models: {},
        rules: {
        }
      },
      loading: { list: true, export: false, detail: false, address: false }
    }
  },
  created() {
    this.getReason()
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 117.207875
      this.center.lat = 39.092447
      this.zoom = 19
      // var point = new BMap.Point(this.center.lng, this.center.lng)
      // map.centerAndZoom(point, 13)
      // var marker = new BMap.Marker(point) // 创建标注
      // map.addOverlay(marker) // 将标注添加到地图中
      // var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
      // map.addOverlay(circle)
    },
    getClickInfo(e) {
      console.log(e.point.lng)
      console.log(e.point.lat)
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
    },
    getReason() {
      reason.getlist().then(responses => {
        this.reasons = responses.data
      }).catch(reject => {})
    },
    addAddress() {
      this.loading.address = true
      this.address.dialog.visible = true
      this.loading.address = false
    },
    addressData() {
      this.address.dialog.visible = false
      this.create.models.lostLng = this.markers[0].lng
      this.create.models.lostLat = this.markers[0].lat
      this.create.models.lostAddress = this.infoWindow.contents.replace('地址：', '')
      this.center.lat = this.markers[0].lat
      this.center.lng = this.markers[0].lng
      this.zoom = 12
    },
    handleChange(value) {
      // console.log(value)
      this.create.models.province = CodeToText[value[0]]
      this.create.models.city = CodeToText[value[1]]
      this.create.models.area = CodeToText[value[2]]
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
    getFile(file, fileList) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        console.log(params, 'params')
        if (params.length > 0) {
          // this.create.models.photo = params[1]
          this.create.models.photos.push(params[1])
        }
      })
    },
    handleUploadRemove(file, fileList) {
      // const t = this.photos.indexOf(file)
      const t = fileList.indexOf(file)
      this.update.models.photos.splice(t, 1)
      // this.getBase64(file.raw).then(res => {
      //   const params = res.split(',')
      //   console.log(params, 'params')
      //   if (params.length > 0) {
      //     // this.create.models.photo = params[1]
      //     const t = this.create.models.photos.indexOf(params[1])
      //     this.create.models.photos.splice(t, 1)
      //   }
      // })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    createData() {
      this.$refs['formCreate'].validate((valid) => {
        if (!valid) return false
        elderly.create(this.create.models).then(response => {
        // 为方便连续添加，create对话框不关闭
        // 需要清空的表单，手动清空，至少清空一个必填项，防止点击两遍
          this.create.models.name = null
          this.create.models.gender = null
          this.create.models.age = null
          this.create.models.height = null
          this.create.models.lostTime = ''
          this.create.models.address = null
          this.create.models.lostAddress = null
          this.create.models.lostLng = null
          this.create.models.lostLat = null
          this.create.models.job = null
          this.create.models.idCard = null
          this.create.models.description = null
          this.create.models.photo = ''
          this.create.models.look = null
          // 重新获取数据
          this.getDatas()
        }).catch(reject => {
        })
      })
    },
    addDomain() {
      this.create.models.relatives.push(
        { name: null, gender: null, phoneNumber: null, relationship: null, remark: null }
      )
    },
    removeDomain(item) {
      if (this.create.models.relatives.length > 1) {
        var index = this.create.models.relatives.indexOf(item)
        if (index !== -1) {
          this.create.models.relatives.splice(index, 1)
        }
      }
    }
  }
}
</script>
<style>
  /*.baidumap {*/
  /*  width: 500px;*/
  /*  height: 400px；*/
  /*}*/

  /* 去除百度地图版权那行字 和 百度logo */
  /* .baidumap > .BMap_cpyCtrl {
        display: none !important;
    }
    .baidumap > .anchorBL {
        display: none !important;
    } */
  .map {
    width: 100%;
    height: 600px;
    margin-top: 10px;
  }

  /* 去除百度地图版权那行字 和 百度logo */
   .map  .BMap_cpyCtrl {
        display: none !important;
    }
    .map .anchorBL {
      display: none !important;
    }

  .mapSmall {
    width: 600px;
    height: 300px;
    margin-left: 150px;
    margin-top: 6px;
    border: 2px dashed #ccc;
  }
  /* 去除百度地图版权那行字 和 百度logo */
  .mapSmall  .BMap_cpyCtrl {
    display: none !important;
  }
  .mapSmall .anchorBL {
    display: none !important;
  }
</style>

<style lang="scss" scoped>
  .app-container {
    height: 100%;
    overflow: auto;
  }
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

  .prompt {
    font-weight: bold;
    color: red;
    font-size: 10px;
  }

</style>
