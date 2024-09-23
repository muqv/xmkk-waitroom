import cron from "node-cron";
import {
  addSysOperationRenterAddLog,
  addWaitRoom,
  getTokenInfo,
  getWaitSetting,
} from "./api.js";
import config from "./config.js";

async function doAdd(request) {
  return addWaitRoom(request)
    .then(async (res) => {
      if (res.id) {
        console.log(
          `[${request.payload.name}]`,
          `[${request.payload.projectName} ${request.payload.houseTypeName}]`,
          "抢房成功"
        );
        await addSysOperationRenterAddLog(res.id, request.token);
        return Promise.resolve("success");
      }
      return Promise.reject("error");
    })
    .catch((error) => {
      console.error(
        "请求等房时错误:",
        request.payload.name,
        request.payload.projectName,
        request.payload.houseTypeName,
        error?.message || error?.toString()
      );
    });
}

async function doRequest() {
  const tokenInfo = await getTokenInfo(config.token);
  const settings = await getWaitSetting(config.token);

  const targetSetting = settings.find((setting) => {
    if (
      config.waitRoom.projectId == setting.projectIds &&
      config.waitRoom.houseTypeId == setting.houseTypeIds
    ) {
      return true;
    }
  });

  if (!targetSetting) {
    return console.error(
      "未找到对应的等房配置",
      config.waitRoom.projectName,
      config.waitRoom.houseTypeName
    );
  }

  const request = {
    payload: {
      type: 0,
      waitTime: targetSetting.waitTime,
      mobile: tokenInfo.info.mobile,
      renterId: tokenInfo.info.id,
      name: tokenInfo.info.realName,
      projectName: config.waitRoom.projectName,
      houseTypeName: config.waitRoom.houseTypeName,
      projectId: config.waitRoom.projectId,
      houseTypeId: config.waitRoom.houseTypeId,
    },
    token: config.token,
    snowflake: targetSetting.snowflake,
  };

  console.log("request: ", request);

  await doAdd(request);
}

async function main() {
  cron.schedule("* * 10 * * *", doRequest);
}

try {
  console.log("脚本已启动，将会在上午10点自动执行");
  await main();
} catch (error) {
  console.error("执行脚本时出错:", error);
}
