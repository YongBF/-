var Local=function(){
	//游戏对象
	var game;
	//时间间隔
	var time=200;
	//下落定时器
	var timer=null;
	//游戏计时
	var gameTimer=null;
	//干扰计时器
	var testTimer;
	var testTime=0;
	//绑定键盘事件
	var bindKeyEvent=function(){
		document.onkeydown=function(e){
			if(e.keyCode==38){//up
				game.up();
			}else if(e.keyCode==39){//right
				game.right();
			}else if(e.keyCode==40){//down
				game.down();
			}else if(e.keyCode==37){//left
				game.left();
			}else if(e.keyCode==32){//space
				game.fall();
			}
		}
	}
	//随机生成方块种类
	var generateType=function(){
		return Math.ceil(Math.random()*7)-1;
	}
	//移动
	var move=function(){
		if(!game.down()){
			game.isFixed();
			game.checkClear();
			var over = game.checkGameOver();
			if(over){
				stop();
				alert("游戏结束");
			}else{
				game.performNext(generateType());
			}
			
		}
			//game.addTailLines(generateBottomLine(1);
	}
	//随机生成干扰行
	var generateBottomLine=function(lineNum){
		var lines=[];
		for(var i=0;i<lineNum;i++){
			var line=[];
			for(j=0;j<10;j++){
				line.push(Math.ceil(Math.random()*2)-1);
			}
			lines.push(line);
		}
		//console.log(lines);
		return lines;
	}
	//游戏计时
	var timing=function(){
		var gameTime=document.getElementById('time');
		var num=parseInt(gameTime.innerHTML)+1;
		gameTime.innerHTML=num;
		testTime+=1;
		if((testTime%12)==0){
			game.addTailLines(generateBottomLine(1));
		}		
	}
	//开始
	var start=function(){
		var doms={
			gameDiv:document.getElementById('game'),
			nextDiv:document.getElementById('next')
		}
		//alert(doms.gameDiv);
		game=new Game();
		game.init(doms);
		bindKeyEvent();
		timer=setInterval(move,time);
		gameTimer=setInterval(timing,1000);
		//testTimer=setInterval(game.addTailLines(generateBottomLine()),10000);
		//setInterval(game.addTailLines(generateBottomLine(1)),3000); 
	}
	//结束
	var stop=function(){
		if(timer){
			clearInterval(gameTimer);
			gameTimer=null;
			clearInterval(timer);
			timer=null;
			clearInterval(testTimer);
			testTimer=null;
		}
		document.onkeydown=null;
	}
	//导出API
	this.start=start;
}