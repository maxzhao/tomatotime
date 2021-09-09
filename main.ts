// 番茄时长 25 到 60
// 
// 短休息 3 到 5
// 
// 长休息 15 到 30
function 显示符号时间 (时间: number) {
    if (上次绘制的时间 != 时间) {
        basic.clearScreen()
        for (let index = 0; index <= Math.idiv(时间, 10); index++) {
            led.plot(index, 0)
        }
        上次绘制的时间 = 时间
    }
}
input.onButtonPressed(Button.A, function () {
    if (全局阶段.compare("问候语") == 0) {
        led.stopAnimation()
    } else if (全局阶段.compare("设置") == 0) {
        if (局部阶段 == 0) {
            番茄时间长度 = 番茄时间长度 + 5
            if (番茄时间长度 > 60) {
                番茄时间长度 = 25
            }
        } else if (局部阶段 == 1) {
            短休息长度 = 短休息长度 + 1
            if (短休息长度 > 5) {
                短休息长度 = 3
            }
        } else if (局部阶段 == 2) {
            长休息长度 = 长休息长度 + 5
            if (长休息长度 > 30) {
                长休息长度 = 15
            }
        }
    } else {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    if (全局阶段.compare("问候语") == 0) {
        led.stopAnimation()
    } else if (全局阶段.compare("设置") == 0) {
        局部阶段 += 1
    } else {
    	
    }
})
function 初始化状态 () {
    // 全局和局部阶段为 ：
    // 问候语
    // 设置
    // >0: 设置番茄时间长度
    // >1: 设置短休息长度
    // >2: 设置长休息长度
    全局阶段 = "问候语"
    局部阶段 = 0
    番茄时间长度 = 25
    短休息长度 = 3
    长休息长度 = 15
    上次绘制的时间 = -1
}
let 长休息长度 = 0
let 短休息长度 = 0
let 番茄时间长度 = 0
let 局部阶段 = 0
let 上次绘制的时间 = 0
let 全局阶段 = ""
初始化状态()
basic.showString("Tomato Clock")
全局阶段 = "设置"
basic.forever(function () {
    while (全局阶段.compare("设置") == 0) {
        basic.pause(100)
    }
    basic.showString("SetTime")
})
control.inBackground(function () {
    while (true) {
        if (全局阶段.compare("设置") == 0) {
            if (局部阶段 == 0) {
                显示符号时间(番茄时间长度)
            } else if (局部阶段 == 1) {
                显示符号时间(短休息长度)
            } else if (局部阶段 == 2) {
                显示符号时间(长休息长度)
            }
        }
    }
})
