/*
 Navicat Premium Data Transfer

 Source Server         : issold
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : 47.100.186.27:3306
 Source Schema         : storelightdb

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 29/07/2019 20:38:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for alarm_info
-- ----------------------------
DROP TABLE IF EXISTS `alarm_info`;
CREATE TABLE `alarm_info`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `alarmType` int(11) NOT NULL COMMENT '告警类型',
  `alarmTitle` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '预警标题',
  `alarmContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '预警内容',
  `alarmTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '预警时间',
  `alarmUserId` int(20) NOT NULL COMMENT '预警发送用户工号',
  `comeFromUserId` int(20) NULL DEFAULT NULL,
  `readFlag` int(11) NOT NULL DEFAULT 0 COMMENT '读取标识;0--未读；1--已读',
  `dealFlag` int(11) NULL DEFAULT 0 COMMENT '处理标识；0--未处理；1--已处理',
  `systemCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `alarm_info_ibfk_1`(`alarmType`) USING BTREE,
  INDEX `alarm_info_ibfk_2`(`alarmUserId`) USING BTREE,
  INDEX `alarm_info_ibfk_3`(`comeFromUserId`) USING BTREE
   
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for alarm_role
-- ----------------------------
DROP TABLE IF EXISTS `alarm_role`;
CREATE TABLE `alarm_role`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `alarmType` int(20) NOT NULL COMMENT '报警类型',
  `alarmUserId` int(20) NOT NULL COMMENT '定制报警用户ID',
  `alarmGroupId` int(20) NULL DEFAULT NULL COMMENT '定制报警组别ID（报警权限控制到租的时候用）',
  `systemCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `alarm_role_ibfk_1`(`alarmType`) USING BTREE
   
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for alarm_type
-- ----------------------------
DROP TABLE IF EXISTS `alarm_type`;
CREATE TABLE `alarm_type`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `alarmTypeName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '报警名称',
  `alarmTypeDesc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '报警描述',
  `systemCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_ex_alarmtype`(`alarmTypeName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for area_stype_classify
-- ----------------------------
DROP TABLE IF EXISTS `area_stype_classify`;
CREATE TABLE `area_stype_classify`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `areasTypeName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域类型',
  `areasTypeDesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '区域类型描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cell_goods_lock_info
-- ----------------------------
DROP TABLE IF EXISTS `cell_goods_lock_info`;
CREATE TABLE `cell_goods_lock_info`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `cellId` int(11) NOT NULL COMMENT '单元格id',
  `goodsId` int(11) NOT NULL,
  `goodsUnit` int(11) NOT NULL COMMENT '单位id',
  `colourId` int(11) NOT NULL,
  `cellLockTime` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `goodsLockNum` double(20, 2) NOT NULL COMMENT '锁定货物数量',
  `lockOrderId` int(11) NOT NULL COMMENT '锁定的领料详情单Id',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `cell_goods_lock_info_ibfk_1`(`cellId`) USING BTREE,
  INDEX `cell_goods_lock_info_ibfk_2`(`goodsId`) USING BTREE,
  INDEX `cell_goods_lock_info_ibfk_3`(`goodsUnit`) USING BTREE,
  INDEX `cell_goods_lock_info_ibfk_4`(`lockOrderId`) USING BTREE,
  INDEX `cell_goods_lock_info_ibfk_5`(`colourId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cell_type
-- ----------------------------
DROP TABLE IF EXISTS `cell_type`;
CREATE TABLE `cell_type`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `cellType` int(11) NULL DEFAULT NULL COMMENT '单元格类型',
  `cellTypeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '单元格类型名称',
  `cellTypeDesc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '单元格类型描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cell_type_contain
-- ----------------------------
DROP TABLE IF EXISTS `cell_type_contain`;
CREATE TABLE `cell_type_contain`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `cellId` int(11) NOT NULL COMMENT '单元格类型id',
  `goodsStoreMode` int(11) NOT NULL COMMENT '货物存放方式id',
  `maxGoodsNum` double NOT NULL COMMENT '货物基准单位容量(1个此类型单元格存放货物类型的基准单位数量)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `fk_ctc_storeMode_cellid`(`cellId`, `goodsStoreMode`) USING BTREE,
  INDEX `fk_ctc_cellId`(`cellId`) USING BTREE,
  INDEX `fk_ctc_storeMode`(`goodsStoreMode`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 97 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for check_out_goods
-- ----------------------------
DROP TABLE IF EXISTS `check_out_goods`;
CREATE TABLE `check_out_goods`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `containerGoodsId` int(11) NOT NULL,
  `requisitionInfosId` int(11) NOT NULL,
  `goodsStatus` int(11) NOT NULL DEFAULT 0,
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `check_out_goods_ibfk_1`(`containerGoodsId`) USING BTREE,
  INDEX `check_out_goods_ibfk_2`(`requisitionInfosId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for colour
-- ----------------------------
DROP TABLE IF EXISTS `colour`;
CREATE TABLE `colour`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `colourCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '颜色代码',
  `colourName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '颜色名称',
  `colourDesc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '颜色描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_colourCode`(`colourCode`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for consolidation_certificate
-- ----------------------------
DROP TABLE IF EXISTS `consolidation_certificate`;
CREATE TABLE `consolidation_certificate`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `consolidationCertificateCode` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '盘整凭证编号',
  `consolidationDate` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '盘整日期',
  `createUserId` int(11) NOT NULL COMMENT '创建盘整凭证号的的用户Id',
  `containerId` int(11) NOT NULL COMMENT '货架Id',
  `areaId` int(11) NOT NULL COMMENT '区域Id',
  `storeId` int(11) NOT NULL COMMENT '仓库Id',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_consolidationCertificateCode`(`consolidationCertificateCode`) USING BTREE,
  INDEX `consolidation_certificate_ibfk_1`(`createUserId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for container
-- ----------------------------
DROP TABLE IF EXISTS `container`;
CREATE TABLE `container`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `containerCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货柜编号',
  `containerName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货柜名称',
  `areaId` int(11) NOT NULL COMMENT '所属区域',
  `avalible` int(11) NOT NULL DEFAULT 0 COMMENT '启用状态(0:启用;1:未启用)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `container_ibfk_1`(`containerCode`) USING BTREE,
  INDEX `fk_areaId`(`areaId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for container_cell
-- ----------------------------
DROP TABLE IF EXISTS `container_cell`;
CREATE TABLE `container_cell`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `cellCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货柜单元名称',
  `cellName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货柜单元名称',
  `cellTypeId` int(11) NOT NULL COMMENT '货柜单元类型',
  `containerId` int(11) NOT NULL COMMENT '所属货柜',
  `avalible` int(11) NOT NULL DEFAULT 0 COMMENT '启用状态(0:启用;1:未启用)',
  `storeMethod` int(11) NOT NULL DEFAULT 0 COMMENT '存放货物方式(0：任意存放;1：指定类型存放;2：混合存放)',
  `goodsType` int(11) NOT NULL DEFAULT 0 COMMENT '存放货物类型(0：任意;非0:指定的货物存放类型)【已弃用】',
  `goodsSaveFlag` int(11) NOT NULL DEFAULT 0 COMMENT '货物存放标记(0：未存放货物；1：已存放(未满)；2：已存放(已满))',
  `goodsStoreMode` int(11) NULL DEFAULT NULL,
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `container_cell_ibfk_4`(`cellCode`) USING BTREE,
  INDEX `fk_containerId`(`containerId`) USING BTREE,
  INDEX `fk_cellTypeId`(`cellTypeId`) USING BTREE,
  INDEX `container_cell_ibfk_3`(`goodsStoreMode`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 118 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for container_goods
-- ----------------------------
DROP TABLE IF EXISTS `container_goods`;
CREATE TABLE `container_goods`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `cellId` int(11) NOT NULL COMMENT '货柜单元id',
  `goodsId` int(11) NOT NULL COMMENT '货物id',
  `goodsUnit` int(11) NOT NULL DEFAULT 0 COMMENT '货物存放单位(0:缺省/基准单位；非0：其他单位)',
  `goodsNum` double(20, 2) NOT NULL COMMENT '货物存放数量',
  `goodsWeight` double(20, 2) NULL DEFAULT NULL COMMENT '商品重量',
  `inStoreTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '货物入库时间',
  `isContainer` int(11) NOT NULL,
  `parentId` int(11) NULL DEFAULT NULL,
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_containerGoods_cellId`(`cellId`) USING BTREE,
  INDEX `fk_containerGoods_goodsId`(`goodsId`) USING BTREE,
  INDEX `fk_containerGoods_goodUnit`(`goodsUnit`) USING BTREE,
  INDEX `container_goods_ibfk_4`(`parentId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `customerCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '客户编号',
  `customerName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '客户名称',
  `customerAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '客户地址',
  `contactMan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '客户联系人',
  `contactPhone` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '客户联系电话',
  `ContactDuty` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '客户联系人职务',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编码',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for customer_order
-- ----------------------------
DROP TABLE IF EXISTS `customer_order`;
CREATE TABLE `customer_order`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `customerOrderCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '客户订单编码',
  `orderType` int(11) NOT NULL COMMENT '订单类型',
  `orderNums` double(11, 0) NOT NULL COMMENT '订单出库数量',
  `orderAmount` double(20, 2) NOT NULL COMMENT '订单出库总金额',
  `arrivalNums` double(11, 0) NULL DEFAULT NULL COMMENT '实际出库数量',
  `arrvalAmount` double(20, 2) NULL DEFAULT NULL COMMENT '实际出库金额',
  `orderStatus` int(11) NOT NULL COMMENT '订单状态：0完全未出库 1已部分出库 2完全出库',
  `customerId` int(11) NOT NULL COMMENT '客户id',
  `deliveryTime` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '制单时间',
  `operatorId` int(11) NOT NULL COMMENT '制单人员工号',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UQ_customerOrder_customerOrderCode`(`customerOrderCode`) USING BTREE,
  INDEX `fk_customerOrder_orderType`(`orderType`) USING BTREE,
  INDEX `fk_customerOrder_customerId`(`customerId`) USING BTREE,
  INDEX `fk_customerOrder_operatorId`(`operatorId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `deviceCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '设备编码',
  `deviceName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '设备名称',
  `deviceDesc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '设备描述',
  `deviceStatus` int(11) NOT NULL COMMENT '设备状态（0：可用 1：不可用2:空闲 3：忙碌 4其他）',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UQ_device_deviceCode`(`deviceCode`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `goodsCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物编号',
  `goodsName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物名称',
  `goodsTypeId` int(11) NOT NULL DEFAULT 0 COMMENT '货物类型',
  `goodsTypeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品类型代码',
  `goodsBatches` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货物批次',
  `goodsSpecification` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货物规格/型号',
  `goodsFabrics` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货物面料',
  `goodsWashWeight` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货物水洗后克重',
  `goodsWashWidth` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '水洗后有效门幅',
  `goodsUnitConsumption` double(20, 3) NULL DEFAULT NULL COMMENT '货物单耗(kg)',
  `goodsWastage` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货物损耗(百分比)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_goodscode_goodsspecification`(`goodsCode`, `goodsSpecification`) USING BTREE,
  INDEX `fk_goods_goodsTypeCode`(`goodsTypeCode`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 867 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods_consolidation
-- ----------------------------
DROP TABLE IF EXISTS `goods_consolidation`;
CREATE TABLE `goods_consolidation`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `consolidationCertificateId` int(11) NOT NULL COMMENT '盘点凭证id',
  `containerGoodsId` int(11) NOT NULL COMMENT '货物库存表id',
  `goodsId` int(11) NOT NULL COMMENT '货物id',
  `goodsCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物编码',
  `goodsName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物名称',
  `goodsSpecification` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '规格|型号',
  `goodsFabrics` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物面料',
  `colourId` int(11) NOT NULL COMMENT '颜色ID',
  `colourName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '颜色名称',
  `goodsParchasePrice` double(20, 2) NOT NULL COMMENT '货物采购单价',
  `goodsArrialPrice` double(20, 2) NOT NULL COMMENT '货物实际到货单价',
  `goodsWeighingPrice` double(20, 2) NOT NULL COMMENT '货物加权平均价',
  `goodsUnitId` int(11) NOT NULL COMMENT '货物单位id',
  `goodsUnitName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '单位名称',
  `storeModeId` int(11) NOT NULL COMMENT '存储方式id',
  `modeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '存储方式',
  `goodsNum` double NOT NULL COMMENT '盘前数量',
  `adjustGoodsNum` double NOT NULL COMMENT '盘后数量(开始盘整时，默认与盘前数量一致)',
  `adjust` double NOT NULL COMMENT '差额(默认为0.0)',
  `unitConvertion` double NOT NULL COMMENT '单位换算关系',
  `goodsWeight` double(24, 2) NOT NULL COMMENT '货物重量',
  `adjustReason` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '调整原因',
  `rejectReason` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '驳回原因',
  `checkPerson` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '审核人|复盘人',
  `inStoreTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '货物入库时间',
  `rfId` int(11) NOT NULL COMMENT 'rfid序号',
  `rfIdCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'rfid编号',
  `barCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '条形码',
  `cellId` int(11) NOT NULL COMMENT '单元格号',
  `cellCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货柜单元格的编号',
  `cellName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '单元格名称',
  `containerId` int(11) NOT NULL COMMENT '货架单元格号',
  `containerCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货柜单元格编码',
  `containerName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货架单元格名称',
  `areaId` int(11) NOT NULL COMMENT '区域号',
  `areaCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域编码',
  `areaName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域名称',
  `storeId` int(11) NOT NULL COMMENT '仓库名称',
  `storeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库编号',
  `storeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库名称',
  `flag` int(11) NOT NULL DEFAULT 1 COMMENT '0:审批通过；1:录入状态，未审批；2:审批未通过',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `goods_consolidation_ibfk_1`(`consolidationCertificateId`) USING BTREE,
  INDEX `goods_consolidation_ibfk_2`(`containerGoodsId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods_consolidation_check
-- ----------------------------
DROP TABLE IF EXISTS `goods_consolidation_check`;
CREATE TABLE `goods_consolidation_check`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `goodsId` int(11) NOT NULL COMMENT '货物id',
  `goodsCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物编码',
  `cellId` int(11) NOT NULL COMMENT '单元格号',
  `cellCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货柜单元格的编号',
  `cellName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '单元格名称',
  `containerId` int(11) NOT NULL COMMENT '货架单元格号',
  `containerCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货柜单元格编码',
  `containerName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货架单元格名称',
  `areaId` int(11) NOT NULL COMMENT '区域号',
  `areaCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域编码',
  `areaName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域名称',
  `storeId` int(11) NOT NULL COMMENT '仓库名称',
  `storeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库编号',
  `storeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库名称',
  `goodsName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物名称',
  `goodsPrice` double NOT NULL COMMENT '货物单价(基准单位下的价格)',
  `maxGoodsNum` double NOT NULL COMMENT '单元格最大容量',
  `goodsNum` double NOT NULL COMMENT '系统原有数量',
  `adjustGoodsNum` double NOT NULL COMMENT '调整后的数量',
  `adjust` double NOT NULL COMMENT '调整额度',
  `adjustReason` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `rejectReason` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '驳回原因',
  `inStoreTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '货物入库时间',
  `flag` int(11) NOT NULL DEFAULT 0 COMMENT '0:录入状态，未审批；1:审批通过；2:审批未通过',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods_operator
-- ----------------------------
DROP TABLE IF EXISTS `goods_operator`;
CREATE TABLE `goods_operator`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `goodsId` int(11) NOT NULL COMMENT '货物id',
  `operatorType` int(11) NOT NULL DEFAULT 0 COMMENT '操作类型',
  `oriCellCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '原货柜单元编号',
  `curCellCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '当前货柜单元编号',
  `operatorTime` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '操作时间',
  `operatorId` int(11) NOT NULL COMMENT '操作人员id',
  `goodsUnitId` int(255) NULL DEFAULT NULL,
  `goodsNum` double NULL DEFAULT NULL,
  `goodsWeight` double NULL DEFAULT NULL,
  `rfId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'rfid',
  `otherDescribe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_operatorTime_rfid`(`operatorTime`, `rfId`) USING BTREE,
  INDEX `fk_operator_goodsId`(`goodsId`) USING BTREE,
  INDEX `fk_operator_opId`(`operatorId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 90 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for good_stype
-- ----------------------------
DROP TABLE IF EXISTS `good_stype`;
CREATE TABLE `good_stype`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `goodsType` int(11) NOT NULL DEFAULT 0 COMMENT '货物类型(0:未区分；1:主料；2:辅料)',
  `goodsTypeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品类型代码',
  `goodsTypeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物类型名称',
  `goodsTypeDesc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货物类型描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_goodsTypeCode`(`goodsTypeCode`) USING BTREE,
  INDEX `fk_goodstype_goodsType`(`goodsType`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 866 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods_type_classify
-- ----------------------------
DROP TABLE IF EXISTS `goods_type_classify`;
CREATE TABLE `goods_type_classify`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `goodsTypeName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `goodsTypeDesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_goodsTypeName`(`goodsTypeName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods_unit
-- ----------------------------
DROP TABLE IF EXISTS `goods_unit`;
CREATE TABLE `goods_unit`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `goodsStoreMode` int(11) NOT NULL COMMENT '货物类型',
  `goodsUnit` int(11) NOT NULL DEFAULT 0 COMMENT '货物单位(0：为该类货物基准单位；非0：其他单位)',
  `goodsUnitName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '货物单位名称',
  `unitDesc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '单位换算描述',
  `unitConvertion` double NOT NULL DEFAULT 1 COMMENT '单位换算关系(表示1个配置单位占标准单位的数量)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_goodsUnit_modeUnit`(`goodsStoreMode`, `goodsUnit`) USING BTREE,
  INDEX `goodsStoreMode`(`goodsStoreMode`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `groupName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户组名称',
  `groupDesc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户组描述',
  `groupApproval` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '组用户审批权限(0：无审批权限；1：有审批权限)',
  `storeIds` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '组用户可操控的仓库列表',
  `groupRole` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'app端的权限控制按钮的Tag值作为唯一标识，以逗号隔开',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编码（系统分配）',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_groupName`(`groupName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for inits
-- ----------------------------
DROP TABLE IF EXISTS `inits`;
CREATE TABLE `inits`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `cellId` int(11) NULL DEFAULT 0 COMMENT '自增主键',
  `cellCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货柜单元名称',
  `cellName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货柜单元名称',
  `cellTypeId` int(255) NULL DEFAULT NULL,
  `containerId` int(11) NULL DEFAULT NULL COMMENT '所属货柜',
  `avalible` int(11) NULL DEFAULT 0 COMMENT '启用状态(0:启用;1:未启用)',
  `goodsSaveFlag` int(11) NULL DEFAULT 0 COMMENT '货物存放标记(0：未存放货物；1：已存放(未满)；2：已存放(已满))',
  `storeMethod` int(11) NULL DEFAULT 0 COMMENT '存放货物方式(0：任意存放;1：指定类型存放;2：混合存放)',
  `goodsType` int(11) NULL DEFAULT 0 COMMENT '存放货物类型(0：任意;非0:指定的货物存放类型)',
  `goodsStoreMode` int(11) NULL DEFAULT NULL COMMENT '货物存放方式id',
  `maxGoodsNum` double NULL DEFAULT NULL COMMENT '货物基准单位容量(1个此类型单元格存放货物类型的基准单位数量)',
  `modeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `goodsNum` double NULL DEFAULT 0,
  `surplus` double NULL DEFAULT NULL,
  `containerCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '区域编号',
  `containerName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '区域名称',
  `areaId` int(11) NULL DEFAULT NULL COMMENT '所属区域',
  `areaCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '区域编号',
  `areaName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '区域名称',
  `storeId` int(11) NULL DEFAULT NULL COMMENT '所属仓库',
  `storeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '仓库编号',
  `storeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '仓库名称',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lock_goods_info
-- ----------------------------
DROP TABLE IF EXISTS `lock_goods_info`;
CREATE TABLE `lock_goods_info`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `goodsId` int(11) NOT NULL,
  `goodsUint` int(11) NOT NULL,
  `colourId` int(11) NOT NULL,
  `goodsLockNum` double(20, 2) NOT NULL COMMENT '锁定货物数量',
  `lockTime` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `lockType` int(11) NOT NULL COMMENT '0为正常锁定 1为临时锁定',
  `lockInfoId` int(11) NOT NULL COMMENT '客户订单数据表ID',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `lock_goods_info_ibfk_2`(`goodsId`) USING BTREE,
  INDEX `lock_goods_info_ibfk_3`(`goodsUint`) USING BTREE,
  INDEX `lock_goods_info_ibfk_1`(`lockInfoId`) USING BTREE,
  INDEX `lock_goods_info_ibfk_4`(`colourId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `menuCode` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单编号',
  `menuName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单名称(页面显示名称)',
  `parentMenuId` int(11) NOT NULL DEFAULT -1 COMMENT '父菜单id',
  `menuUrl` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '菜单Url链接(父菜单为空)',
  `menuDisplay` int(11) NOT NULL DEFAULT 0 COMMENT '菜单是否可见(0:可见；1：不可见)',
  `avalible` int(11) NOT NULL COMMENT '是否有效(0：有效；1：禁用)',
  `menuDesc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '菜单描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_menuCode`(`menuCode`) USING BTREE,
  UNIQUE INDEX `idx_menuName`(`menuName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_type
-- ----------------------------
DROP TABLE IF EXISTS `order_type`;
CREATE TABLE `order_type`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `orderTypeParentId` int(11) NOT NULL COMMENT '父类型id：1入库订单 2出库订单',
  `orderTypeParentName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '父类型名称',
  `orderTypeCode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单类型编码',
  `orderTypeName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单类型名称',
  `orderTypeDescribe` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '订单类型描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UQ_orderType_orderTypeCode`(`orderTypeCode`) USING BTREE,
  INDEX `orderTypeParentId`(`orderTypeParentId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for purchase_goods_infos
-- ----------------------------
DROP TABLE IF EXISTS `purchase_goods_infos`;
CREATE TABLE `purchase_goods_infos`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `orderId` int(11) NOT NULL COMMENT '订单编号id',
  `goodsId` int(11) NOT NULL COMMENT '静态商品id',
  `goodStoreMode` int(11) NOT NULL COMMENT '货物存储方式',
  `colourId` int(11) NOT NULL COMMENT '颜色id',
  `goodsUnitId` int(11) NOT NULL,
  `goodsParchaseNum` double(20, 0) NOT NULL COMMENT '货物采购数量',
  `goodsParchasePrice` double(20, 2) NOT NULL COMMENT '货物采购价格(根据货物基准单位计算的价格)',
  `goodsArrivalNum` double(20, 0) NULL DEFAULT NULL COMMENT '实际到货数量',
  `goodsArrialPrice` double(20, 2) NULL DEFAULT NULL COMMENT '货物实际价格',
  `goodsWeighingPrice` double(20, 2) NULL DEFAULT NULL COMMENT '加权平均价',
  `goodsNotArrivalNum` double(20, 2) NULL DEFAULT NULL COMMENT '未到货物数量',
  `goodsStatus` int(11) NOT NULL COMMENT '货物在库状态：0不冻结 1暂冻结 2已占用',
  `inputStatus` int(11) NOT NULL COMMENT '货物入库状态（0:未入库1：部分入库2：完全入库）',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_goods_colourId`(`colourId`) USING BTREE,
  INDEX `fk_goods_storeMode`(`goodStoreMode`) USING BTREE,
  INDEX `goods_orderId`(`orderId`) USING BTREE,
  INDEX `purchase_goods_infos_ibfk_5`(`goodsId`) USING BTREE,
  INDEX `purchase_goods_infos_ibfk_1`(`goodsUnitId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for purchase_order
-- ----------------------------
DROP TABLE IF EXISTS `purchase_order`;
CREATE TABLE `purchase_order`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `purchaseOrderCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '采购订单号',
  `storageType` int(11) NOT NULL COMMENT '入库类型',
  `orderNums` double(11, 0) NOT NULL COMMENT '采购数量',
  `orderAmount` double(20, 2) NOT NULL COMMENT '采购订单总金额',
  `arrivalNums` double(11, 0) NULL DEFAULT NULL COMMENT '实际到货数量',
  `arrvalAmount` double(20, 2) NULL DEFAULT NULL COMMENT '实际到货金额',
  `supplierId` int(11) NOT NULL COMMENT '供应商id',
  `contractCode` int(11) NULL DEFAULT NULL COMMENT '合同号',
  `orderStatus` int(11) NOT NULL COMMENT '订单状态：0完全未入库 1部分入库 2完全入库',
  `customerOrderId` int(20) NULL DEFAULT NULL COMMENT '客户订单id',
  `purchaseTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '采购日期',
  `operatorId` int(11) NOT NULL COMMENT '操作人工号',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UQ_purchaseorder_purchaseOrderCode`(`purchaseOrderCode`) USING BTREE,
  INDEX `fk_purchaseorder_supplierId`(`supplierId`) USING BTREE,
  INDEX `fk_purchaseorder_operatorId`(`operatorId`) USING BTREE,
  INDEX `FK_purchaseorder_storageType`(`storageType`) USING BTREE,
  INDEX `fk_purchaseorder_customerOrderId`(`customerOrderId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for quality_checking
-- ----------------------------
DROP TABLE IF EXISTS `quality_checking`;
CREATE TABLE `quality_checking`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `infosId` int(11) NOT NULL COMMENT '商品数据id',
  `returnGoodNums` double(20, 0) NOT NULL COMMENT '退货数量',
  `returnReason` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '质检退货原因',
  `workingArea` int(11) NOT NULL COMMENT '存储区',
  `operatorId` int(11) NOT NULL COMMENT '质检人员工号',
  `checkingTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '检查时间',
  `backSalesId` int(11) NULL DEFAULT NULL,
  `backSalesTime` timestamp(0) NULL DEFAULT NULL,
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_qualitychecking_orderId`(`infosId`) USING BTREE,
  INDEX `fk_qualitychecking_operatorId`(`operatorId`) USING BTREE,
  INDEX `quality_checking_backSalesId`(`backSalesId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rf_infos
-- ----------------------------
DROP TABLE IF EXISTS `rf_infos`;
CREATE TABLE `rf_infos`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `rfid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'rfid数字码',
  `barCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '条形码',
  `status` int(11) NOT NULL COMMENT '绑定情况（0：未被绑定 1：已被绑定 3:其他）',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `barCode`(`barCode`) USING BTREE,
  UNIQUE INDEX `rfid`(`rfid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 139 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `groupId` int(11) NOT NULL COMMENT '用户组id',
  `menuId` int(11) NOT NULL COMMENT '菜单id',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编码(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_role_groupId`(`groupId`) USING BTREE,
  INDEX `fk_role_menuId`(`menuId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 228 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for stock_record
-- ----------------------------
DROP TABLE IF EXISTS `stock_record`;
CREATE TABLE `stock_record`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `containerGoodsId` int(11) NOT NULL COMMENT '库存总表id',
  `recordTime` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '查询记录时间',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_stockrecord_containerGoodsId`(`containerGoodsId`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `storeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库编号',
  `storeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库名称',
  `storeType` int(11) NULL DEFAULT 0 COMMENT '仓库类型(为空的时候为混合)',
  `storeAddress` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库地址',
  `avalible` int(11) NOT NULL DEFAULT 0 COMMENT '启用状态(0:启用;1:未启用)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_storeCode`(`storeCode`) USING BTREE,
  INDEX `store_ibfk_1`(`storeType`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for store_copy1
-- ----------------------------
DROP TABLE IF EXISTS `store_copy1`;
CREATE TABLE `store_copy1`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `storeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库编号',
  `storeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库名称',
  `storeType` int(11) NULL DEFAULT 0 COMMENT '仓库类型(为空的时候为混合)',
  `storeAddress` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库地址',
  `avalible` int(11) NOT NULL DEFAULT 0 COMMENT '启用状态(0:启用;1:未启用)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_storeCode`(`storeCode`) USING BTREE,
  INDEX `store_ibfk_1`(`storeType`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for store_copy2
-- ----------------------------
DROP TABLE IF EXISTS `store_copy2`;
CREATE TABLE `store_copy2`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `storeCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库编号',
  `storeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库名称',
  `storeType` int(11) NULL DEFAULT 0 COMMENT '仓库类型(为空的时候为混合)',
  `storeAddress` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '仓库地址',
  `avalible` int(11) NOT NULL DEFAULT 0 COMMENT '启用状态(0:启用;1:未启用)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_storeCode`(`storeCode`) USING BTREE,
  INDEX `store_ibfk_1`(`storeType`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for store_area
-- ----------------------------
DROP TABLE IF EXISTS `store_area`;
CREATE TABLE `store_area`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `areaCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域编号',
  `areaName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域名称',
  `areaType` int(11) NOT NULL DEFAULT 0 COMMENT '仓库区域类型',
  `storeId` int(11) NOT NULL COMMENT '所属仓库',
  `avalible` int(11) NOT NULL DEFAULT 0 COMMENT '启用状态(0:启用;1:未启用)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `store_area_ibfk_3`(`areaCode`) USING BTREE,
  INDEX `fk_storeId`(`storeId`) USING BTREE,
  INDEX `store_area_ibfk_2`(`areaType`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for store_mode
-- ----------------------------
DROP TABLE IF EXISTS `store_mode`;
CREATE TABLE `store_mode`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `modeName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '存储方式名称',
  `modeDesc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '存储方式描述',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编码(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_modeName`(`modeName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for stores_requisition_infos
-- ----------------------------
DROP TABLE IF EXISTS `stores_requisition_infos`;
CREATE TABLE `stores_requisition_infos`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `storesRequisitionId` int(11) NOT NULL COMMENT '领料单id',
  `goodsId` int(11) NOT NULL COMMENT '货物id',
  `goodsUnitId` int(11) NOT NULL COMMENT '货物单位',
  `colourId` int(11) NOT NULL,
  `goodsNum` double(20, 2) NOT NULL COMMENT '货物数量',
  `goodsRealNum` double(20, 2) NULL DEFAULT 0.00,
  `goodsWeight` double(20, 2) NULL DEFAULT NULL COMMENT '货物重量',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_storesRequisitioninfos_goodsId`(`goodsId`) USING BTREE,
  INDEX `fk_storesRequisitioninfos_storesRequisitionId`(`storesRequisitionId`) USING BTREE,
  INDEX `stores_requisition_infos_ibfk_4`(`goodsUnitId`) USING BTREE,
  INDEX `stores_requisition_infos_ibfk_5`(`colourId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for stores_requisition_order
-- ----------------------------
DROP TABLE IF EXISTS `stores_requisition_order`;
CREATE TABLE `stores_requisition_order`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `storesRequisitionCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '领料单号',
  `orderType` int(11) NOT NULL,
  `orderNums` double(11, 0) NULL DEFAULT NULL,
  `orderAmount` double(20, 2) NULL DEFAULT NULL,
  `arrivalNums` double(11, 0) NULL DEFAULT NULL,
  `arrvalAmount` double(20, 2) NULL DEFAULT NULL,
  `customerOrderId` int(11) NOT NULL COMMENT '客户订单id',
  `contractCode` int(20) NULL DEFAULT NULL,
  `orderStates` int(11) NOT NULL COMMENT '领料单状态（0为未生成领料详情单1为生成领料详情单）',
  `deployTime` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '采购日期',
  `operatorId` int(11) NOT NULL COMMENT '操作人工号',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `fk_storesRequisitionorder_storesRequisitionCode`(`storesRequisitionCode`) USING BTREE,
  INDEX `fk_storesRequisitionorder_customerOrderId`(`customerOrderId`) USING BTREE,
  INDEX `stores_requisition_order_ibfk_2`(`operatorId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for submeter_container_goods
-- ----------------------------
DROP TABLE IF EXISTS `submeter_container_goods`;
CREATE TABLE `submeter_container_goods`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `infosId` int(11) NULL DEFAULT NULL COMMENT '采购商品数据详情id',
  `containerGoodsId` int(11) NULL DEFAULT NULL COMMENT '货物存放信息表id',
  `singleGoodsWeight` double(20, 2) NOT NULL COMMENT '单个货物重量',
  `rfId` int(11) NOT NULL COMMENT 'rfId',
  `workingArea` int(11) NOT NULL,
  `transportStates` int(11) NOT NULL COMMENT '运输工具',
  `deviceId` int(11) NULL DEFAULT NULL COMMENT '运输设备id',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编号(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_submetercontainergoods_containerGoodsId`(`containerGoodsId`) USING BTREE,
  INDEX `fk_submetercontainergoods_rfId`(`rfId`) USING BTREE,
  INDEX `fk_submetercontainergoods_infosId`(`infosId`) USING BTREE,
  INDEX `fk_submetercontainergoods_deviceId`(`deviceId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `supplierCode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '厂商代码',
  `supplierName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '厂商名称',
  `supplierAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '厂商地址',
  `contactMan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '厂商联系人(如有多个，逗号隔开)',
  `contactPhone` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '厂商联系电话(与contactMan字段对应，逗号隔开)',
  `ContactDuty` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '厂商联系人职务(与contactMan字段对应，逗号隔开)',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编码',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UQ_supplier_supplierCode`(`supplierCode`) USING BTREE
) ENGINE = InnoDB   CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_log
-- ----------------------------
DROP TABLE IF EXISTS `user_log`;
CREATE TABLE `user_log`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `userId` int(11) NOT NULL COMMENT '用户id',
  `loginTime` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '登录时间',
  `logoutTime` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '退录时间',
  `operatorAction` int(11) NOT NULL COMMENT '操作动作（0:用户登录；1:用户手工退录；2:用户自动退录）',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编码(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_userlog_userId`(`userId`) USING BTREE

) ENGINE = InnoDB   CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
  `userCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户号',
  `userSex` int(11) NOT NULL DEFAULT 0 COMMENT '用户性别(0:男性；1：女性)',
  `userName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户姓名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '88888888' COMMENT '用户密码',
  `userGroupId` int(11) NOT NULL,
  `createDate` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `avalible` int(11) NOT NULL DEFAULT 0 COMMENT '是否有效(0:启用；1：禁用)',
  `contactPhone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮箱地址',
  `systemCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统编码(系统分配)',
  `sort` int(11) NOT NULL COMMENT '显示次序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_userCode`(`userCode`) USING BTREE,
  INDEX `fk_usergroupId`(`userGroupId`) USING BTREE
   
) ENGINE = InnoDB   CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
