var xhr = new XMLHttpRequest();
var context=new AudioContext();
var bufferSource=null;
var source = null;
var audioBuffer = null;
var gainNode=context.createGain();
var numberofmusic=4;



var startOffset=0;
var startTime=0;
var state=1;

var playtime=0,pausetime=0;
var clear=0;
var total=0;
var state=0;// 0表示暂停 1表示正在播放
function play(){
	
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline";
	bufferSource=context.createBufferSource();
	bufferSource.buffer=audioBuffer;
	bufferSource.connect(gainNode);
	bufferSource.start(0,playtime,bufferSource.duration);
	state=1;
	addplaytime();
	
	source=bufferSource;	

}
function play2(){//切歌
	stopplaytime();
	playtime=0;
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline";
	bufferSource=context.createBufferSource();
	bufferSource.buffer=audioBuffer;
	bufferSource.connect(gainNode);
	bufferSource.start(0,playtime,bufferSource.duration);
	state=1;
	addplaytime();
	
	source=bufferSource;	
}

function addplaytime(){
	clear=setTimeout("addplaytime()",1000);
	playtime=playtime+1;
	// document.getElementById("schedule").max=total;
	// document.getElementById("schedule").value=playtime;
	document.getElementById("schedule").value=(playtime/total)*1000;
}


function stopplaytime(){
	clearTimeout(clear);
}




function pause(){
	document.getElementById("play").style.display="inline";
	document.getElementById("pause").style.display="none";
	bufferSource.stop();
	state=0;
	stopplaytime();
}


gainNode.connect(context.destination);


var fileurls=new Array(numberofmusic);
for(var j=0;j<=numberofmusic-1;j++)
	fileurls[j]='audio/'+j+'.mp3';
var current=0;

function loadSoundFile(i){
	current=i;
	loadAudioFile(fileurls[i]);
}



function pre(){
	
	if (current==0) {
		current=numberofmusic-1;
		loadSoundFile(current);
	}else{
		loadSoundFile(current-1);
	}
}

function next(){
	if (current==numberofmusic-1) {
		current=0;
		loadSoundFile(current);
	}else{
	loadSoundFile(current+1);
	}
}

var count=0;

function loadAudioFile(url) {
	var n=++count;
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    if(source){
		source.stop();
	}
    xhr.abort();//终止掉上一次的请求
    xhr.open("GET",url,true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) { //下载完成
    	if(n!=count)return;
        context.decodeAudioData(this.response,function(buffer){
        	total=buffer.duration;
        	// document.getElementById("schedule").max=total;
    		audioBuffer=buffer;
    		play2();
        	},function(e){
        	
        })
    };
    xhr.send();
}


function changeVolume(){
	var value=document.getElementById("volume").value;
	var percent=value/100;
	gainNode.gain.value=percent;
}


var offset=0;
function changeSchedule(){
	offset=document.getElementById("schedule").value;
	playtime=(offset/1000)*total;
	document.getElementById("schedule").value=offset;
	// addplaytime();
	// stopplaytime();
	if(state==0){
		//暂停
	}else if (state==1) {
		pause();
		document.getElementById("play").style.display="none";
		document.getElementById("pause").style.display="inline";
		bufferSource=context.createBufferSource();
		bufferSource.buffer=audioBuffer;
		bufferSource.connect(gainNode);
		bufferSource.start(0,playtime,bufferSource.duration);
		state=1;
		addplaytime();
	
		source=bufferSource;	
	}

	




	
	// bufferSource.start(0,playtime,total);
	
	// addplaytime();
	
	source=bufferSource;
}