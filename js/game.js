var Game=function(){
	//目标元素缓存
	var gameDiv;
	var nextDiv;
	//游戏矩阵
	var gameData=[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	];
	//当前方块
	var cur;
	//下一个方块
	var next;
	//div
	var nextDivs=[];
	var gameDivs=[];
	//检测单个块的合法性,只允许合法块进行后续操作
	var check=function(pos,x,y){
		if(pos.x+x<0){ //超出上边界
			return false;
		}else if(pos.x+x>=gameData.length){  //超出下边界
			return false;
		}else if(pos.y+y<0){ //超出左边界
			return false;
		}else if(pos.y+y>=gameData[0].length){ //超出右边界
			return false;
		}else if(gameData[pos.x+x][pos.y+y]==1){ //位置已有下落块存在
			return false;
		}else{
			//alert(pos.x+x);
			return true;
		}
	}
	//检测数组数据合法性（整个块）
	var isValid=function(pos,data){ //pos提供数组位置;data提供数组的数据（具体样式）
		var len=data.length;
		var oneArrayLen=data[0].length;
		for(var i=0;i<len;i++){ //循环对整个块中的各个小块进行合法性判断，全部通过为true
			for(var j=0;j<oneArrayLen;j++){
				if(data[i][j]!=0){ //判断是否存在块
					if(!check(pos,i,j)){  //判断是否通过块合法性检查
						return false;
					}
				}
			}
		}
		return true;
	}
	//清除数据
	var clearData=function(){
		var len=cur.data.length;
		var oneArrayLen=cur.data[0].length;
		for(var i=0;i<len;i++){
			for(var j=0;j<oneArrayLen;j++){
				if(check(cur.origin,i,j)){
					gameData[cur.origin.x+i][cur.origin.y+j]=0;
				}
			}
		}
	}
	//设置数据(块在主屏中的位置)
	var setData=function(){
		var len=cur.data.length;
		var oneArrayLen=cur.data[0].length;
		for(var i=0;i<len;i++){
			for(var j=0;j<oneArrayLen;j++){
				if(check(cur.origin,i,j)){
					gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j];
				}
			}
		}
	}
	//初始化页面div
	var initDiv=function(container,data,divs){ //container目标div;data矩阵数据;divs页面缓存（用以刷新页面）
		var len=data.length;
		var oneArrayLen=data[0].length;
		for(var i=0;i<len;i++){ 
			var div=[];
			for(var j=0;j<oneArrayLen;j++){
				var newNode=document.createElement('div');
				newNode.className='none';
				newNode.style.top=(i*30)+'px';
				newNode.style.left=(j*30)+'px';
				container.appendChild(newNode);
				div.push(newNode);
			}
			divs.push(div);
		}	
	}
	//刷新页面div
	var refreshDiv=function(data,divs){ //data矩阵数据;divs页面实时数据
		var len=data.length;
		var oneArrayLen=data[0].length;
		for(var i=0;i<len;i++){
			for(var j=0;j<oneArrayLen;j++){
				if(data[i][j]==0){
					divs[i][j].className='none';//无状态块
				}else if(data[i][j]==1){
					divs[i][j].className='done';//已下落块
				}else if(data[i][j]==2){
					divs[i][j].className='current';//正在下落块
				}
			}
		}
	}
	//下移
	var down=function(){
		if(cur.canDown(isValid)){
			clearData();
			cur.down();
			setData();
			refreshDiv(gameData,gameDivs);
			return true;
		}else{
			return false;
		}
	}
	//左移
	var left=function(){
		if(cur.canLeft(isValid)){
			clearData();
			cur.left();
			setData();
			refreshDiv(gameData,gameDivs);
		}		
	}
	//右移
	var right=function(){
		if(cur.canRight(isValid)){
			clearData();
			cur.right();
			setData();
			refreshDiv(gameData,gameDivs);
		}		
	}
	//上移（变换状态）
	var up=function(){
		if(cur.canUp(isValid)){
			clearData();
			cur.uprotate();
			setData();
			refreshDiv(gameData,gameDivs);
		}		
	}
	//生成下一个方块
	var performNext=function(type){
		cur=next;
		cur.origin.x=0;
		cur.origin.y=3;
		setData();
		next=SquareFactory.prototype.make(type);
		refreshDiv(gameData,gameDivs);
		refreshDiv(next.data,nextDivs);
	}
	//判断是否到底
	var isFixed=function(){
		var len=cur.data.length;
		var oneArrayLen=cur.data[0].length;
		for(var i=0;i<len;i++){
			for(var j=0;j<oneArrayLen;j++){
				if(check(cur.origin,i,j)){
					if(gameData[cur.origin.x+i][cur.origin.y+j]==2){
						gameData[cur.origin.x+i][cur.origin.y+j]=1;
					}
				}
			}
		}
		refreshDiv(gameData,gameDivs);
	}
	//消行
	var checkClear=function(){
		var line=0;
		for(var i=gameData.length-1;i>=0;i--){
			var clear=true;
			for(j=0;j<gameData[0].length;j++){ //从最后一行开始判断是否满足消行条件
				if(gameData[i][j]!=1){
					clear=false;
					break
				}
			}
			if(clear){
				line++;
				for(var m=i;m>0;m--){ //逐行下移替代
					for(var n=0;n<gameData[0].length;n++){
						gameData[m][n]=gameData[m-1][n];
					}
				}
				for(var n=0;n<gameData[0].length;n++){ //将下移后的空出行初始化
					gameData[0][n]=0;
				}
				i++;//行下移后，补索引
			}
		}
		var score=document.getElementById('score');//得分
		var num;
		switch (line){
			case 1:
				num=10;
				break;
			case 2:
				num=30;
				break;
			case 3:
				num=60;
				break;
			case 4:
				num=100;
				break;	
			default:
				num=0;
				break;
		}
		score.innerHTML=parseInt(score.innerHTML)+num;
	}
	//检查游戏结束
	var checkGameOver=function(){
		var gameOver=false;
		for(var i=0;i<gameData[0].length;i++){
			if(gameData[0][i]==1){
				gameOver=true;
			}
		}
		return gameOver;
	}
	//底部增加行
	var addTailLines=function(lines){ //lines为要增加的矩阵
		console.log(gameData);
		var len=gameData.length-lines.length;
		for(var i=0;i<len;i++){ //将原先矩阵上移
			gameData[i]=gameData[i+lines.length];
		}
		for(var i=0;i<lines.length;i++){ //将上移后的空白部分用lines填充
			gameData[gameData.length-lines.length+i]=lines[i];
		}
		cur.origin.x=cur.origin.x-lines.length;
		if(cur.origin.x<0){
			cur.origin.x=0;
		}
		console.log(gameData);
		refreshDiv(gameData,gameDivs);
	}
	//初始化
	var init=function(doms){
		gameDiv=doms.gameDiv;
		nextDiv=doms.nextDiv;
		//cur=new Square();
		var random=(Math.ceil(Math.random()*7)-1);
		cur=SquareFactory.prototype.make(random);
		next=SquareFactory.prototype.make(random);
		initDiv(gameDiv,gameData,gameDivs);
		initDiv(nextDiv,next.data,nextDivs);
		cur.origin.x=0;
		cur.origin.y=3;
		setData();//测试
		refreshDiv(gameData,gameDivs);
		refreshDiv(next.data,nextDivs);
	}
	//导出API
	this.init=init;
	this.down=down;
	this.left=left;
	this.right=right;
	this.up=up;
	this.fall=function(){
		while(down());
	}
	this.isFixed=isFixed;
	this.performNext=performNext;
	this.checkClear=checkClear;
	this.checkGameOver=checkGameOver;
	this.addTailLines=addTailLines;
}
