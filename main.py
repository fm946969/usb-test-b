def on_button_pressed_a():
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
input.on_button_pressed(Button.A, on_button_pressed_a)

def controldevice(id: number, power: number):
    if power <= 0:
        led.unplot(id, 0)
    else:
        led.plot(id, 0)
    if id == 0:
        motor.motor_stop_all()
    elif id == 1:
        motor.motor_run(motor.Motors.M1, motor.Dir.CW, power)
    elif id == 2:
        motor.motor_run(motor.Motors.M2, motor.Dir.CW, power)
    elif id == 3:
        motor.motor_run(motor.Motors.M3, motor.Dir.CW, power)
    elif id == 4:
        motor.motor_run(motor.Motors.M4, motor.Dir.CW, power)

def on_received_value(name, value):
    if(name.compare("control") == 0):
        if(value == 0):
            motor.motor_stop_all()
        if(value % 10 == 1):
            controldevice(1, 255)
        else:
            controldevice(1, 0)
        if((value / 10) % 10 == 1):
            controldevice(2, 255)
        else:
            controldevice(2, 0)
        if((value / 100) % 10 == 1):
            controldevice(3, 255)
        else:
            controldevice(4, 0)
        if((value / 1000) % 10 == 1):
            controldevice(4, 255)
        else:
            controldevice(4, 0)
radio.on_received_value(on_received_value)

text_list = ["Off", "Led", "Pump1", "Pump2", "Pump3"]
motor.motor_stop_all()
radio.set_group(66)