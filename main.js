
song = "";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;
scoreRighttWrist=0;
function preload()
{
  song=loadSound("Beatles.mp3")  
}

function setup()
{
    canvas= createCanvas(600,600);
    canvas.center(); 

    video = createCapture(VIDEO);
    video.hide();

    poseNet=
    ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}

function modelLoaded()
{
console.log('poseNetisInitialized');
}
function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}



function draw()
{
    image(video,0,0,600,600)
    fill("#0431B4");
    stroke("#0431B4");

if (scoreRighttWrist> 0.2)
{
    circle(rightWristX,rightWristY,20);
    fill("#81F7F3");
    stroke("#81F7F3");}
    if (rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML="velocidad = 0.5";
        song.rate(0.5);
    } 

    else if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML="velocidad = 1";
        song.rate(1);
    }

    else if(rightWristY >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML="velocidad = 1.5";
        song.rate(1.5)
    }
    
    else if(rightWristY > 300 && rightWristY <= 400)
{
    document.getElementById("speed").innerHTML="velocidad = 2";
    song.rate(2);
}

else if(rightWristY > 400 && rightWristY <= 500)
{
    document.getElementById("speed").innerHTML=" velocidad = 2.5";
    song.rate(2.5);
}
    





if(scoreLeftWrist > 0.2)
{
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberleftWristY *2);
    leftWristY_divide_1000 = new_leftWristY/1000;
    document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
    song.setVolume(leftWristY_divide_1000);	
}
}
function play()
{
    song.play();
song.setVolume(1);
song.setRate(1);
}


