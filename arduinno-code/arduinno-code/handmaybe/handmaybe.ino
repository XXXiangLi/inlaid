
int switchCW  =7;//define input pin for CW push button

#include <Stepper.h>

const int stepsPerRevolution = 200;  // change this to fit the number of steps per revolution
// for your motor

// initialize the stepper library on pins 8 through 11:
Stepper myStepper(stepsPerRevolution, 8, 9, 10, 11);

void setup() 
{ 
 // myStepper.setSpeed(60);
   
 
 pinMode(switchCW,INPUT_PULLUP);// CW push button pin as input

Serial.begin(9600);

} 
 void loop() 
{ 
  
  if(digitalRead(switchCW) == HIGH) 
  {
     myStepper.setSpeed(50);
  myStepper.step(stepsPerRevolution);
  delay(1000);
  
  // Rotate CCW quickly at 10 RPM
  myStepper.setSpeed(50);
  myStepper.step(-stepsPerRevolution);
  delay(1000);
  }else if(digitalRead(switchCW) == LOW)
  {
     myStepper.setSpeed(50);
  myStepper.step(0);
  }
 
//analogVal =digitalRead(7);
// Serial.println(analogVal);
 // Serial.println(digitalRead(switchST));
 delay(1); 

}// loop
