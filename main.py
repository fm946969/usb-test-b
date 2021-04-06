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
    else:
        for i in range(4):
            parsecode(i, receivedNumber)
radio.on_received_number(on_received_number)

def controldevice(id: number, power: number):
    global actual_power
    actual_power = max(power, list_power_min[id])
    if list_power[id] != actual_power:
        list_power[id] = actual_power
        led.plot_brightness(id, 0, actual_power)
        if actual_power == 0:
            if id == 0:
                motor.motor_stop(motor.Motors.M1)
            elif id == 1:
                motor.motor_stop(motor.Motors.M2)
            elif id == 2:
                motor.motor_stop(motor.Motors.M3)
            elif id == 3:
                motor.motor_stop(motor.Motors.M4)
        elif id == 0:
            motor.motor_run(motor.Motors.M1, motor.Dir.CW, actual_power)
        elif id == 1:
            motor.motor_run(motor.Motors.M2, motor.Dir.CW, actual_power)
        elif id == 2:
            motor.motor_run(motor.Motors.M3, motor.Dir.CW, actual_power)
        elif id == 3:
            motor.motor_run(motor.Motors.M4, motor.Dir.CW, actual_power)
def parsecode(id: number, code: number):
    if Math.floor(code / 10 ** id) % 10 != 0:
        controldevice(id, 255)
    else:
        controldevice(id, 0)

def on_button_pressed_a():
    list2: List[number] = []
    list_power_min[3] = 255 - list2[3]
    controldevice(3, list2[3])
input.on_button_pressed(Button.A, on_button_pressed_a)

actual_power = 0
list_power_min: List[number] = []
list_power: List[number] = []
Pump3MinPower = 0
motor.motor_stop_all()
radio.set_transmit_power(7)
radio.set_group(66)
list_power = [0, 0, 0, 0]
list_power_min = [0, 0, 0, 0]