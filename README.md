## 使用须知（必读）

使用脚本存在一定风险，如果你担心封号，那还是建议不要用自己的实名认证号尝试，但是根据目前已探明的叩叩封号规则，在发布此脚本的时间点使用本脚本理论上不会有封号的风险，实际应该也不会，我自己就是通过脚本抢到的号并入住。

找黄牛同样有风险，黄牛可能会拿到你的实名认证信息，比如你的身份证照片，所以请谨慎。比起找黄牛，使用本脚本的风险要小很多。而且还是免费的。

以下是已知的封号规制，使用前必须了解清楚：
1. 频繁发送等房请求会被封号，如果10秒内请求超过10次会被封号
2.  叩叩做了实名认证限制，一个身份证只能认证一个号，所以小号说无法认证成功的，用小号绕过实名认证直接请求等房的会被封号
3. 叩叩小程序里有一个机制，在发送等房请求的时候会在请求头中带上一个tsd字段，该字段是通过/api/base/sysWaitSetting/listpage请求获取到的等房配置的snowflake字段，这个字段无法通过前端计算得出来，应该是后台创建等房配置的时候系统生成的雪花id，如果这个字段和数据库中的字段不匹配会封号
4. 请求头的token和等房的用户token不一致会导致封号
5. 使用用户的token去调用后台的管理接口会导致封号

## **操作步骤**

1. 第一步你需要先下载本项目的源码
2. 抓包获取叩叩小程序的用户token，具体操作看“抓包步骤.pdf”
3. 安装Nodejs环境，这一步比较简单，打开Nodejs官网下载安装包并安装就可以了
4. 修改你需要的抢房信息，用任意文本编辑器打开源码的/scr/config.js文件，修改其中的token为你抓包获取到的token，以及waitroom字段内的社区和房型信息
5. 打开命令行，进入到源码目录，执行 `npm install` 安装依赖
6. 打开命令行执行 `npm run start` 或者 `node ./src/start.js` 即可运行抢号脚本

## **重要的事情**

如果你使用本脚本抢到了等房名额，那么请务必在不要在任何社交平台透露自己的排名信息，以免被举报封号。