//1
int Pin1 = 8;//IN1 is connected to 10 //891011
int Pin2 = 9;//IN2 is connected to 11  
int Pin3 = 10;//IN3 is connected to 12  
int Pin4 = 11;//IN4 is connected to 13 

int switchCW  =7;//define input pin for CW push button

 
int pole1[] ={0,0,0,0, 0,1,1,1, 0};//pole1, 8 step values
int pole2[] ={0,0,0,1, 1,1,0,0, 0};//pole2, 8 step values
int pole3[] ={0,1,1,1, 0,0,0,0, 0};//pole3, 8 step values
int pole4[] ={1,1,0,0, 0,0,0,1, 0};//pole4, 8 step values


int poleStep = 0; 
int  dirStatus = 3;// stores direction status 3= stop (do not change)
 int analogVal ;
void setup() 
{ 
 pinMode(Pin1, OUTPUT);//define pin for ULN2003 in1 
 pinMode(Pin2, OUTPUT);//define pin for ULN2003 in2   
 pinMode(Pin3, OUTPUT);//define pin for ULN2003 in3   
 pinMode(Pin4, OUTPUT);//define pin for ULN2003 in4 
  
   
 
 pinMode(switchCW,INPUT_PULLUP);// CW push button pin as input

Serial.begin(9600);

} 
 void loop() 
{ 
  
  if(digitalRead(switchCW) == HIGH) 
  {
    dirStatus =1;
  }else if(digitalRead(switchCW) == LOW)
  {
   dirStatus  = 3;  
  }
 if(dirStatus ==1){ 
   poleStep++; 
    driveStepper(poleStep);    
 }else if(dirStatus ==3){ 
    driveStepper(8);    
 }
 if(poleStep>7){ 
   poleStep=0; 
 } 
 if(poleStep<0){ 
   poleStep=7; 
 } 
analogVal =digitalRead(7);
 Serial.println(analogVal);
 // Serial.println(digitalRead(switchST));
 delay(1); 

}// loop



/*
  @brief sends signal to the motor
  @param "c" is integer representing the pol of motor
  www.Robojax.com code June 2019
 */
void driveStepper(int c)
{
     digitalWrite(Pin1, pole1[c]);  
     digitalWrite(Pin2, pole2[c]); 
     digitalWrite(Pin3, pole3[c]); 
     digitalWrite(Pin4, pole4[c]);   
}//driveStepper end here
