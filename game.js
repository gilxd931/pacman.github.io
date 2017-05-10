var context = canvas.getContext("2d");
var shape;
var board;
var score;
var life;
var pacmanDirection;
var bonusDirection;
var pac_color;
var start_time;
var time_elapsed;
var userName;
var pacmanInterval;
var monstersInterval;
var bonusInterval;
var timeInterval;
var monstersAmount;
var bonusDirectionDraw;
var bonusImgLeft;
var bonusImgRight;
var bonusImgUp;
var bonusImgDown;
var bonusCaught;
var timeBonus;
var timeShow;
var timeCaught;
var bonus = {};
var music = new Audio('audio/pacmanMusic.mp3');
var hitSound = new Audio('audio/hit.mp3');
var hitSound2 = new Audio('audio/hit.mp3');
var isHitSound;
var maxTime;
var monstersArray
var medicine;
var medicineCaught;
var inGameFoodLeft;
function StartGame() {
    
     document.getElementById( 'user_name_game_id' ).scrollIntoView();  // scroll screen to a good view position

    //set max time by user choice. default is maximum 60 seconds
    maxTime=parseInt(document.getElementById('timeForGame').value);
    if(!(maxTime>=60) )
        maxTime=60;
    //set monster amount by user choice
    monstersAmount = parseInt(document.getElementById('numOfMon').value);
    //set food amount by user choice
    var food_remain = parseInt(document.getElementById('numOfFood').value);
    var food_25_points=Math.round(food_remain*0.1);
    var food_15_points=Math.round(food_remain*0.3);
    var food_5_points=food_remain-food_25_points-food_15_points;
    inGameFoodLeft = food_remain;
    monstersArray = new Array();
    board = new Array();
    shape = new Object();
    score = 0;
    lives =3;
    isHitSound = true;
    pauseMonsters= true;
    pac_color="yellow"; 
    pacmanDirection=4;
    var cnt = (13 * 20);
    var pacman_remain = 1;
    start_time= new Date();
    bonusDirectionDraw = "right";
    bonusCaught= false;
    shape.i =10;
    shape.j = 5;
    
    music.play();
       
    
    //load pacwoman bonus
    
    bonusImgRight = new Image();
    bonusImgRight.src = "images/pacwomanRight.png";
    bonusImgLeft = new Image();
    bonusImgLeft.src = "images/pacwomanLeft.png";
    bonusImgUp = new Image();
    bonusImgUp.src = "images/pacwomanUp.png";
    bonusImgDown = new Image();
    bonusImgDown.src = "images/pacwomanDown.png";
    bonus.i = 1;
    bonus.j = 11;
    
    //load pacman photo
    
    pacmanImgRight=new Image();
    pacmanImgRight.src="images/pacRight.png";
    pacmanImgLeft=new Image();
    pacmanImgLeft.src="images/pacLeft.png";
    pacmanImgUp=new Image();
    pacmanImgUp.src="images/pacUp.png";
    pacmanImgDown=new Image();
    pacmanImgDown.src="images/pacDown.png";

    
    
    //load medicine bonus
    medicine = new Image();
    medicine.src = "images/medicine.png";
    var medPos = getMedicinePosition();
    medicine.i = medPos[0];
    medicine.j = medPos[1];
    medicineCaught = false;
    
    // time bonus
    
    timeBonus = new Image();
    timeBonus.src = "images/time.png";
    timeBonus.i=10;
    timeBonus.j=6;
    timeShow= false;
    timeCaught = false;
    
    //load monsters images
    //first monster
    monsterI = new Image();
    monsterI.src = "images/red-monster.jpg";
    monsterI.i = 18;
    monsterI.j = 11;
    monstersArray.push(monsterI);
    
    if (monstersAmount > 1 )  //second monster
    {
        monsterII = new Image();
        monsterII.src = "images/monster-moving.gif";
        monsterII.i = 18;
        monsterII.j = 1;
        monstersArray.push(monsterII);
    }
    if (monstersAmount ==3)  //third monster
    {
        monsterIII = new Image();
        monsterIII.src = "images/monster3.jpg";
        monsterIII.i = 1;
        monsterIII.j = 1;
        monstersArray.push(monsterIII);
    }
    var orderOfFoodColor=1;

     for (var i = 0; i < 20; i++) {
                    board[i] = new Array();
                    //put obstacles 
                    for (var j = 0; j < 13; j++) {
                    	if((j==0) || (i==0) || (i==19) || (j==12) || (i==2 && j==2) || (i==2 && j==3) || (i==2 && j==4) || (i==2 && j==5) || (i==3 && j==2) || (i==4 && j==2) || (i==2 && j==7) || (i==2 && j==8) || (i==2 && j==9) || (i==2 && j==10) || (i==3 && j==10) || (i==4 && j==10)  || (i==15 && j==2) || (i==16 && j==2) || (i==17 && j==2) || (i==17 && j==3) || (i==17 && j==4) || (i==17 && j==5) || (i==15 && j==10) || (i==16 && j==10) || (i==17 && j==10) || (i==17 && j==8) || (i==17 && j==9) ||  (i==6 && j==6) || (i==7 && j==6) || (i==8 && j==6) || (i==11 && j==6) || (i==12 && j==6) || (i==13 && j==6) || (i==8 && j==4)|| (i==9 && j==4)|| (i==10 && j==4)|| (i==11 && j==4)|| (i==8 && j==8)|| (i==9 && j==8)|| (i==10 && j==8)|| (i==11 && j==8)|| (i==8 && j==2)|| (i==7 && j==2)|| (i==6 && j==2)|| (i==6 && j==3)|| (i==6 && j==4)|| (i==5 && j==4)|| (i==4 && j==4)|| (i==4 && j==5) || (i==4 && j==7)|| (i==4 && j==8)|| (i==5 && j==8)|| (i==6 && j==8)|| (i==6 && j==9)|| (i==6 && j==10)|| (i==7 && j==10)|| (i==8 && j==10)|| (i==11 && j==10)  || (i==12 && j==10)|| (i==13 && j==10)|| (i==13 && j==9)|| (i==13 && j==8) ||(i==14 && j==8) ||(i==15 && j==8)  ||(i==15 && j==7) ||(i==15 && j==5)||(i==15 && j==4) ||(i==14 && j==4) ||(i==13 && j==4) ||(i==13 && j==3) ||(i==13 && j==2) ||(i==12 && j==2) ||(i==11 && j==2) || (i==17 && j==7))
                    	{
                    		board[i][j] = 4;  
                    	}
                    	else{
                            
                    	var randomNum = Math.random();
                        if (randomNum <= 1.0 * food_remain / cnt) {
                            
                            if(orderOfFoodColor==1)
                                {
                                    if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                                    
                            
                            else if(food_15_points>0)
                                {
                                    food_remain--;
                                    board[i][j] = 15;
                                    food_15_points--;
                                }
                                    orderOfFoodColor=2;
                                }
                            else if(orderOfFoodColor==2){
                                

                                if(food_25_points>0)
                                {
                                    food_remain--;
                                   board[i][j] = 25;
                                    food_25_points--;
                                }
                                
                                else if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                            

                                    orderOfFoodColor=3;
                            }
                            else if(orderOfFoodColor==3){
                                
                                                             
                                 if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                                                            
                                                             

                                    orderOfFoodColor=4;
                            }
                            else if(orderOfFoodColor==4){
                             
                                if(food_15_points>0)
                                {
                                    food_remain--;
                                    board[i][j] = 15;
                                    food_15_points--;
                                }
                                else if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }


                                    orderOfFoodColor=5;
                            }
                            else if(orderOfFoodColor==5){
                                    if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                                    orderOfFoodColor=6;
                            }
                     else if(orderOfFoodColor==6){
                                    if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                                    orderOfFoodColor=7;
                            }
                            else if(orderOfFoodColor==7){
                                    if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                                    orderOfFoodColor=8;
                            }
                            else if(orderOfFoodColor==8){
                                    if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                                    orderOfFoodColor=9;
                            }
                            else{
                      if(food_5_points>0)
                                {
                                    food_remain--;
                                    board[i][j]=1;
                                    food_5_points--;
                                }
                                    orderOfFoodColor=1;
                            }
                            
                            
                        }
                            else
                            {
                                board[i][j] = 0;
                            }
                        cnt--;
                    	}
                    	}
                }
                while(food_remain>0){
					var emptyCell = findRandomEmptyCell(board);
					
                        if(food_25_points>0)
                        {
                            board[emptyCell[0]][emptyCell[1]] = 25;
                            food_25_points--;
                        }
                    else if(food_15_points>0)
                        {
                            board[emptyCell[0]][emptyCell[1]] = 15;
                            food_15_points--;
                        }

                    else if(food_5_points>0)
                        {
                           board[emptyCell[0]][emptyCell[1]] = 1;
                            food_5_points--;
                        }
                    
					food_remain--;
                } 
                    var pacmanCell = findRandomEmptyCell(board);        
                    shape.i=pacmanCell[0];
                    shape.j=pacmanCell[1];
                    pacman_remain--;
                    board[pacmanCell[0]][pacmanCell[1]] = 2;
    
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    
    pacmanInterval=setInterval(UpdatePosition, 170);
    monstersInterval=setInterval(UpdateMonsters,270);
    bonusInterval=setInterval(UpdateBonus,500);
    timeInterval = setInterval(UpdateTime,500);
}

function findRandomEmptyCell(board){
    var i = Math.floor((Math.random() * 11) + 1);
    var j = Math.floor((Math.random() * 18) + 1);
    while(board[i][j]!=0)
    {
        i = Math.floor((Math.random() * 11) + 1);
        j = Math.floor((Math.random() * 18) + 1);
    }
    return [i,j];             
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) { 
        return 2;
    }
    if (keysDown[37]) { 
        return 3;
    }
    if (keysDown[39]) { 
        return 4;
    }
}

function Draw(x) {
    canvas.width=canvas.width;
    if( userName != undefined)
        {
            lblUser.value = userName;
        }
    lblScore.value = score;
    lblLife.value= lives;
    lblTime.value = Math.round(time_elapsed);
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 13; j++) {
            var center = new Object();
            center.x = i * 35 + 30;
            center.y = j * 35 + 30;
            if (board[i][j] == 2) {  // Pacman
                DrawPacman(pacmanDirection,center);
                
            } else if (board[i][j] == 1) {
                // draw a circle to eat - 5 points
                context.beginPath();
                context.arc(center.x - 12, center.y - 12, 10, 0, 2 * Math.PI); // half circle
                context.fillStyle = "black"; //color 
                context.fill();
            }
            else if(board[i][j] == 15){
                    context.beginPath(); // draw a circle to eat - 15 points
                context.arc(center.x - 12, center.y - 12, 10, 0, 2 * Math.PI); // half circle
                context.fillStyle = "blue"; //color 
                context.fill();
                    }
                        else if(board[i][j] == 25){ // draw a circle to eat - 25 points
                    context.beginPath();
                context.arc(center.x - 12, center.y - 12, 10, 0, 2 * Math.PI); // half circle
                context.fillStyle = "purple"; //color 
                context.fill();
                    }
            else if (board[i][j] == 4) //wall
            {    
                context.beginPath();
                context.rect(center.x-30, center.y-30, 35, 35);
                context.fillStyle = "#686868"; 
                context.fill();
            }
        }
    }
    //draw first monster
    context.drawImage(monsterI, (monsterI.i * 35) + 4, (monsterI.j * 35) + 4, 30, 30);
    if (monstersAmount > 1) // draw second monster
    {
        context.drawImage(monsterII, (monsterII.i * 35) + 2, monsterII.j * 35, 30, 30);
    }
    if (monstersAmount == 3) // draw third monster
    {
        context.drawImage(monsterIII,(monsterIII.i * 35) + 2,(monsterIII.j * 35) + 1,30 , 30);
    }
    
    //draw bonus
    if (bonusCaught == false)
        {
            if (bonusDirectionDraw=="right")
                {
                    context.drawImage(bonusImgRight, (bonus.i * 35) + 2, (bonus.j * 35) + 4, 30, 30);
                }
            else if(bonusDirectionDraw=="left")
                {
                    context.drawImage(bonusImgLeft, (bonus.i * 35) + 2, (bonus.j * 35) + 4, 30, 30);
                }
            else if(bonusDirectionDraw=="up")
                {
                    context.drawImage(bonusImgUp, (bonus.i * 35) + 2, (bonus.j * 35) + 4, 30, 30);
                }
            else if(bonusDirectionDraw=="down")
                {
                    context.drawImage(bonusImgDown, (bonus.i * 35) + 2, (bonus.j * 35) + 4, 30, 30);
                }
        }
    
    //draw time
    if (timeShow && (!timeCaught))
        {
            context.drawImage(timeBonus, (timeBonus.i * 35) + 2, (timeBonus.j * 35) + 5, 30, 30);
        }
    
    // draw medicine
    
    if (time_elapsed>10 && (!medicineCaught))
    {
        context.drawImage(medicine, (medicine.i * 35) + 2, (medicine.j * 35) + 5, 30, 30);
    }

}

// ************************* intervals functions *************************

function UpdatePosition() {
    board[shape.i][shape.j]=0;
    var x = GetKeyPressed()
    if (x != undefined) // means, no key pressed. keep pacman at the same position
    {
        pacmanDirection = x;
    }
    if(x==1)
    {
        if(shape.j>0 && board[shape.i][shape.j-1]!=4)
        {
            shape.j--;
        }
    }
    if(x==2)
    {
        if(shape.j<12 && board[shape.i][shape.j+1]!=4)
        {
            shape.j++;
        }
    }
    if(x==3)
    {
        if(shape.i>0 && board[shape.i-1][shape.j]!=4)
        {
            shape.i--;
        }
    }
    if(x==4)
    {
        if(shape.i<19 && board[shape.i+1][shape.j]!=4)
        {
            shape.i++;
        }
    }
    if(board[shape.i][shape.j]==1)
    {
        score+=5;
        inGameFoodLeft--;
    }
    if(board[shape.i][shape.j]==15)
    {
        score+=15;
        inGameFoodLeft--;
    }
    if(board[shape.i][shape.j]==25)
    {
        score+=25;
        inGameFoodLeft--;
    }
    board[shape.i][shape.j]=2;
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    
    //caught bonus
    if (bonus.i == shape.i && bonus.j == shape.j && bonusCaught == false) {
        bonusCaught = true;
        score+= 50;
    }
    
    //caught medicine
    if (medicine.i == shape.i && medicine.j == shape.j && medicineCaught == false) {
    medicineCaught = true;
    lives++;
    }
    
    // caught time bonus
    if (timeBonus.i == shape.i && timeBonus.j == shape.j && timeCaught == false && timeShow== true) {
    timeCaught = true;
    maxTime+= 50;
    }
    
    if (maxTime == Math.round(time_elapsed))
    {
        if ( score < 150)
        {
            alert("Score: "+ score + ". You can do better");
        }
        else // win the game
        {    
            alert("We have a Winner!!!");
        }
        
    RestartGame();
    }
    
    else if (inGameFoodLeft==0)
    {
        alert("We have a Winner!!!");
        RestartGame();
    }
    else
    {
        Draw(pacmanDirection);
    }
}

function UpdateMonsters(){
    if (time_elapsed > 2) // let the player 2 seconds of grace
    {
        var length = monstersArray.length;
        var distanceX;
        var distanceY;
        var directionX; // diretion of pacman from monster
        var directionY;
        for (var index=0 ; index < length ; index++ ) // for every monster
        {
            distanceX = Math.abs(monstersArray[index].i - shape.i);
            distanceY = Math.abs(monstersArray[index].j - shape.j);
            if (monstersArray[index].i > shape.i)
            {
                directionX = "left";
            }
            else
            {
                directionX = "right";    
            }
            if (monstersArray[index].j > shape.j)
            {
                directionY="up";
            }
            else
            {
                directionY="down";    
            }

            moveMonsterToNewPosition(directionX,directionY,distanceX,distanceY,index);
        }
    }
}
    
function moveMonsterToNewPosition(directionX,directionY,distanceX,distanceY,index)
{
    
    var monsterI= monstersArray[index].i;
    var monsterJ=  monstersArray[index].j; 
    
    // try move left
    if (distanceX>=distanceY && directionX=="left")
    {

        if(board[monsterI -1][monsterJ] != 4)
        {
            // draw monst left
            (monstersArray[index]).i =monstersArray[index].i -1;
        }
        else if (directionY == "up" && board[monsterI][monsterJ-1] != 4)
        {
            // draw monst up
            (monstersArray[index]).j =monstersArray[index].j - 1;

        }
        else if (directionY == "down" && board[monsterI][monsterJ+1] != 4)
        {
            // draw monst down
            (monstersArray[index]).j =monstersArray[index].j +1;
        }
    }
    
        // try move up
    else if (distanceY>=distanceX && directionY=="up")
    {

        if(board[monsterI][monsterJ-1] != 4)
        {
            // draw monst up
            (monstersArray[index]).j =monstersArray[index].j -1;
        }
        else if (directionX == "left" && board[monsterI-1][monsterJ] != 4)
        {
            // draw monst left
            (monstersArray[index]).i =monstersArray[index].i - 1;

        }
        else if (directionX == "right" && board[monsterI+1][monsterJ] != 4)
        {
            // draw monst right
            (monstersArray[index]).i =monstersArray[index].i +1;
        }
    }
    
    // try move right
    else if (distanceX>distanceY && directionX=="right")
    {

        if(board[monsterI+1][monsterJ] != 4)
        {
            // draw monst right
            (monstersArray[index]).i =monstersArray[index].i +1;
        }
        else if (directionY == "up" && board[monsterI][monsterJ-1] != 4)
        {
            // draw monst up
            (monstersArray[index]).j =monstersArray[index].j - 1;

        }
        else if (directionY == "down" && board[monsterI][monsterJ+1] != 4)
        {
            // draw monst down
            (monstersArray[index]).j =monstersArray[index].j +1;
        }
    }
    
        // try move down
    else if (distanceY>distanceX && directionY=="down")
    {

        if(board[monsterI][monsterJ+1] != 4)
        {
            // draw monst down
            (monstersArray[index]).j =monstersArray[index].j +1;
        }
        else if (directionX == "left" && board[monsterI-1][monsterJ] != 4)
        {
            // draw monst left
            (monstersArray[index]).i =monstersArray[index].i - 1;

        }
        else if (directionX == "right" && board[monsterI+1][monsterJ] != 4)
        {
            // draw monst right
            (monstersArray[index]).i =monstersArray[index].i +1;
        }
      
    }
   else if (directionY=="down" && directionX=="right" && distanceX==distanceY) // monster stuck condition
    {
        if (board[monsterI+1][monsterJ] != 4)
        {
          (monstersArray[index]).i =monstersArray[index].i +1;  
        }
        else if (board[monsterI][monsterJ+1] != 4)
        {
            (monstersArray[index]).j =monstersArray[index].j +1;
        }
        else if (board[monsterI][monsterJ-1] != 4) 
        {
           // draw monst down
            (monstersArray[index]).j =monstersArray[index].j -1;
        }
    }
    
    if ((shape.i == monstersArray[index].i) && (shape.j == monstersArray[index].j))
    {
        monsterHitPacman();
    }
}
function UpdateTime(){
    if (time_elapsed>7)
    {
        timeShow= true;
    }
    if (time_elapsed>17) // pacman has 10 seconds to caught the time bonus
    {
        timeShow= false;
    }
    if (timeShow && (!timeCaught))
    {
        var movesDictionary = [];
        var moves = 0;
        var chosenDir;
        if ((timeBonus.i - 1 >= 0 && board[timeBonus.i-1][timeBonus.j] != 4)) {
            movesDictionary.push("left");
            moves++;
        }
        if (timeBonus.i + 1 < 20 && board[timeBonus.i+1][timeBonus.j] != 4) {
            moves++;
            movesDictionary.push("right");
        }
        if (timeBonus.j - 1 >= 0 && board[timeBonus.i][timeBonus.j-1] != 4) {
        moves++;
        movesDictionary.push("up");
        }
        if (timeBonus.j + 1 < 13 && board[timeBonus.i][timeBonus.j+1] != 4) {
            moves++;
            movesDictionary.push("down");
        }

        chosenDir = Math.floor(Math.random() * moves);
        var direction =movesDictionary[chosenDir];
        switch (direction) {
            case "left":
                timeBonus.i -= 1;
                break;
            case "right":
                timeBonus.i += 1;
                break;
            case "up":
                timeBonus.j -= 1;
                break;
            case "down":
                timeBonus.j += 1;
                break;
        }
    }
   
}


function UpdateBonus(){
    // handle bonus
    var movesDictionary = [];
    var moves = 0;
    var chosenDir;
    if ((bonus.i - 1 >= 0 && board[bonus.i-1][bonus.j] != 4)) {
        movesDictionary.push("left");
        moves++;
    }
    if (bonus.i + 1 < 20 && board[bonus.i+1][bonus.j] != 4) {
        moves++;
        movesDictionary.push("right");
    }
    if (bonus.j - 1 >= 0 && board[bonus.i][bonus.j-1] != 4) {
    moves++;
    movesDictionary.push("up");
    }
    if (bonus.j + 1 < 13 && board[bonus.i][bonus.j+1] != 4) {
        moves++;
        movesDictionary.push("down");
    }

    chosenDir = Math.floor(Math.random() * moves);
    var direction =movesDictionary[chosenDir];
    switch (direction) {
        case "left":
            bonus.i -= 1;
            break;
        case "right":
            bonus.i += 1;
            break;
        case "up":
            bonus.j -= 1;
            break;
        case "down":
            bonus.j += 1;
            break;
    }
    bonusDirectionDraw = direction;

}

// ************************* draw *************************

function DrawPacman(x, center) {
        var pacmanLook1, pacmanLook2, eyeLook1, eyeLook2;
    
if (x==4)
                {//right
                    context.drawImage(pacmanImgRight, (shape.i * 35) + 2, (shape.j * 35) + 4, 30, 30);
                }
            else if(x==3)
                {//left
                    context.drawImage(pacmanImgLeft, (shape.i * 35) + 2, (shape.j * 35) + 4, 30, 30);
                }
            else if(x==1)
                {//up
                    context.drawImage(pacmanImgUp, (shape.i * 35) + 2, (shape.j * 35) + 4, 30, 30);
                }
            else if(x==2)
                {//down
                    context.drawImage(pacmanImgDown, (shape.i * 35) + 2, (shape.j * 35) + 4, 30, 30);
                }
    
        
    
    /*
        // Go Up
        if (x == 1) {
            pacmanLook1 = 1.7;
            pacmanLook2 = 1.3;
            eyeLook1 = 16;
            eyeLook2 = -5;
        }
    
        // Go Down
        if (x == 2) {
            pacmanLook1 = 0.7;
            pacmanLook2 = 0.3;
            eyeLook1 = 10;
            eyeLook2 = -10;
        }
        
        // Go Left
        if (x == 3) {
            pacmanLook1 = 1.15;
            pacmanLook2 = 0.85;
            eyeLook1 = 5;
            eyeLook2 = -15;
        }
    
        // Go Right
        if (x == 4) {
            pacmanLook1 = 0.15;
            pacmanLook2 = 1.85;
            eyeLook1 = 5;
            eyeLook2 = -15;
        }
        // Draw
        context.beginPath();
        context.arc(center.x - 10, center.y- 10, 15, pacmanLook1 * Math.PI, pacmanLook2 * Math.PI); 
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; 
        context.fill();
        context.beginPath();
        context.arc(center.x + eyeLook1, center.y + eyeLook2, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; 
        context.fill();*/
    }

// arrows are not scroll window
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function RestartGame(){
    music.currentTime = 0;
    music.pause();
    window.clearInterval(pacmanInterval);
    window.clearInterval(monstersInterval);
    window.clearInterval(bonusInterval);
    window.clearInterval(timeInterval);
    $("#game_page").hide();
    $("#settings_page").show();

}
    
function monsterHitPacman(){
    lives--;
    if (lives != 0)
    {
        if (isHitSound)
        { 
            hitSound.play();
            isHitSound = false;
        }
        else 
        {
            hitSound2.play();
            isHitSound = true;
        }
    }

    // monsters kill pacman
    if (lives==0)
    {
        alert("Score: " + score +" You lost!");
        RestartGame();
    }
    var emptyCell = findRandomEmptyCell(board);
    board[shape.i][shape.j] = 0;
    shape.i = emptyCell[0];
    shape.j= emptyCell[1];
}

function getMedicinePosition()
{
    var random = Math.floor(Math.random() * 4) + 1
    var i;
    var j;
    
    switch(random) 
    {
        case 1:
            i=10;
            j=1;
            break;
        case 2:
            i=1;
            j=6;
            break;
        case 3:
            i=18;
            j=6;
            break;
        case 4:
            i=10;
            j=11;
            break;
        default:
            i=10;
            j=1;
    }
    return [i,j];             
}
