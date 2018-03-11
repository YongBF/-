var Square=function(){
	//块数据
	this.data=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	//位置数据(二维数组的左上角)
	this.origin={
		x:0,
		y:0
	}
	this.dir=0; //三维数组的索引
	/*this.up=[  //存储四中快形态的三位数组
		[
			[0,2,0,0],
			[0,2,0,0],
			[0,2,0,0],
			[0,2,0,0]
		],
		[
			[0,0,0,0],
			[2,2,2,2],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,2,0,0],
			[0,2,0,0],
			[0,2,0,0],
			[0,2,0,0]
		],
		[
			[0,0,0,0],
			[2,2,2,2],
			[0,0,0,0],
			[0,0,0,0]
		],
	]*/
}
Square.prototype.canDown=function(isValid){
	var test={};//用作判断合法性的数据缓存
	test.x=this.origin.x+1;
	test.y=this.origin.y;
	return isValid(test,this.data);
}
Square.prototype.down=function(){
	this.origin.x+=1;
}
Square.prototype.canLeft=function(isValid){
	var test={};//用作判断合法性的数据缓存
	test.x=this.origin.x;
	test.y=this.origin.y-1;
	return isValid(test,this.data);
}
Square.prototype.left=function(){
	this.origin.y-=1;
}
Square.prototype.canRight=function(isValid){
	var test={};//用作判断合法性的数据缓存
	test.x=this.origin.x;
	test.y=this.origin.y+1;
	return isValid(test,this.data);
}
Square.prototype.right=function(){
	this.origin.y+=1;
}
Square.prototype.canUp=function(isValid){
	var len=this.data.length;
	var oneArrayLen=this.data[0].length;
	var d=(this.dir+1)%4;
	
	/*if(d==4){
		console.log(4);
		d=0;
	}*/
	var test=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];//用作判断合法性的数据缓存
	for(var i=0;i<len;i++){
		for(var j=0;j<oneArrayLen;j++){
			test[i][j]=this.up[d][i][j];
		}
	}
	//console.log(this.origin);
	return isValid(this.origin,test);
}
Square.prototype.uprotate=function(){
	var len=this.data.length;
	var oneArrayLen=this.data[0].length;
	this.dir=(this.dir+1)%4;
	console.log(this.dir);
	/*if(this.dir==4){
		this.dir=0;
	}*/
	for(var i=0;i<len;i++){
		for(var j=0;j<oneArrayLen;j++){
			this.data[i][j]=this.up[this.dir][i][j];
			console.log(this.dir);
		}
	}
	//console.log(this.up[0]);
	//console.log(this.data);
}