class Robot{
	constructor(args){
		let def = {
			p: createVector(width/2,height/2),
			colors: [random(colors),random(colors),
							 random(colors),random(colors),
							 random(colors),random(colors),
							 random(colors),random(colors),
							 random(colors),random(colors),
							 random(colors),random(colors),
							 random(colors),random(colors),
							 random(colors),random(colors),],
			//亂數的大小
			size: createVector(
				random(400,300),
				random(200,300)
			),
			//亂數的眼睛大小
			eyeSize: createVector(
				random(10,50),
				random(50,100)
			),
			borderRadius: random(200),
			scale: random(1),
			ll: random(20,80),
			randomId: int(random(1000000))
		}
		Object.assign(def,args)
		Object.assign(this,def)
	}
	draw(){
		push()
		//繪製
		rectMode(CENTER)

		translate(this.p.x,this.p.y)
		// translate( this.size.x )
		rotate(sin(frameCount/30+this.randomId)/2)
		scale(0.3)

		// push()

		// if (this.randomId%4==0){
		// 	stroke(255)
		// 	strokeWeight(10)
		// }
		
		// 臉!!!!!
		noStroke()
		rotate(sin(mouseX/50+this.randomId)/5)
		fill(this.colors[1])
		rect(0,0,this.size.x,this.size.y,this.borderRadius)
	
		push()
			// 天線
			rotate(sin(frameCount/10+this.randomId)/5)
			fill(this.colors[8])
			rect(0,-200,30,this.ll)
		pop()
		
	
		// pop()
		
		//馬揪
		fill(this.colors[3])
		circle(-120,0,50+10*sin(mouseY/50+this.randomId)+this.eyeSize.x)

		fill(this.colors[2])
		circle(100,0,this.eyeSize.y)
		
		fill(this.colors[5])
		circle(-120,0,20+this.eyeSize.x)

		// fill(this.colors[6])
		// circle(100,0,this.eyeSize.y)

		push()
			//馬揪
			fill(this.colors[3])
			translate(0,50+sin(mouseX/50+this.randomId)*20)
			rotate(0.3+sin(frameCount/30)/5)
			//眉毛
			rect(-90,-100,150,30)
		pop()
		
		push()
			fill(colors[4])
			rotate(-0.25+sin(frameCount/50)/5)
			//眉毛
			rect(100,-100,150,30)
		pop()

		//嘴巴
		fill(this.colors[4])
		rect(0,100,200,30)

		//鼻子
		fill(this.colors[7])
		rect(0,10,30,80)

		//耳朵
		fill(this.colors[6])
		rect(-this.size.x/2,10,50,150)

		fill(this.colors[7])
		rect(this.size.x/2,10,60,150)
		pop()

	}
	update(){
		//資料相關的更新
	}
}

var colors="fff-613a3a-003049-d62828-f77f00-fcbf49-eae2b7-da2c38-226f54-276fbf-f4f0bb-183059-fa8334-fffd77-ffe882-388697-271033".split("-").map(a=>"#"+a)
var robots = []
let overAllTexture
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	pixelDensity(2)
	for(var x = 0;x<width+200;x+=150){
		for(var y = 0;y<height;y+=120){
			robots.push(new Robot({
				p: createVector(x,y)
			}))
		}
	}
	overAllTexture=createGraphics(width,height)
	overAllTexture.loadPixels()
	for(var i=0;i<width+50;i++){
		for(var o=0;o<height+50;o++){
			overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,50,100])))
		}
	}
	overAllTexture.updatePixels()
	// robots.push(new Robot({
	// 	p: createVector(width/1.5,height/2)
	// }))
}

function draw(){
	background(0)
	
	robots.forEach(robot=>robot.update())
	robots.forEach(robot=>robot.draw())
	
	push()
	blendMode(MULTIPLY)
	image(overAllTexture,0,0)
	pop()
	// ellipse(mouseX, mouseY, 20, 20);
}