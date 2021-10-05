var searchData = {
    query: "example"

};

var margin = 20;
var marginright = 120;

var dataname = "humidity"
var textname = "Humidité"
var postfix = "%"
var cur_array = false;
var gmax, gmin;

function changetype(dname,name,pfix) {
	dataname = dname
	textname = name
	postfix = pfix
	intervaldata()
}

function update_data() {
	fetch("/sql/get_data.php", {
		method: "POST",
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		//make sure to serialize your JSON body
		body: JSON.stringify(searchData)
	})
	.then(data => data.text())
	.then(data => {
	cur_array = JSON.parse(data)

	cur_array.sort(function(a, b) {
	  return a.curtime - b.curtime;
	});

	gmax = Math.max.apply(Math, cur_array.map(function(o) { return o[dataname]; }))
	gmin = Math.min.apply(Math, cur_array.map(function(o) { return o[dataname]; }))

	intervaldata()
	});
}

function intervaldata() {
	const interval = setInterval(function() {
		update_data()
		clearInterval(interval)
	}, 1000);
}

intervaldata()

var mapy;

function setup() {
  createCanvas(800, 400); 
}


function draw() {
  clear();
  
  // GRID
  stroke(0,0,0,20)
  strokeWeight(1)
  for(let i=0 ; i<15 ; i+=1) {
    line(0,((14-i)/(14))*(height-margin*2)+margin,width,((14-i)/(14))*(height-margin*2)+margin)
  }
  noStroke();
  
  	if (cur_array) {
  		fill("#2F4728")
      
	  for(let i=0 ; i < 15 ; i++) {
	    maptext = round(map(i,0,14,gmin,gmax)*10)/10
	    text(maptext+postfix,5,((14-i)/(14))*(height-margin*2)+margin)
	  }
      stroke("#FFD400");
	  noFill();
	  beginShape();

	  mapy = map(cur_array[0][dataname],gmin,gmax,height-margin,margin)
	  vertex(margin+40,mapy);
	  
	  for( let i=0 ; i < cur_array.length ; i++) {
	    // strokeWeight(5);
	    mapy = map(cur_array[i][dataname],gmin,gmax,height-margin,margin)
	    // point((i/(cur_array.length-1))*(width-margin*2-40)+margin+40,mapy)
	    strokeWeight(2);
	    vertex((i/(cur_array.length-1))*(width-margin*2-40-marginright)+margin+40,mapy);
	  }
	  vertex(width-margin*2-40+margin+40-marginright,mapy);
	  endShape();
  }
  
  if (mouseX > 0 && mouseX < width) {
    strokeWeight(5);
    stroke("#2F4728")
    map_curpoint = round(map(mouseX,margin+40,width-margin-marginright,0,cur_array.length-1))
    if (map_curpoint >= 0 && map_curpoint < cur_array.length) {
    mapy = map(cur_array[map_curpoint][dataname],gmin,gmax,height-margin,margin)
    point((map_curpoint/(cur_array.length-1))*(width-margin*2-40-marginright)+margin+40,mapy)
    fill(0)
      
    let currentDate = new Date(Number(cur_array[map_curpoint].curtime)*1000)
    let curdate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    noStroke();
    fill(255,255,255)
      
    rect((map_curpoint/(cur_array.length-1))*(width-margin*2-40-marginright)+margin+40+5,mapy-10,120,30)
    
    fill("#2F4728")
    text(curdate,(map_curpoint/(cur_array.length-1))*(width-margin*2-40-marginright)+margin+40+8,mapy+4)
    text(textname + ' : ' + cur_array[map_curpoint][dataname] + postfix,(map_curpoint/(cur_array.length-1))*(width-margin*2-40-marginright)+margin+40+8,mapy+16)
      }
  } else {
    map_curpoint = false;
  }
  noStroke();
}