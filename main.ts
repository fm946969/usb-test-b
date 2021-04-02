input.onButtonPressed(Button.A, function () {
    controldevice(1, 255)
    basic.pause(1000)
    controldevice(2, 255)
    basic.pause(1000)
    controldevice(3, 255)
    basic.pause(1000)
    controldevice(4, 255)
    basic.pause(5000)
    controldevice(1, 0)
    basic.pause(1000)
    controldevice(2, 0)
    basic.pause(1000)
    controldevice(3, 0)
    basic.pause(1000)
    controldevice(4, 0)
    basic.pause(1000)
    controldevice(1, 255)
    controldevice(2, 255)
    controldevice(3, 255)
    controldevice(4, 255)
    basic.pause(5000)
    controldevice(0, 0)
})
function controldevice (id: number, power: number) {
    if (power <= 0) {
        led.unplot(id, 0)
    } else {
        led.plot(id, 0)
    }
    if (id == 0) {
        motor.motorStopAll()
    } else if (id == 1) {
        motor.MotorRun(motor.Motors.M1, motor.Dir.CW, power)
    } else if (id == 2) {
        motor.MotorRun(motor.Motors.M2, motor.Dir.CW, power)
    } else if (id == 3) {
        motor.MotorRun(motor.Motors.M3, motor.Dir.CW, power)
    } else if (id == 4) {
        motor.MotorRun(motor.Motors.M4, motor.Dir.CW, power)
    }
}
radio.onReceivedValue(function (name, value) {
    let list: string[] = []
    if (list.indexOf(name) >= 1) {
        controldevice(list.indexOf(name), value)
    } else {
        motor.motorStopAll()
    }
})
let text_list = ["Off", "Led", "Pump1", "Pump2", "Pump3"]
motor.motorStopAll()
radio.setGroup(66)
