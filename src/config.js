export default {
  api: {
    baseUrl: "https://czgy.xmanju.com:5001",
    headers: {
      referer: `https://servicewechat.com/wx750913032d12da97/94/page-frame.html`,
      userAgent: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080710) XWEB/1191`,
    },
  },
  /*
    token会过期，过期后需要重新抓包获取
    所以建议在25号早上抓包获取token，已确保token在当天有效

    把这里的 token 替换为你抓包获取到的 token
  */
  token: "xxxx-xxxx-xxxx-xxxx",
  /* 
    projectI: 项目ID可选值
      园博: 6
      珩琦: 7

    houseTypeId: 房型ID可选值
      园博 一房一厅: 13
      园博 小单间: 11
      园博 厨房大单间: 12

      珩琦 一房一厅: 15
      珩琦 小单间: 14
      珩琦 厨房大单间: 20

    projectName: 项目名称可选值
      叩叩·园博社区
      叩叩·珩琦社区

    houseTypeName: 房型名称可选值
      一房一厅
      厨房大单间
      小单间

    将下面的 projectId、houseTypeId、projectName、houseTypeName 替换为你需要的房型和社区的值
  */
  waitRoom: {
    projectId: 6,
    houseTypeId: 13,
    projectName: "叩叩·园博社区",
    houseTypeName: "一房一厅",
  },
};
