radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        motor.motorStopAll()
    } else {
        for (let i = 0; i <= 3; i++) {
            parsecode(i, receivedNumber)
        }
    }
})
function controldevice (id: number, power: number) {
    actual_power = Math.max(power, list_power_min[id])
    if (list_power[id] != actual_power) {
        list_power[id] = actual_power
        led.plotBrightness(id, 0, actual_power)
        if (actual_power == 0) {
            if (id == 0) {
                motor.motorStop(motor.Motors.M1)
            } else if (id == 1) {
                motor.motorStop(motor.Motors.M2)
            } else if (id == 2) {
                motor.motorStop(motor.Motors.M3)
            } else if (id == 3) {
                motor.motorStop(motor.Motors.M4)
            }
        } else if (id == 0) {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, actual_power)
        } else if (id == 1) {
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, actual_power)
        } else if (id == 2) {
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, actual_power)
        } else if (id == 3) {
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, actual_power)
        }
    }
}
function parsecode (id: number, code: number) {
    if (Math.floor(code / 10 ** id) % 10 != 0) {
        controldevice(id, 255)
    } else {
        controldevice(id, 0)
    }
}
input.onButtonPressed(Button.A, function () {
    toggle_min_power(0)
})
input.onButtonPressed(Button.B, function () {
    toggle_min_power(3)
})
function toggle_min_power (id: number) {
    list_power_min[id] = 255 - list_power_min[id]
    led.plotBrightness(id, 1, list_power_min[id])
    controldevice(id, list_power_min[id])
}
let actual_power = 0
let list_power_min: number[] = []
let list_power: number[] = []
let Pump3MinPower = 0
motor.motorStopAll()
radio.setTransmitPower(7)
radio.setGroup(66)
list_power = [0, 0, 0, 0]
list_power_min = [0, 0, 0, 0]
