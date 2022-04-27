song = "";
status = "";
objects =[];

function preload()
{
    song = loadSound('theme.mp3');
}


function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}


function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
        

            fill("FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
        }
        if(objects.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
        }
    }
}


function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function modelLoaded()
{
    console.log("Model Loaded!!");
    status = true;
}