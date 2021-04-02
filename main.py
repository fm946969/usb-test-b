def on_received_number(receivedNumber):
    if receivedNumber == 0:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            """)
        motor.motor_stop_all()
    if receivedNumber % 10 != 0:
        controldevice(1, 255)
    else:
        controldevice(1, 0)
    if Math.floor(receivedNumber / 10) % 10 != 0:
        controldevice(2, 255)
    else:
        controldevice(2, 0)
    if Math.floor(receivedNumber / 100) % 10 != 0:
        controldevice(3, 255)
    else:
        controldevice(3, 0)
    if Math.floor(receivedNumber / 1000) % 10 != 0:
        controldevice(4, 255)
    else:
        controldevice(4, 0)
radio.on_received_number(on_received_number)

def controldevice(id: number, power: number):
    if power == 0:
        led.unplot(id - 1, 0)
    else:
        led.plot(id - 1, 0)
    if power == 0:
        if id == 1:
            motor.motor_stop(motor.Motors.M1)
        elif id == 2:
            motor.motor_stop(motor.Motors.M2)
        elif id == 3:
            motor.motor_stop(motor.Motors.M3)
        elif id == 4:
            motor.motor_stop(motor.Motors.M4)
    elif id == 1:
        motor.motor_run(motor.Motors.M1, motor.Dir.CW, power)
    elif id == 2:
        motor.motor_run(motor.Motors.M2, motor.Dir.CW, power)
    elif id == 3:
        motor.motor_run(motor.Motors.M3, motor.Dir.CW, power)
    elif id == 4:
        motor.motor_run(motor.Motors.M4, motor.Dir.CW, power)
motor.motor_stop_all()
radio.set_transmit_power(7)
radio.set_group(66)