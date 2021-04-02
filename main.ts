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
    }
    if (receivedNumber % 10 != 0) {
        controldevice(1, 255)
    } else {
        controldevice(1, 0)
    }
    if (Math.floor(receivedNumber / 10) % 10 != 0) {
        controldevice(2, 255)
    } else {
        controldevice(2, 0)
    }
    if (Math.floor(receivedNumber / 100) % 10 != 0) {
        controldevice(3, 255)
    } else {
        controldevice(3, 0)
    }
    if (Math.floor(receivedNumber / 1000) % 10 != 0) {
        controldevice(4, 255)
    } else {
        controldevice(4, 0)
    }
})
function controldevice (id: number, power: number) {
    if (power == 0) {
        led.unplot(id - 1, 0)
    } else {
        led.plot(id - 1, 0)
    }
    if (power == 0) {
        if (id == 1) {
            motor.motorStop(motor.Motors.M1)
        } else if (id == 2) {
            motor.motorStop(motor.Motors.M2)
        } else if (id == 3) {
            motor.motorStop(motor.Motors.M3)
        } else if (id == 4) {
            motor.motorStop(motor.Motors.M4)
        }
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
motor.motorStopAll()
radio.setTransmitPower(7)
radio.setGroup(66)
