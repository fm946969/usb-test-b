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
    if (name.compare("control") == 0) {
        if (value == 0) {
            motor.motorStopAll()
        }
        if (value % 10 == 1) {
            controldevice(1, 255)
        } else {
            controldevice(1, 0)
        }
        if (value / 10 % 10 == 1) {
            controldevice(2, 255)
        } else {
            controldevice(2, 0)
        }
        if (value / 100 % 10 == 1) {
            controldevice(3, 255)
        } else {
            controldevice(4, 0)
        }
        if (value / 1000 % 10 == 1) {
            controldevice(4, 255)
        } else {
            controldevice(4, 0)
        }
    }
})
motor.motorStopAll()
radio.setGroup(66)
