int switchCW  =7;//define input pin+ for CW push button

const int dirPin = 2;
const int stepPin = 3;
const int stepsPerRevolution = 1098;

void setup()
{
pinMode(switchCW,INPUT_PULLUP);// CW push button pin as input
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  Serial.begin(9600);
}
void loop()
{
    if(digitalRead(switchCW) == HIGH) 
  {
    digitalWrite(dirPin, HIGH);
  for(int x = 0; x < stepsPerRevolution; x++)
  {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(1000);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(1000);
  }
  delay(500);
   digitalWrite(dirPin, LOW);
  for(int x = 0; x < stepsPerRevolution; x++)
  {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(1000);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(1000);
  }
  delay(500);
  }else if(digitalRead(switchCW) == LOW)
  {
     digitalWrite(stepPin, HIGH);
        delayMicroseconds(0);
  }
   Serial.println(digitalRead(switchCW));
  
  }
