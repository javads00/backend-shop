export enum UserRole {
  user = "user",
  admin = "admin",
  sub_admin = "sub_admin",
}

////error_login_sms نبودن لاگین با شماره
export enum HandelStatusCodeError {
  "error_login_sms" = "error_login_sms",
}

export enum GenderEnum {
  male = "male",
  female = "female",
}

export enum StatusEnum {
  pending = "pending",
  accepted = "accepted",
  failed = "failed",
}

export enum AuthEnum {
  phone = "phone",
  google = "google",
}

export enum roomName {
  drPi = "drPi",
  online = "online",
}

export enum PermissionEnum {
  ///1888
  request1888 = "request1888",
  requestList1888 = "requestList1888",
  report1888 = "report1888",
  statistic1888 = "statistic1888",
  search1888 = "search1888",
  reminder1888 = "reminder1888",
  sms1888 = "sms1888",
  statisticSoot1888 = "statisticSoot1888",
  reportSoot1888 = "reportSoot1888",
  ivr1888 = "ivr1888",
  searchSoot1888 = "searchSoot1888",
  smsSoot1888 = "smsSoot1888",
  sootzani1888 = "sootzani1888",
  requestSoot1888 = "requestSoot1888",
  requestSms137 = "requestSms137",
  contact137 = "contact137",
  requestSms1888 = "requestSms1888",
  contact1888 = "contact1888",
  ivr137 = "ivr137",
  requestDelete1888 = "requestDelete1888",

  ////setttiing
  departmentSettings = "departmentSettings",
  permissionsGroupsSettings = "permissionsGroupsSettings",
  newsSettings = "newsSettings",
  subjectsSettings = "subjectsSettings",
  subjectGroupsSettings = "subjectGroupsSettings",
  subjectLevelSettings = "subjectLevelSettings",
  subjectsSettings1888 = "subjectsSettings1888",
  subjectGroupsSettings1888 = "subjectGroupsSettings1888",
  subjectLevelSettings1888 = "subjectLevelSettings1888",
  nowStatusDashboard = "nowStatusDashboard",
  analyticsDashboard = "analyticsDashboard",
  growthChartDashboard = "growthChartDashboard",
  createUserSetting = "createUserSetting",
  // 137
  request137 = "request137",
  requestList137 = "requestList137",
  report137 = "report137",
  statistic137 = "statistic137",
  search137 = "search137",
  sms137 = "sms137",
  reminder137 = "reminder137",
  service_137 = "service_137",
  service_1888 = "service_1888",
  dashboard = "dashboard",
  settings = "settings",
  menu = "menu",
  service_pasmand = "service_pasmand",
  assessment1888 = "assessment1888",
  assessment137 = "assessment137",
  requestDelete137 = "requestDelete137",
  servicePhone = "servicePhone",
  servicePhone1888 = "servicePhone1888",

  ///payments
  payment = "payment",
  paymentList = "paymentList",

  // pasmand
  statisticPasmand = "statisticPasmand",
  searchPasmand = "searchPasmand",
  requestPasmand = "requestPasmand",
  learnPasmand = "learnPasmand",
  driverPasmand = "driverPasmand",
  questionPasmand = "questionPasmand",
  categoryPasmand = "categoryPasmand",
  sliderPasmand = "sliderPasmand",
  createDriverPasmand = "createDriverPasmand",
  pasmandAdvancedSearch = "pasmandAdvancedSearch",
  showDriverPasmand = "showDriverPasmand",
  pasmandTiming = "pasmandTiming",
  pasmandStatistics = "pasmandStatistics",
  reportPassmand = "reportPassmand",

  ////pyfit
  service_pyfit = "service_pyfit",
  categoryPyfit = "categoryPyfit",
  create_admin_pyfit = "create_admin_pyfit",
  userPyfit = "userPyfit",
  gymPyfit = "gymPyfit",
  service_role = "service_role",
  service_facilities = "service_facilities",
  sliderPyfit = "sliderPyfit",
  service_coach = "service_coach",
  service_category_sport = "service_category_sport",
  service_confirmation_image_nationalCode = "service_confirmation_image_nationalCode",

  ///wallet
  service_wallet = "service_wallet",
  walletCreate = "walletCreate",
  walletTransaction = "walletTransaction",
  walletTransactionDriver = "walletTransactionDriver",
  walletCashRequest = "walletCashRequest",
  walletAdminsTransaction = "walletAdminsTransaction",
}
