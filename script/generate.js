const fsex = require('fs-extra');
const path = require('path')
const progress = require('process')
const classSchedule = require('../app/model/classSchedule.json')
const weekImages = require('../app/model/photo.json')

// console.log(progress.argv)
const type = progress.argv[2]
const allType = {
    text: 'text',
    mark: 'mark'
}

if (!type) {
    throw new Error('请输入模板类型')
}
const template = type === allType.text ?
    fsex.readFileSync(path.resolve(__dirname, '../alertTemplate/taskText.schedule'), { encoding: 'utf8' }) :
    fsex.readFileSync(path.resolve(__dirname, '../alertTemplate/taskMark.schedule'), { encoding: 'utf8' })
let index = 0;
for (let s of classSchedule) {
    let time = s.timeline.match(/([0-9]+):([0-9]+)/);
    let hour = time[1] < 10 ? time[1].replace(/0/, '') : time[1];
    let minute = time[2] < 10 ? time[2].replace(/0/, '') : time[2];
    minute = Number(minute)
    hour = Number(hour)
    if (hour === 24) {
        hour = 0
    }
    // 提前提醒时间
    let before = 0;
    if (minute >= before) {
        minute = minute - before
    } else {
        minute = minute + 60 - before
        hour = hour === 0 ? 24 - 1 : hour - 1
    }
    console.log('week', s.week, 'hour', hour, 'minute', minute);
    const name = s.name;
    const timeline = s.timeline
    const classRoom = s.classRoom
    const className = s.className
    const teacher = s.teacher
    const weekimage = weekImages[s.week - 1]
    const displayHour = hour >= 10 ? hour : `0${hour}`
    const displayMinute = minute >= 10 ? minute : `0${minute}`

    const data = type === allType.text ?
        {
            cron: `'0 ${minute} ${hour} * * ${s.week}'`,
            className: `Task${index}`,
            content: `'已经${displayHour}:${displayMinute}了，${timeline}就要上课了，在${classRoom}上${className}课，老师是${teacher}'`
        } :
        {
            cron: `'0 ${minute} ${hour} * * ${s.week}'`,
            className: `Task${index}`,
            title: `'还有${before}分钟，就上课了！'`,
            text: `'#### 上课了！ \\n> 已经${displayHour}:${displayMinute}了，${timeline}就要上课了，在${classRoom}上${className}课，老师是${teacher}\\n> ![week](${weekimage})\\n'`
        }

    let outtemplate = template
    Object.keys(data).forEach(item => {
        // /{{([\s\S]+)}}/g
        let reg = new RegExp(`{{(\\s*${item}\\s*)}}`, 'g')
        outtemplate = outtemplate.replace(reg, data[item])
    })
    fsex.writeFileSync(path.resolve(__dirname, `../app/schedule/${name}.js`), outtemplate)
    index++;
}








