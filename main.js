function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;

score_leftWrist = 0;

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;

        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;

        console.log(" Left wrist X = " + left_wristX + " Left wrist Y = " + left_wristY);
        console.log(" Right wrist X = " + right_wristX + " Right wrist Y = " + right_wristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log( "Score of left wrist is " + score_leftWrist);
    }
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

function draw() {
    image(video ,0 ,0 ,600 ,500);
    stroke("red");
    fill("red");

    if(score_leftWrist > 0.2) {

    circle(left_wristX, left_wristY , 20);
    In_num_left_wristY = Number(left_wristY);
    remove_decimals = Math.floor(In_num_left_wristY);
    volume= remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume : " + volume;
    song.setVolume(volume);

    }
}

song = "";

function preload() {
    song = loadSound("music.mp3");
}

function play_music() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause_music() {
    song.pause();
}

