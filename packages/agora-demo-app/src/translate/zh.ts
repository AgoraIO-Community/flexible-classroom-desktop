import { ErrorCodeMessage, ErrorCode } from '@app/utils/error';

export default {
  fcr_loading: '加载中...',
  home_product_name: '灵动课堂',
  home_greeting: '欢迎使用灵动课堂',
  home_form_field_room: '房间名',
  home_form_field_name: '用户名',
  home_form_field_role: '角色',
  home_form_field_type: '房间类型',
  home_form_field_duration: '时长',
  home_form_submit: '进入房间',
  home_form_placeholder_room_name: '请输入房间名称',
  home_form_placeholder_user_name: '请输入用户名',
  home_form_placeholder_user_role: '请选择角色',
  home_form_placeholder_room_type: '请选择教室类型',
  home_form_error_room_name_empty: '房间名不能为空',
  home_form_error_user_name_empty: '用户名不能为空',
  home_form_error_role_type_empty: '角色类型不能为空',
  home_form_error_room_type_empty: '房间类型不能为空',
  home_form_error_room_name_limit: '房间名为{min}-{max}位字符',
  home_form_error_user_name_limit: '用户名为{min}-{max}位字符',
  fcr_home_label_room_list_no_more: '已经到底了 🤐',
  fcr_logout_tips: '用户账号过期,稍后请重新登录',
  fcr_menu_sign_out: '登出',
  fcr_join_room_tips_ui_config_not_ready: 'UI 配置没准备好',
  fcr_join_room_tips_user_id_empty: '用户ID不能为空',
  fcr_join_room_tips_user_name_empty: '用户名不能为空',
  fcr_h5_invite_room_share_link_error: '无效的分享链接',
  fcr_create_tips_time_validate: '选择时间必须大于当前时间',
  fcr_create_tips_room_name: '请输入房间名称',
  fcr_create_more_settings_expand: '展开',
  fcr_create_room_current_time: '当前时间',
  fcr_create_tips_room_playback_link: '请输入你的录像地址',
  fcr_create_label_latency_type: '服务类型',
  fcr_create_room_tips_name_rule: '请输入字母，数字，汉字或者下划线',
  fcr_join_room_option_audience: '助教',
  fcr_join_room_label_role: '角色',
  fcr_join_room_tips_room_id_empty: '房间ID不能为空且必须为数字',
  fcr_join_room_tips_room_id: '请输入房间ID',
  fcr_join_room_button_join: '加入房间',
  fcr_share_tips_copy_all_fault: '房间信息复制失败',
  fcr_share_tips_copy_id_fault: '房间ID复制失败',
  fcr_share_tips_copy_all_success: '房间信息已经复制到剪贴',
  fcr_share_tips_copy_id_success: '房间ID已经复制到剪贴',
  fcr_api_tips_fetch_room_info_failed: '获取房间信息失败,请刷新页面或稍后重新尝试',
  fcr_h5_invite_hello: '您好!',
  // 2.8.0分割线
  fcr_create_label_room_name_empty: '房间名不能为空',
  fcr_share_label_copy_invitation: '你可以复制课堂邀请并发送给参加者',
  fcr_create_tips_starttime: '课堂开始时间必须晚于当前时间 ',
  fcr_industry_option_education: '教育',
  fcr_industry_option_entertainment: '娱乐',
  fcr_home_label_slogan: '轻松创建线上专属课堂',
  fcr_home_label_welcome_message: '欢迎使用灵动课堂',
  fcr_home_label_logo: '灵动课堂',
  fcr_home_label_roomlist: '房间列表',
  fcr_home_label_small_classroom: '小班课',
  fcr_home_label_lecture_hall: '大班课',
  fcr_home_label_proctoring: '在线监考',
  fcr_home_label_1on1: '1对1 ',
  fcr_home_button_create: '创建课堂',
  fcr_home_button_join: '加入房间',
  fcr_home_button_enter: '进入房间',
  fcr_home_button_replay: '回放',
  fcr_home_status_upcoming: '待开始',
  fcr_home_status_live: '进行中',
  fcr_home_status_over: '已结束',
  fcr_home_form_time: '2022-08-12,12:00-16:00',
  fcr_create_label_create_classroom: '创建房间',
  fcr_create_label_room_name: '房间名称',
  fcr_create_label_room_name_default: '{name}的房间',
  fcr_create_label_starttime: '开始时间',
  fcr_create_label_end_time: '结束时间',
  fcr_create_label_class_mode: '教学模式',
  fcr_create_label_more_settings: '更多设置',
  fcr_create_label_security: '安全防护',
  fcr_create_label_1on1_description: '适合1对1教学场景，老师和学生可以在课堂中自由的互动交流',
  fcr_create_label_small_classroom_description:
    '适合人数较少的互动教学场景，老师和学生可以自由的在台上交流',
  fcr_create_label_lecture_hall_description:
    '适合人数较多的单向教学场景，学员视频交流前需要进行上台申请 ',
  fcr_create_label_service_type_RTC: '无延迟-实时互动（RTC）',
  fcr_create_label_service_type_Standard: '轻延迟-极速直播',
  fcr_create_label_service_type_CDN: '标准延迟-CDN',
  fcr_create_label_latency_RTC: '延迟约400毫秒',
  fcr_create_label_latency_Standard: '延迟约1秒',
  fcr_create_label_latency_CDN: '延迟约6秒',
  fcr_create_label_watermark: '水印',
  fcr_create_label_playback: '录像直播',
  fcr_create_label_playback_description: '使用录像回放作为直播视频源',
  fcr_create_label_playback_link: '录像地址',
  fcr_create_label_default_time: '默认30分钟',
  fcr_h5create_label_small_classroom: '小班课堂',
  fcr_h5create_label_lecture_hall: '大班课堂',
  fcr_h5create_label_1on1: '1对1课堂',
  fcr_h5create_label_interactive: '实时互动',
  fcr_h5create_label_broadcast: '单向直播',
  fcr_create_tips_room_id: '输入房间名称',
  fcr_create_tips_create_success: '您已成功创建一个课堂',
  fcr_create_tips_create_failed: '创建课堂失败',
  fcr_create_tips_playback_link: '请输入录像地址',
  fcr_create_tips_playback_create_fail: '必须输入录像地址才可创建录像直播课',
  fcr_create_option_time_selector_Mon: '周一',
  fcr_create_option_time_selector_Tue: '周二',
  fcr_create_option_time_selector_Wed: '周三',
  fcr_create_option_time_selector_Thu: '周四',
  fcr_create_option_time_selector_Fri: '周五',
  fcr_create_option_time_selector_Sat: '周六',
  fcr_create_option_time_selector_Sun: '周日',
  fcr_create_button_create: '创建',
  fcr_create_button_cancel: '取消',
  fcr_share_label_room_id: '房间号',
  fcr_share_label_invitation:
    '邀请人 邀请你加入课堂课堂名称课堂时间： 开始时间--结束时间点击链接加入课堂：URL或复制课堂ID加入课堂 ： 课堂ID',
  fcr_share_button_: '复制全部',
  fcr_create_button_: '仅复制房间链接与房间ID',
  fcr_share_modal_label_room_name: 'xxx的课堂',
  fcr_share_modal_label_room_id: '房间ID',
  fcr_share_modal_button_share: '分享',
  fcr_join_room_label_join: '加入房间',
  fcr_join_room_label_RoomID: '房间号',
  fcr_join_room_label_name: '昵称',
  fcr_join_room_option_teacher: '老师',
  fcr_join_room_option_student: '学生',
  fcr_join_room_button_confirm: '加入',
  fcr_join_room_button_cancel: '取消',
  fcr_join_room_tips_name: '请输入昵称',
  fcr_join_room_tips_empty_id: '房间号不存在',
  fcr_join_room_tips_small_classroom: 'h5暂不支持小班课',
  fcr_join_room_tips_1on1: 'h5暂不支持1对1',
  fcr_join_room_tips_role: 'H5仅支持学生角色',
  fcr_share_link_label_welcome: '欢迎使用灵动课堂！',
  fcr_share_link_label_slogon: '灵动课堂',
  fcr_share_link_label_invitation: '邀请你加入',
  fcr_share_link_form_time: '13:10-13:40 2022-02-02   2022-02-02',
  fcr_share_link_tips_room_id: '房间ID已经复制到剪贴板',
  fcr_share_h5_tips_class_mode: 'H5仅支持大班课',
  fcr_share_h5_tips_role_teacher: 'H5仅支持老师角色',
  fcr_share_link_tips_name: '请输入昵称',
  fcr_past_label_past_classroom: '历史教室',
  fcr_past_label_room_ID: '房间号',
  fcr_past_label_type: '类型',
  fcr_past_label_type_no_history: '暂无记录',
  fcr_past_label_time: '时间',
  fcr_past_label_record: '课程录像',
  fcr_past_label_record_processing: '录像生成中',
  fcr_past_label_not_recorded: '未录制',
  fcr_past_link_Replay: '查看录像',
  fcr_past_link_attendance_tracking: '示例代码',
  fcr_past_link_engagement_tracking: '示例代码',
  fcr_past_tips_room_id: '请输入房间号',
  fcr_past_button_query: '查询',
  fcr_past_table_attendance_tracking_title: '学生出席追踪',
  fcr_past_table_engagement_tracking_title: '课程参与度追踪',
  fcr_past_table_column_student_name: '学生名',
  fcr_past_table_column_joined_time: '加入时间',
  fcr_past_table_column_time_in_class: '在线时间',
  fcr_past_table_column_raise_hand: '举手次数',
  fcr_past_table_column_correc: '答题正确次数',
  fcr_past_table_column_incorrect: '答题错误次数',
  fcr_past_table_column_Polling: '参与投票次数',
  fcr_past_table_column_reward: '奖励次数',

  // 补充
  [ErrorCodeMessage[ErrorCode.NETWORK_DISABLE]]: '网络连接错误，请稍后重新尝试!',
  [ErrorCodeMessage[ErrorCode.COURSE_HAS_ENDED]]: '当前课堂直播已经结束',
  [ErrorCodeMessage[ErrorCode.INVALID_ROOM_ID]]: '无效的房间ID',
  [ErrorCodeMessage[ErrorCode.INVALID_ROOM_INFO]]: '无效的房间信息',
  [ErrorCodeMessage[ErrorCode.ROOM_IS_ENDED]]: '当前房间直播已经结束',
  [ErrorCodeMessage[ErrorCode.INVALID_CLASS_MODE_H5]]: 'H5仅支持大班课',

  fcr_settings_setting: '设置',
  fcr_settings_option_general: '常规设置',
  fcr_settings_option_about_us: '关于我们',
  settings_logout: '退出登录',
  settings_logout_alert: '是否确认退出登录？',
  settings_nickname: '昵称设置',
  fcr_settings_label_region: '区域设置',
  fcr_settings_theme: '主题设置',
  fcr_settings_theme_light: '明亮',
  fcr_settings_theme_dark: '暗黑',
  fcr_settings_label_language: '语言设置',
  settings_close_account: '账号注销',
  fcr_settings_option_general_language_simplified: '简体中文',
  fcr_settings_option_general_language_traditional: '繁体中文',
  fcr_settings_option_general_language_english: 'English',
  fcr_settings_label_about_us_about_us: '关于我们',
  fcr_settings_link_about_us_privacy_policy: '隐私条例',
  fcr_settings_link_about_us_user_agreement: '用户协议',
  fcr_settings_label_about_us_fcr_ver: '灵动课堂版本',
  fcr_settings_label_about_us_sdk_ver: 'SDK版本',
  settings_disclaimer: '免责声明',
  settings_register: '注册声网账号',
  settings_publish_time: '发版时间',
  settings_logoff_detail: {
    1: '很遗憾，灵动课堂无法继续为您提供服务，感谢您一直以来的陪伴。确认账号注销后会产生以下效果：',
    2: '1.删除账号关联的课堂数据；',
    3: '2.删除账号及手机号信息；',
    4: '若需要再次使用请重新注册。',
  },

  settings_logoff_agreenment: '我已阅读并确认注销账号',
  settings_logoff_submit: '确认注销',
  settings_logoff_alert: '是否确认注销账号？',
  fcr_vocational_teacher_absent: '老师当前不在教室中',
  fcr_vocational_video_start_early_alert: '提前上课将立即播放课程录像，是否确认？',
  // legacy
  home: {
    form_title: '免费试用',
    roomId: 'roomId',
    roomId_placeholder: '请输入roomId',
    userId: 'userId',
    userId_placeholder: '请输入userId',
    roomName: '房间',
    roomName_placeholder: '请输入房间名',
    nickName: '昵称',
    nickName_placeholder: '请输入昵称',
    roomType: '类型',
    roomType_placeholder: '请选择课堂类型',
    serviceType: '服务',
    serviceType_placeholder: '请选择音视频服务',
    serviceType_premium: '实时互动（RTC）',
    serviceType_standard: '轻互动（极速直播）',
    serviceType_latency: '弱互动（CDN）',
    serviceType_mix: '混合服务（CDN&RTC）',
    serviceType_mix_stream_cdn: '合流转推',
    serviceType_hosting_scene: '伪直播',
    roomType_1v1: '1对1',
    roomType_interactiveSmallClass: '互动小班课',
    roomType_interactiveBigClass: '大班课',
    roomType_vocationalClass: '职教大班课',
    role: '角色',
    role_placeholder: '请选择你的角色',
    encryptionMode: '模式',
    encryptionMode_placeholder: '请选择加密模式',
    encryptionKey: '密匙',
    encryptionKey_placeholder: '请输入密钥',
    role_teacher: '老师',
    role_student: '学生',
    role_assistant: '助教',
    role_audience: '观众',
    role_observer: '监课',
    language: '语言：',
    language_placeholder: '请选择语言',
    duration: '时长',
    duration_unit: '分钟',
    enter_classroom: '进入教室',
    region_placeholder: '请选择区域',
    region: '区域：',
    'header-left-title': '声网灵动课堂',
    about: '关于',
    'input-error-msg': '只能输入6-50位字符(字母、数字)',
    'input-username-error-msg': '只能输入3-25位字符(文字、字母、数字、空格)',
    network_error: '当前网络异常，请稍后再试',
    'recordation-search': '课程回放',
    'recordation-tip': '只能查询1小时内的回放',
    replay: '回放',
    search: '查询',
    system_name: '声网灵动课堂',
  },
  'home-about': {
    'privacy-policy': '隐私条例',
    'product-disclaimer': '免责声明',
    'sign-up': '注册声网账号',
    'build-time': '构建时间',
    'sdk-version': 'SDK版本',
    'classroom-version': '灵动课堂版本',
    'commit-id': 'Commit ID',
    check: '查看',
    register: '注册',
  },
  disclaimer: {
    title: '免责声明',
    'content-a': `灵动课堂（“本产品”）是由上海兆言网络科技有限公司（“上海兆言”）提供的一款测试产品，上海兆言享有本产品的著作权和所有权。特此免费授予获得本产品和相关文档文件（以下简称“软件”）副本的任何人无限制地使用软件的权利，包括但不限于使用，复制，修改，合并，发布，分发，但本产品不得用于任何商业用途，不得再许可和/或出售该软件的副本。 `,
    'content-b': `本产品按“现状”提供，没有任何形式的明示担保，包括但不限于对适配性、特定目的的适用性和非侵权性的担保。无论是由于与本产品或本产品的使用或其他方式有关的任何合同、侵权或其他形式的行为，上海兆言均不对任何索赔、损害或其他责任负责。 `,
    'content-c': `您可以自由选择是否使用本产品提供的服务，如果您下载、安装、使用本产品中所提供的服务，即表明您信任该产品所有人，上海兆言对任何原因在使用本产品中提供的服务时可能对您自身或他人造成的任何形式的损失和伤害不承担任何责任。`,
  },
};
