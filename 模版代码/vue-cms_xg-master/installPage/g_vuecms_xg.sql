/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : g_vuecms_xg

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 26/08/2023 17:02:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for g_active_page
-- ----------------------------
DROP TABLE IF EXISTS `g_active_page`;
CREATE TABLE `g_active_page`  (
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活跃页面',
  `pageUrl` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '页面地址',
  `ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录ip',
  `browser` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `os` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `pageName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '页面名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1742 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_active_page
-- ----------------------------

-- ----------------------------
-- Table structure for g_art_column
-- ----------------------------
DROP TABLE IF EXISTS `g_art_column`;
CREATE TABLE `g_art_column`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章栏目',
  `columnName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '栏目名称',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_art_column
-- ----------------------------

-- ----------------------------
-- Table structure for g_art_content_file
-- ----------------------------
DROP TABLE IF EXISTS `g_art_content_file`;
CREATE TABLE `g_art_content_file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章内容文件列表',
  `fileName` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文件名',
  `type` int(11) NULL DEFAULT NULL COMMENT '类型      1图片 2文件 3视频',
  `status` int(11) NULL DEFAULT 1 COMMENT '状态      1临时(定时任务可删除) 2已保存(不可删除)',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_art_content_file
-- ----------------------------

-- ----------------------------
-- Table structure for g_art_list
-- ----------------------------
DROP TABLE IF EXISTS `g_art_list`;
CREATE TABLE `g_art_list`  (
  `artName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章名称',
  `artColumnId` int(11) NULL DEFAULT NULL COMMENT '文章栏目id',
  `artSortId` int(11) NULL DEFAULT NULL COMMENT '文章类型id',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章列表',
  `artKey` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章关键词，以逗号隔开',
  `artDesc` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章描述',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '显示状态    1.显示，2.不显示',
  `sort` int(11) NULL DEFAULT 1 COMMENT '排序',
  `visitNum` int(11) NULL DEFAULT 1 COMMENT '访问量',
  `picId` int(11) NULL DEFAULT NULL COMMENT '图片id',
  `originalUrl` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '原始路径',
  `artContentId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章内容文件id',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `artContent` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_art_list
-- ----------------------------

-- ----------------------------
-- Table structure for g_art_sort
-- ----------------------------
DROP TABLE IF EXISTS `g_art_sort`;
CREATE TABLE `g_art_sort`  (
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章类型',
  `artSortName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型名称',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_art_sort
-- ----------------------------

-- ----------------------------
-- Table structure for g_dic_data
-- ----------------------------
DROP TABLE IF EXISTS `g_dic_data`;
CREATE TABLE `g_dic_data`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典数据',
  `remark` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `dictId` int(11) NOT NULL COMMENT '字典id',
  `dictValue` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典键值',
  `dictLabel` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典标签',
  `listClass` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典键值',
  `dictSort` tinyint(4) NULL DEFAULT 1 COMMENT '字典数据排序',
  `status` enum('2','1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '状态 1启用 2停用',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_dic_data
-- ----------------------------
INSERT INTO `g_dic_data` VALUES (3, NULL, 4, '1', '显示', 'primary', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (4, NULL, 4, '2', '不显示', 'warning', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (5, NULL, 3, '1', '男', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (6, NULL, 3, '2', '女', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (7, NULL, 3, '3', '未知', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (8, NULL, 6, '1', '成功', 'primary', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (9, NULL, 6, '2', '失败', 'danger', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (10, '11111', 7, '1', '新增', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (11, '22222', 7, '4', '修改', 'info', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (12, '33333', 7, '2', '删除', 'danger', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (13, '444', 7, '6', '授权', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (14, NULL, 7, '7', '导出', 'info', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (15, NULL, 7, '8', '导入', 'info', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (16, NULL, 7, '9', '强退', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (17, NULL, 7, '10', '生成代码', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (18, NULL, 7, '11', '清空数据', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (20, NULL, 5, '1', '正常', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (21, NULL, 5, '2', '停用', 'danger', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (22, NULL, 7, '3', '查询', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (23, NULL, 7, '5', '其他', 'warning', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (24, NULL, 8, '1', '消息通知', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (25, NULL, 8, '2', '通知公告', NULL, 2, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (26, NULL, 9, '1', '正常', NULL, 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (27, NULL, 9, '2', '关闭', 'danger', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (28, NULL, 10, '1', '已读', 'success', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (29, NULL, 10, '2', '未读', 'warning', 2, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (30, NULL, 11, '1', '在线', 'success', 1, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');
INSERT INTO `g_dic_data` VALUES (31, NULL, 11, '2', '离线', 'warning', 2, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:29');

-- ----------------------------
-- Table structure for g_dic_list
-- ----------------------------
DROP TABLE IF EXISTS `g_dic_list`;
CREATE TABLE `g_dic_list`  (
  `remark` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典',
  `dictType` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典类型',
  `dictName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典名称',
  `dictValue` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典值',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态 1启用 2停用',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_dic_list
-- ----------------------------
INSERT INTO `g_dic_list` VALUES ('性别列表', 3, 'sys_sex', '用户性别', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES ('菜单显示状态', 4, 'sys_show_status', '菜单状态', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES ('系统开关列表1', 5, 'sys_switches', '系统开关', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES ('系统中公共状态', 6, 'sys_common_status', '系统状态', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES ('登录状态列表', 7, 'sys_oper_type', '系统操作类型', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES ('通知类型列表', 8, 'sys_notice_type', '通知类型', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES ('11111', 9, 'sys_notice_status', '通知状态', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES (NULL, 10, 'sys_notify_status', '消息状态', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');
INSERT INTO `g_dic_list` VALUES ('用户登录状态', 11, 'sys_user_login_status', '登录状态', NULL, '1', '2023-07-07 14:28:16', '2023-08-08 15:40:28');

-- ----------------------------
-- Table structure for g_error_log
-- ----------------------------
DROP TABLE IF EXISTS `g_error_log`;
CREATE TABLE `g_error_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '异常日志',
  `requestUrl` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '请求Url',
  `requestIp` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求Ip',
  `requestMethod` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求方法 POST GET PUT DELETE等',
  `uid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `operationSystem` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `browser` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `isPcOrIphone` tinyint(4) NULL DEFAULT NULL COMMENT 'pc端还是无线端 1PC端 2无线端 3未知',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `errorDetail` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '错误详情',
  `requestParams` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '请求参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14697 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_error_log
-- ----------------------------

-- ----------------------------
-- Table structure for g_img_list
-- ----------------------------
DROP TABLE IF EXISTS `g_img_list`;
CREATE TABLE `g_img_list`  (
  `imgMidUrl` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图片路径中图片',
  `imgSmallUrl` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图片路径小图片',
  `imgSortId` int(11) NULL DEFAULT NULL COMMENT '图片类型Id',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片列表',
  `imgName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片名称',
  `sort` int(11) NULL DEFAULT 1 COMMENT '排序',
  `imgUrl` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '原图图片路径',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_img_list
-- ----------------------------

-- ----------------------------
-- Table structure for g_img_sort
-- ----------------------------
DROP TABLE IF EXISTS `g_img_sort`;
CREATE TABLE `g_img_sort`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片分类',
  `sortName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_img_sort
-- ----------------------------

-- ----------------------------
-- Table structure for g_ip_black_list
-- ----------------------------
DROP TABLE IF EXISTS `g_ip_black_list`;
CREATE TABLE `g_ip_black_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ip 黑名单',
  `ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_ip_black_list
-- ----------------------------

-- ----------------------------
-- Table structure for g_log_log
-- ----------------------------
DROP TABLE IF EXISTS `g_log_log`;
CREATE TABLE `g_log_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '操作列表',
  `ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '访问ip',
  `uid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `roleId` int(11) NULL DEFAULT NULL COMMENT '角色Id',
  `browser` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `operationSystem` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `isPcOrIphone` tinyint(4) NULL DEFAULT NULL COMMENT 'pc端还是无线端',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态 1成功 2失败',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2958 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of g_log_log
-- ----------------------------

-- ----------------------------
-- Table structure for g_menu_list
-- ----------------------------
DROP TABLE IF EXISTS `g_menu_list`;
CREATE TABLE `g_menu_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单列表',
  `pid` int(11) NOT NULL DEFAULT 0 COMMENT '父级id',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `menuType` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '菜单类型 1.目录，2.菜单，3.按钮',
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `visible` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '显示状态    1.显示，2.不显示',
  `isCache` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '是否缓存    1.缓存，2.不缓存',
  `menuName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单名称',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `perms` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限字符',
  `isFrame` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '是否外链    1.是，2.不是',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '菜单显示状态    1.显示，2.不显示',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_menu_list
-- ----------------------------
INSERT INTO `g_menu_list` VALUES (17, 0, 99, '1', NULL, 'system', '1', '1', '系统管理', 'system', NULL, '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (18, 17, 0, '2', 'system/menuList/index', 'menuList', '1', '2', '菜单列表', 'tree-table', 'system:menuList:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (20, 0, 1, '1', NULL, 'article', '1', '1', '文章管理', 'clipboard', NULL, '1', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (23, 17, 0, '2', 'system/dictList/index', 'dictList', '1', '1', '字典列表', 'dict', 'system:dictList:index', '1', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (24, 17, 0, '2', 'system/sysConfig/index', 'sysConfig', '1', '1', '系统设置', 'system', 'system:sysConfig:index', '1', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (25, 17, 0, '1', NULL, 'logManage', '1', '1', '日志管理', 'log', NULL, '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (26, 25, 0, '2', 'system/logManage/loginLog/index', 'loginLog', '1', '1', '登录日志', 'log', 'system:logManage:loginLog:index', '1', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (27, 25, 0, '2', 'system/logManage/operationLog/index', 'operationLog', '1', '1', '操作日志', 'operLog', 'system:logManage:operationLog:index', '1', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (30, 0, 2, '1', NULL, 'user', '1', '1', '用户管理', 'user', NULL, '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (31, 30, 0, '2', 'user/userList/index', 'userList', '1', '2', '用户列表', 'user', 'user:userList:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (32, 30, 0, '2', 'user/userRole/index', 'userRole', '1', '2', '角色列表', 'userRole', 'user:userRole:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (33, 20, 0, '2', 'article/articleList/index', 'articleList', '1', '2', '文章列表', 'article', 'article:articleList:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (34, 20, 0, '2', 'article/articleColumn/index', 'articleColumn', '1', '2', '文章栏目', 'column', 'article:articleColumn:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (35, 20, 0, '2', 'article/articleSort/index', 'articleSort', '1', '2', '文章分类', 'articleSort', 'article:articleSort:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (37, 0, 3, '1', NULL, 'pic', '1', '2', '图片管理', 'picture', NULL, '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (38, 37, 0, '2', 'pic/picSort/index', 'picSort', '1', '2', '图片分类', 'pictureSort', 'pic:picSort:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (39, 37, 0, '2', 'pic/picList/index', 'picList', '1', '2', '图片列表', 'picture', 'pic:picList:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (41, 33, 1, '3', NULL, NULL, '1', '2', '删除', NULL, 'article:articleList:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (42, 25, NULL, '2', 'system/logManage/errorLog/index', 'errorLog', '1', '2', '错误日志', 'bug', 'system:logManage:errorLog:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (43, 33, 1, '3', NULL, NULL, '1', '2', '多个删除', NULL, 'article:articleList:delMore', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (44, 33, 1, '3', NULL, NULL, '1', '2', '添加', NULL, 'article:articleList:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (45, 33, 1, '3', NULL, NULL, '1', '2', '编辑', NULL, 'article:articleList:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (46, 34, 1, '3', NULL, NULL, '1', '2', '添加', NULL, 'article:articleColumn:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (47, 34, 1, '3', NULL, NULL, '1', '2', '多个删除', NULL, 'article:articleColumn:delMore', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (48, 34, 1, '3', NULL, NULL, '1', '2', '编辑', NULL, 'article:articleColumn:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (49, 34, 1, '3', NULL, NULL, '1', '2', '删除', NULL, 'article:articleColumn:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (50, 35, 1, '3', NULL, NULL, '1', '2', '添加', NULL, 'article:articleSort:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (51, 35, 1, '3', NULL, NULL, '1', '2', '多个删除', NULL, 'article:articleSort:delMore', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (52, 35, 1, '3', NULL, NULL, '1', '2', '编辑', NULL, 'article:articleSort:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (53, 35, 1, '3', NULL, NULL, '1', '2', '删除', NULL, 'article:articleSort:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (54, 31, 1, '3', NULL, NULL, '1', '2', '添加', NULL, 'user:userList:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (55, 31, 1, '3', NULL, NULL, '1', '2', '删除', NULL, 'user:userList:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (56, 31, 1, '3', NULL, NULL, '1', '2', '编辑', NULL, 'user:userList:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (57, 31, 1, '3', NULL, NULL, '1', '2', '多个删除', NULL, 'user:userList:delMore', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (58, 32, 1, '3', NULL, NULL, '1', '2', '添加', NULL, 'user:userRole:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (59, 32, 1, '3', NULL, NULL, '1', '2', '多个删除', NULL, 'user:userRole:delMore', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (60, 32, 1, '3', NULL, NULL, '1', '2', '编辑', NULL, 'user:userRole:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (61, 32, 1, '3', NULL, NULL, '1', '2', '删除', NULL, 'user:userRole:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (62, 39, 1, '3', NULL, NULL, '1', '2', '添加', NULL, 'pic:picList:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (63, 39, 1, '3', NULL, NULL, '1', '2', '编辑', NULL, 'pic:picList:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (64, 39, 1, '3', NULL, NULL, '1', '2', '删除', NULL, 'pic:picList:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (65, 38, 1, '3', NULL, NULL, '1', '2', '添加', NULL, 'pic:picSort:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (67, 38, NULL, '3', NULL, NULL, '1', '2', '编辑', NULL, 'pic:picSort:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (68, 38, NULL, '3', NULL, NULL, '1', '2', '删除', NULL, 'pic:picSort:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (69, 18, NULL, '3', NULL, NULL, '1', '2', '添加', NULL, 'system:menuList:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (70, 18, NULL, '3', NULL, NULL, '1', '2', '展开/折叠', NULL, 'system:menuList:toggleExpandAll', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (71, 18, NULL, '3', NULL, NULL, '1', '2', '编辑', NULL, 'system:menuList:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (72, 18, NULL, '3', NULL, NULL, '1', '2', '添加子级', NULL, 'system:menuList:addChild', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (73, 18, NULL, '3', NULL, NULL, '1', '2', '删除', NULL, 'system:menuList:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (74, 23, NULL, '3', NULL, NULL, '1', '2', '添加', NULL, 'system:dictList:add', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (75, 23, NULL, '3', NULL, NULL, '1', '2', '多个删除', NULL, 'system:dictList:delMore', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (76, 23, NULL, '3', NULL, NULL, '1', '2', '编辑', NULL, 'system:dictList:edit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (78, 23, NULL, '3', NULL, NULL, '1', '2', '删除', NULL, 'system:dictList:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (79, 42, NULL, '3', NULL, NULL, '1', '2', '删除', NULL, 'system:logManage:errorLog:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (80, 42, NULL, '3', NULL, NULL, '1', '2', '清空', NULL, 'system:logManage:errorLog:empty', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (81, 26, NULL, '3', NULL, NULL, '1', '2', '删除', NULL, 'system:logManage:loginLog:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (82, 26, NULL, '3', NULL, NULL, '1', '2', '清空', NULL, 'system:logManage:loginLog:clean', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (83, 27, NULL, '3', NULL, NULL, '1', '2', '删除', NULL, 'system:logManage:operationLog:del', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (84, 27, NULL, '3', NULL, NULL, '1', '2', '清空', NULL, 'system:logManage:operationLog:clean', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (85, 27, NULL, '3', NULL, NULL, '1', '2', '导出', NULL, 'system:logManage:operationLog:leadingOut', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (86, 17, 5, '1', NULL, 'msgManage', '1', '2', '消息管理', 'bell', NULL, '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (87, 86, NULL, '2', 'system/msgManage/notify/index', 'notify', '1', '2', '消息通知', 'bell', 'system:msgManage:notify:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (88, 86, NULL, '2', 'system/msgManage/notice/index', 'notice', '1', '2', '通知公告', 'bell', 'system:msgManage:notice:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (89, 0, 5, '1', NULL, 'systemMonitor', '1', '2', '系统监控', 'monitor', NULL, '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (90, 89, 1, '2', 'systemMonitor/onlineUser/index', 'onlineUser', '1', '2', '在线用户', 'online', 'systemMonitor/onlineUser/index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (91, 89, NULL, '2', 'systemMonitor/statusMonitor/index', 'statusMonitor', '1', '2', '系统监控', 'redis', 'systemMonitor:statusMonitor:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (92, 90, NULL, '3', NULL, NULL, '1', '2', '强退', NULL, 'systemMonitor:onlineUser:exit', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (93, 17, NULL, '2', 'system/sysApi/index', 'sysApi', '1', '2', '系统文档', 'documentation', 'system:sysApi:index', '2', '1', '2023-07-07 14:28:14', '2023-08-08 15:40:28');
INSERT INTO `g_menu_list` VALUES (94, 33, 1, '3', NULL, NULL, '1', '2', '显示状态', NULL, 'article:articleList:displayStatus', '2', '1', '2023-08-25 15:59:31', '2023-08-25 15:59:31');
INSERT INTO `g_menu_list` VALUES (95, 31, 0, '3', NULL, NULL, '1', '2', '用户状态', NULL, 'user:userList:userStatus', '2', '1', '2023-08-25 16:32:08', '2023-08-25 16:32:08');

-- ----------------------------
-- Table structure for g_notice
-- ----------------------------
DROP TABLE IF EXISTS `g_notice`;
CREATE TABLE `g_notice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通知公告',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告标题',
  `noticeType` tinyint(4) NOT NULL COMMENT '公告类型',
  `createUid` int(11) NULL DEFAULT NULL COMMENT '创建人id',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '状态 1正常 2关闭',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_notice
-- ----------------------------

-- ----------------------------
-- Table structure for g_notify
-- ----------------------------
DROP TABLE IF EXISTS `g_notify`;
CREATE TABLE `g_notify`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '操作列表',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '2' COMMENT '消息通知状态 1已读 2未读 默认为2 已读后，顶部消息消失',
  `noticeId` int(11) NULL DEFAULT NULL COMMENT '公告id获取公告类型 如果没有就是自定义',
  `notifyUid` int(11) NULL DEFAULT NULL COMMENT '消息通知接收者uid',
  `sendNoticeUid` int(11) NULL DEFAULT NULL COMMENT '发送通知人uid',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告标题',
  `noticeType` tinyint(4) NOT NULL COMMENT '公告类型',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '消息通知内容 替换内容中{name} {price}等字眼',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_notify
-- ----------------------------

-- ----------------------------
-- Table structure for g_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `g_operation_log`;
CREATE TABLE `g_operation_log`  (
  `requestUrl` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '操作内容',
  `uid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '操作列表',
  `operationSystem` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `browser` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `isPcOrIphone` tinyint(4) NULL DEFAULT NULL COMMENT 'pc端还是无线端',
  `requestMethod` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求方法',
  `requestIp` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求Ip',
  `operationContent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户操作具体内容',
  `operationType` tinyint(4) NOT NULL COMMENT '操作类型 1添加 2删除 3查询 4修改 5其他',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '操作相应状态 1成功 2失败',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `respondParams` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '响应参数',
  `requestParams` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '请求参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 53286 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of g_operation_log
-- ----------------------------

-- ----------------------------
-- Table structure for g_role_list
-- ----------------------------
DROP TABLE IF EXISTS `g_role_list`;
CREATE TABLE `g_role_list`  (
  `remark` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '操作列表',
  `roleName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `menuIds` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单权限',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `perms` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限字符',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态 1启用 2停用',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_role_list
-- ----------------------------
INSERT INTO `g_role_list` VALUES (NULL, 1, '超级管理员', '20,33,41,34,35,30,31,32,37,38,39,17,18,23,24,25,42,26,27', NULL, 'admin', '1', '2023-07-07 14:28:14', '2023-07-07 14:28:15');
INSERT INTO `g_role_list` VALUES ('demo', 2, '角色1', '20,33,34,35,30,32,37,38,66,39,17,25,26,86,88', NULL, '111', '1', '2023-07-07 14:28:14', '2023-07-07 14:28:15');
INSERT INTO `g_role_list` VALUES (NULL, 3, '角色2', '20,33,41,34,35,30,31,32', NULL, '6t', '1', '2023-07-07 14:28:14', '2023-07-07 14:28:15');
INSERT INTO `g_role_list` VALUES (NULL, 4, '试用角色', '20,33,34,35,30,31,32,37,38,39,89,91,90,17,18,23,98,25,42,26,27,86,87,88', NULL, 'test', '1', '2023-08-25 11:36:05', '2023-08-25 11:36:05');

-- ----------------------------
-- Table structure for g_sys_config
-- ----------------------------
DROP TABLE IF EXISTS `g_sys_config`;
CREATE TABLE `g_sys_config`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统配置',
  `key` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作内容',
  `desc` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `value` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_sys_config
-- ----------------------------
INSERT INTO `g_sys_config` VALUES (1, 'BASE_SETTING', '系统基础配置', '2023-07-07 14:28:14', '2023-08-08 15:40:27', '{\"sysLogoId\":10,\"sysLogo\":\"/dev-api/static/img/Middle1693036181668.png\",\"sysName\":\"vuecms\",\"sysStatus\":\"1\",\"sysIntro\":\"\",\"multipleLoginAccountsStatus\":\"2\"}');

-- ----------------------------
-- Table structure for g_user_list
-- ----------------------------
DROP TABLE IF EXISTS `g_user_list`;
CREATE TABLE `g_user_list`  (
  `roleId` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户列表',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话号码',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `originalPwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '原始密码',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `headImgId` int(11) NULL DEFAULT NULL COMMENT '头像图片id',
  `nickName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称 默认账号',
  `sex` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '3' COMMENT '性别 1男 2女 3未知',
  `status` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态 1启用 2停用',
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '通过jwt生成token，拿token里的过期时间判断是否在线，jwt生成添加电脑的唯一标识(mac)',
  `loginIp` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录ip',
  `loginBrowser` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `loginSystem` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `loginTime` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录时间',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `userType` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '账号类型 1测试类型 2正常类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_user_list
-- ----------------------------
INSERT INTO `g_user_list` VALUES (1, NULL, 1, 'test', NULL, NULL, 'gml1098155807', '8b1ffc4915c63aac4ceaefdf3e4dd546', 23, '1111', '3', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaXAiOiIxMjcuMC4wLjEiLCJpYXQiOjE2OTMwMjE1MjYsImV4cCI6MTY5MzA1NzUyNn0.nE49uNLW2_XA5KAS9f11wzF8L1v-0gFsL5bIVykJW8Q', '127.0.0.1', 'Chrome', 'windows', '1693021526000', '2023-07-07 14:28:13', '2023-08-09 09:42:09', '2');
INSERT INTO `g_user_list` VALUES (2, NULL, 19, 'vueCms1', NULL, NULL, 'vueCms1', '32e6f7e4acd7fdf025b801eb9f876431', NULL, '测试1号', '3', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXJuYW1lIjoidnVlQ21zMSIsImlwIjoiMTMuMTE0LjE2My4yMTkiLCJpYXQiOjE2OTE0ODExNzIsImV4cCI6MTY5MTUxNzE3Mn0.SdEJuBS1yqrRLx-BfirICPJDeRk96m85G5VZFb8G2Hc', '13.114.163.219', 'Chrome', 'windows', '1691481172000', '2023-07-07 14:28:13', '2023-07-07 14:28:13', '2');
INSERT INTO `g_user_list` VALUES (2, NULL, 20, 'vueCms2', NULL, NULL, 'vueCms2', '2d4920b4da3eeb24beeec5cf84f8db97', NULL, '测试2号', '3', '1', '', '127.0.0.1', 'Chrome', 'windows', '1691545088000', '2023-07-07 14:28:13', '2023-08-09 09:41:35', '2');
INSERT INTO `g_user_list` VALUES (2, NULL, 21, 'vueCms3', NULL, NULL, 'vueCms3', '1656e8a896480d6f536f972f1ba800a8', NULL, '测试3号', '3', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInVzZXJuYW1lIjoidnVlQ21zMyIsImlwIjoiMTA2LjM3LjkzLjEzMCIsImlhdCI6MTY5MTQ3ODI4NywiZXhwIjoxNjkxNTE0Mjg3fQ.XCgxIgykc4LXSR6abb0fMLT7UsuNxg0By_iQxiea3XQ', '106.37.93.130', 'Chrome', 'macOS', '1691478287000', '2023-07-07 14:28:13', '2023-07-07 14:28:13', '2');

-- ----------------------------
-- Table structure for g_user_sources
-- ----------------------------
DROP TABLE IF EXISTS `g_user_sources`;
CREATE TABLE `g_user_sources`  (
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活跃页面',
  `ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录ip',
  `browser` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `os` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `webUrl` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网络地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 237 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of g_user_sources
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
