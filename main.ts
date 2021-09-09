function 等待阶段结束 (阶段Str: string) {
    while (阶段Str.compare("设置") == 0) {
        basic.pause(100)
    }
}
// 番茄时长 25 到 60
// 
// 短休息 3 到 5
// 
// 长休息 15 到 30
function 显示符号时间 (时间m: number, 闪烁b: boolean) {
    if (上次绘制的时间m != 时间m) {
        basic.clearScreen()
        绘图索引X = 0
        while (绘图索引X < Math.idiv(时间m - 1, 10)) {
            led.plot(绘图索引X, 0)
            绘图索引X += 1
        }
        临时值 = 0
        while (临时值 < 时间m - Math.idiv(时间m - 1, 10) * 10) {
            if (临时值 < 5) {
                绘图索引X = 临时值
                绘图索引Y = 3
            } else {
                绘图索引X = 临时值 % 5
                绘图索引Y = 4
            }
            led.plot(绘图索引X, 绘图索引Y)
            临时值 += 1
        }
        上次绘制的时间m = 时间m
    }
    if (闪烁b && 时间m > 0) {
        临时值 = Math.trunc(input.runningTime() / 500) % 2
        if (当前闪烁状态01 != 临时值) {
            if (当前闪烁状态01 == 0) {
                led.unplot(绘图索引X, 绘图索引Y)
            } else {
                led.plot(绘图索引X, 绘图索引Y)
            }
            当前闪烁状态01 = 临时值
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (全局阶段str.compare("问候语") == 0) {
        led.stopAnimation()
    } else if (全局阶段str.compare("设置") == 0) {
        if (局部阶段num == 0) {
            番茄时间长度m = 番茄时间长度m + 5
            if (番茄时间长度m > 60) {
                番茄时间长度m = 25
            }
        } else if (局部阶段num == 1) {
            短休息长度m = 短休息长度m + 1
            if (短休息长度m > 5) {
                短休息长度m = 3
            }
        } else if (局部阶段num == 2) {
            长休息长度m = 长休息长度m + 5
            if (长休息长度m > 30) {
                长休息长度m = 15
            }
        }
    } else {
    	
    }
})
function 进入倒计时 (阶段str: string, 时长m: number) {
    当前时段起始时间ms = input.runningTime()
    当前倒计时时间ms = 时长m * 60000
    while (全局阶段str.compare(阶段str) == 0) {
        basic.pause(100)
        if (局部阶段num == 0) {
            当前倒计时时间ms = 当前倒计时时间ms - (input.runningTime() - 当前时段起始时间ms)
            当前时段起始时间ms = input.runningTime()
            if (当前倒计时时间ms < 0) {
                设置当前阶段("倒计时结束")
            }
        }
    }
}
function 设置当前阶段 (阶段Str: string) {
    全局阶段str = 阶段Str
    局部阶段num = 0
}
input.onButtonPressed(Button.B, function () {
    if (全局阶段str.compare("问候语") == 0) {
        led.stopAnimation()
    } else if (全局阶段str.compare("设置") == 0) {
        局部阶段num += 1
        if (局部阶段num > 2) {
            设置当前阶段("工作倒计时")
        }
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
    // 工作倒计时
    // >0: 正常
    // >1: 暂停
    // 短时间倒计时
    // 长时间倒计时
    // 倒计时结束
    // 
    // 所有任务结束
    全局阶段str = "问候语"
    局部阶段num = 0
    番茄时间长度m = 25
    短休息长度m = 3
    长休息长度m = 15
    上次绘制的时间m = -1
    当前闪烁状态01 = 0
    番茄钟累积num = 0
}
let 番茄钟累积num = 0
let 当前倒计时时间ms = 0
let 当前时段起始时间ms = 0
let 长休息长度m = 0
let 短休息长度m = 0
let 番茄时间长度m = 0
let 局部阶段num = 0
let 全局阶段str = ""
let 当前闪烁状态01 = 0
let 绘图索引Y = 0
let 临时值 = 0
let 绘图索引X = 0
let 上次绘制的时间m = 0
初始化状态()
basic.showString("Tomato Clock")
设置当前阶段("设置")
basic.forever(function () {
    等待阶段结束("设置")
    while (全局阶段str.compare("所有任务结束") != 0) {
        进入倒计时("工作倒计时", 番茄时间长度m)
        番茄钟累积num += 1
        if (番茄钟累积num % 4 == 0) {
            设置当前阶段("长时间倒计时")
            进入倒计时("长时间倒计时", 长休息长度m)
        } else {
            设置当前阶段("短时间倒计时")
            进入倒计时("短时间倒计时", 短休息长度m)
        }
    }
    while (true) {
        basic.showString(" U Win:")
        basic.showString("" + (番茄钟累积num))
        basic.pause(10000)
    }
})
control.inBackground(function () {
    while (true) {
        if (全局阶段str.compare("设置") == 0) {
            if (局部阶段num == 0) {
                显示符号时间(番茄时间长度m, false)
            } else if (局部阶段num == 1) {
                显示符号时间(短休息长度m, false)
            } else if (局部阶段num == 2) {
                显示符号时间(长休息长度m, false)
            }
        } else if (全局阶段str.compare("工作倒计时") == 0) {
            if (局部阶段num == 0) {
                显示符号时间(Math.ceil(当前倒计时时间ms / 60000), true)
            } else if (局部阶段num == 1) {
            	
            }
        } else {
        	
        }
        control.waitMicros(10)
    }
})
