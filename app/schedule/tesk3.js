const Subscription = require('egg').Subscription;
const classSchedule = require('../model/classSchedule.json')

class Task2 extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置

    /*
    https://eggjs.org/zh-cn/basics/schedule.html
    注意：cron-parser 支持可选的秒（linux crontab 不支持）。
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun) 其中 0、7 指周日，1 指周二，依次类推，6 指周六
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, optional)

    */
    static get schedule() {
        return {
            cron: '0 0 12 * * 3',
            type: 'worker', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
            console.log('开始执行定时任务')
            const res = await this.ctx.curl(this.app.config.dingdingUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    msgtype: 'markdown',
                    markdown: {
                        title: '还有0分钟，就上课了！',
                        text: '#### 上课了！ \n> 已经12:00了，12:00就要上课了，在103教室上设计模式课，老师是教师\n> ![week](https://images.gitee.com/uploads/images/2021/0127/093436_eb31b049_2056918.png)\n',
                    },
                },
            });

    }
}

module.exports = Task2;
