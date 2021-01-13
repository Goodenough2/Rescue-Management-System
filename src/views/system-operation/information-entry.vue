<template>
  <div class="app-container list">
    <el-form ref="formCreate" :rules="create.rules" :model="create.models" label-position="right" :label-width="create.dialog.labelWidth">
      <el-row>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="操作意图" prop="storeOperateTypeId">
            <el-select v-model="create.models.storeOperateTypeId" clearable filterable>
              <el-option v-for="item in storeOperateTypes" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="货物类型" prop="goods.goodsCategoryId">
            <el-select v-model="create.models.goods.goodsCategoryId" filterable placeholder="请选择" @change="selectChanged">
              <el-option v-for="item in goodsCategories" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-tooltip class="item" effect="dark" content="货物类别" placement="top-end">
              <el-button type="primary" plain class="button-operate button-detail" circle icon="el-icon-edit" @click="handleCreateCategories()" />
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="入库数量" prop="goods.quality">
            <el-input v-model.number="create.models.goods.quality" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="点击添加">
            <el-button @click="addaddress">选择走失位置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-for="(goodsStorageMode, index) in create.models.goodsStorageModes" :key="index" class="unit">
        <el-row>
          <el-col :xl="5" :sm="6" :xs="7">
            <el-form-item v-if="index === 0" :key="goodsStorageMode.key" :label="(index + 1) + '级货物单位' " :prop="'goodsStorageModes.' + index + '.unitId'">
              <el-input v-model="unitname" :disabled="true" />
            </el-form-item>
            <el-form-item v-if="index > 0" :key="goodsStorageMode.key" :label="(index + 1) + '级货物单位' " :prop="'goodsStorageModes.' + index + '.unitId'" :rules="{ required: true, message: '请选择货物单位', trigger: 'blur' }">
              <el-select v-model="goodsStorageMode.unitId" clearable @change="((val)=>{changeUnit(val, index)})">
                <el-option v-for="item in goodsUnits" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="false" :key="goodsStorageMode.key" :label=" '名称' " :prop="'goodsStorageModes.' + index + '.name'" :rules="[{ required: true, message: '请输入存储模式名称', trigger: 'blur' }]">
              <el-input v-model="goodsStorageMode.name" />
            </el-form-item>
          </el-col>
          <el-tooltip v-if="index>0" class="remove-unit" effect="dark" content="删除货物存储模式" placement="top-end">
            <el-button type="danger" plain icon="el-icon-delete" circle @click.prevent="removeDomain(goodsStorageMode)" />
          </el-tooltip>
        </el-row>
        <el-row>
          <el-col :xl="3" :lg="4" :md="5" :sm="8" :xs="12">
            <el-form-item :key="goodsStorageMode.key" :label=" '换算系数' " :prop="'goodsStorageModes.' + index + '.ratio'" :rules="{required: true, message: '请输入存储模式换算系数', trigger: 'blur'}">
              <el-input v-model="goodsStorageMode.ratio" type="number" :disabled="index===0" />
            </el-form-item>
          </el-col>
          <el-col :xl="3" :lg="4" :md="5" :sm="8" :xs="12">
            <el-form-item :key="goodsStorageMode.key" :label=" '重量/kg:' " :prop="'goodsStorageModes.' + index + '.weight'" :rules="{ required: true, message: '请输入存储模式重量', trigger: 'blur' }">
              <el-input v-model="goodsStorageMode.weight" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xl="3" :lg="4" :md="5" :sm="8" :xs="12">
            <el-form-item :key="goodsStorageMode.key" :label=" '长度/cm:' " :prop="'goodsStorageModes.' + index + '.length'" :rules="{ required: true, message: '请输入存储模式长度', trigger: 'blur' }">
              <el-input v-model="goodsStorageMode.length" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xl="3" :lg="4" :md="5" :sm="8" :xs="12">
            <el-form-item :key="goodsStorageMode.key" :label=" '宽度/cm:' " :prop="'goodsStorageModes.' + index + '.width'" :rules="{ required: true, message: '请输入存储模式宽度', trigger: 'blur' }">
              <el-input v-model="goodsStorageMode.width" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xl="3" :lg="4" :md="5" :sm="8" :xs="12">
            <el-form-item :key="goodsStorageMode.key" :label=" '高度/cm:' " :prop="'goodsStorageModes.' + index + '.height'" :rules="{ required: true, message: '请输入存储模式高度', trigger: 'blur' }">
              <el-input v-model="goodsStorageMode.height" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="目的位置条码" prop="locationCode">
            <el-input v-model="create.models.locationCode" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="货物条形码" prop="goods.goodsBarCode">
            <el-input v-model="create.models.goods.goodsBarCode" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="货物RFID" prop="goods.goodsRfidCode">
            <el-input v-model="create.models.goods.goodsRfidCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="12" :sm="18" :xs="24">
          <el-form-item label="送货人信息" prop="deliveryman">
            <el-input v-model="create.models.deliveryman" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sl="24">
          <el-form-item label="入库备注说明" prop="description">
            <el-input v-model="create.models.description" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="createData()">入库</el-button>
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
        <bm-view style="width: 100%; height:400px; flex: 1" />
        <bm-local-search :keyword="keyword" :auto-viewport="true" />
        <bml-marker-clusterer :average-center="true">
          <bm-marker v-for="marker of markers" :position="{lng: marker.lng, lat: marker.lat}" :icon="{url: require('@/static/icon2.png'), size: {width: 30, height: 40}}">
            <bm-info-window title="走失地:" :position="{lng: marker.lng, lat: marker.lat}" :show="true">
              <p v-text="infoWindow.contents" />
            </bm-info-window>
          </bm-marker>
        </bml-marker-clusterer>
      </baidu-map>
      <div slot="footer" class="dialog-footer">
        <el-button @click="address.dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="addressData()">提交</el-button>
      </div>
    </el-dialog>

  </div>
  <!--  <baidu-map :center="center" :zoom="zoom" style="height:1080px" :scroll-wheel-zoom="true" @ready="handler" @click="getClickInfo" />-->
<!--  <div class="map">-->
<!--    <label>关键词：<input v-model="keyword"></label>-->
<!--    <label>地区：<input v-model="location"></label>-->
<!--    <baidu-map :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="handler" @click="getClickInfo">-->
<!--      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />-->
<!--      <bm-view style="width: 100%; height:500px; flex: 1" />-->
<!--      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" />-->
<!--      <bml-marker-clusterer :average-center="true">-->
<!--        <bm-marker v-for="marker of markers" :position="{lng: marker.lng, lat: marker.lat}" />-->
<!--      </bml-marker-clusterer>-->
<!--    </baidu-map>-->
<!--  </div>-->

<!--  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" />-->
</template>

<script>
import adaptive from '@/directive/el-table'
import setRule from '@/utils/form-validate'
export default {
  name: 'InformationEntry',
  directives: { adaptive },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 13,
      markers: [{ lng: 109, lat: 36, showFlag: false }],
      keyword: null,
      location: null,
      infoWindow: {
        show: true,
        contents: '地址为：'
      },
      goodsCategories: null,
      operators: null,
      goodsUnits: null,
      storeOperateTypes: null,
      cells: null,
      devices: null,
      vessels: null,
      unitname: null,
      goodsCategoriesAll: null,
      create: {
        dialog: { title: '货物入库', visible: false, labelWidth: '100px' },
        models: {
          goods: {
            goodsCategoryId: null,
            quality: null,
            inspectorId: null,
            goodsBarCode: null,
            goodsRfidCode: null
          },
          storeOperateTypeId: null,
          description: null,
          deliveryman: null,
          locationCode: null,
          goodsStorageModes: [
            { ratio: null, unitId: null, name: null, weight: null, length: null, width: null, height: null }
          ]
        },
        rules: {
          storeOperateTypeId: setRule('操作类型', [{ selected: true }]),
          locationCode: setRule('单元格条码', [{ required: true }, { length: [0, 255] }]),
          goods: {
            goodsCategoryId: setRule('货物种类', [{ selected: true }]),
            storageModeId: setRule('货物存储模式', [{ selected: true }]),
            quality: setRule('货物数量', [{ required: true }]),
            goodsBarCode: setRule('货物条形码', [{ length: [0, 255] }]),
            goodsRfidCode: setRule('货物RFID', [{ length: [0, 255] }])
          },
          description: setRule('入库备注描述', [{ length: [0, 255] }]),
          deliveryman: setRule('送货人信息', [{ required: true }, { length: [0, 50] }])
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
    addaddress() {
      this.loading.address = true
      this.address.dialog.visible = true
      this.loading.address = false
    },
    infoWindowClose(marker) {
      marker.showFlag = false
    },
    infoWindowOpen(marker) {
      marker.showFlag = true
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
</style>

<style lang="scss" scoped>
  .app-container {
    height: 100%;
    overflow: auto;
  }
  .unit {
    position: relative;
    margin: -1px 40px 0 100px;
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
