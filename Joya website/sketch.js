// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBB8Dgi1dS9jiNH94sFOyhf7ReHCY-j7C4",
    authDomain: "joya-game.firebaseapp.com",
    databaseURL: "https://joya-game.firebaseio.com",
    projectId: "joya-game",
    storageBucket: "",
    messagingSenderId: "323235534633",
    appId: "1:323235534633:web:a753eb1c8fbfaf22"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let database = firebase.database()
let scoreboard = {}
let joy=document.getElementById("name")
let x
let y
let a
let b
let c
let d
let score
let count
let level
let time 

function setup() {
  createCanvas(windowWidth,windowHeight);
  x=200
  y=400
  a=500
  b=500
  c=[220, 254, 125, 352,453,652,985,460,365,125,250,150,657,300,854,299,357,156,652,458,369,438,356]
  d=[250,300,350,150,500,600,800,460,900,165,200,300,165,365,100,270,157,371,389,184,450,325,439]
  score=0
  count=2
  level=1
  time=30
}

function draw() {
  if (time>0) {
  background(120,100,155);
  fill(100,125,180)
  circle(x,y,10)
  if (touches.length == 0)   {
  if(keyIsDown(LEFT_ARROW)) {
    x = x - 8
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x=x+8
  }
  if (keyIsDown(DOWN_ARROW)) { 
    y=y+8
  }
  if (keyIsDown(UP_ARROW)) {
    y=y-8
  }
}
   else { 
		x = touches[0].x
		y= touches[0].y
}

  fill(0,0,255)
  circle(a,b,10)
  a = a + 5
  if ( a>width) {
    a=0
    b = random(0, height)
  }

  if(dist(x,y,a,b)<10+10){
    score=score+1
  }
  
  time=time-0.05
  
  textSize(15)
  text("score: " + score,50,100)
  text("level: " + level,120,100)
  text("time:" + time.toFixed(0),170,100)
  
  
  for (i=0; i<count; i=i+1) {
    if(dist(x,y,c[i],d[i])<10+15){
      score=score-1
    }

    fill(150,150,200)
    circle(c[i],d[i],15)
    d[i]=d[i]-5
    if (d[i]<0) {
        d[i]=height
      c[i] = random(0,width)
    }
  }
if (score > 5 && level== 1) {
  count = count + 1
  level=2
}
if (score > 10 && level==2) {
  count = count + 2 
  level=3
}
if (score> 15 && level==3) {
  count=count + 3
  level=4
}
if (score>20 && level==4) {
  count=count + 4 
  level=5
}

if (score>25 && level==5) {
  count=count + 5 
  level=6
}  
if (score>30 && level==6) {
  count=count + 6 
  level=7
}  
if (score>35 && level==7) {
  count=count + 7
  level=8
}
if (score>40 && level==7) {
  count=count + 8
  level=8
}
if (score>45 && level==8) {
  count=count + 9
  level=8
}
  }
  else {
    joy.innerHTML = "Name? <input id='more'><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time Leaderboard</button>";noLoop()
  }
}
function restart() {
  let more= document.getElementById("more")
  name = more.value
  database.ref(name).set(score)
  if (name !="") {
    scoreboard[name] = score
  }
  alert("Scoreboard:" + JSON.stringify(scoreboard,null,1))
  time=30
  score=0
  loop();
  joy.innerHTML=""
  generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i< 3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

  function generate_alltime_leaderboard() {
  	let alltime_leaderboard = { }
  	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
  		snapshot.forEach(function(data) {
  		alltime_leaderboard[data.key] = data.val()
  		});
      	});
  	if (Object.values(alltime_leaderboard).length > 0) {
  	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
      	}
  }

  generate_alltime_leaderboard()
   
  

