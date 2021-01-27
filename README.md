# Alert 课程提醒模板

## 提醒效果
![效果](https://images.gitee.com/uploads/images/2021/0127/151545_3b9ad42a_2056918.png)
## 目录介绍
```
./alertTemplate
提醒模板目录

./app/model
数据模板

结构如下:
[{
        "name": "tesk1",
        "timeline": "8:00",
        "week": "1",
        "classRoom": "101教室",
        "className": "设计模式",
        "teacher": "教师"
    },
    {
        "name": "tesk2",
        "timeline": "9:00",
        "week": "1",
        "classRoom": "102教室",
        "className": "设计模式",
        "teacher": "教师"
    }
]

./app/schedule
生成定时文件在这里

./config/config.default.js
钉钉机器人Webhook配置文件

  const userConfig = {
    dingdingUrl: '钉钉机器人Webhook'
  };

./script/generate.js
生成定时文件的脚本

./script/clean.js
清除定时文件的脚本

其他目录功能见egg官网
```
## 使用

```
npm run go
```

默认启动[mark](https://developers.dingtalk.com/document/app/develop-enterprise-internal-robots/title-mno-3qd-5f9)模板

同样可以使用[text](https://developers.dingtalk.com/document/app/develop-enterprise-internal-robots/title-mno-3qd-5f9)模板

[开启钉钉机器人步骤](https://developers.dingtalk.com/document/app/custom-robot-access)

