function vec3(x,y,z){
this.x=x;
this.y=y;
this.z=z;

this.n=function(){
	return new vec3(-this.x,-this.y,-this.z);
}
this.mod=function(){
	return Math.sqrt(Math.pow(this.x)+Math.pow(this.y)+Math.pow(this.z));
}
this.unit=function(){
	return this.div(this.mod());
}
this.mul=function(a){
	return new vec3(this.x*a,this.y*a,ythis.z*a);
}
this.div=function(a){
	return this.mul(1/a);
}
}
vec3.prototype.rtrans=function(i,a,b,c){//a,b,c  rx ry rz
    var a=a*Math.PI/180;
	var b=b*Math.PI/180;
	var c=c*Math.PI/180;
	var d={   //rotate around x
		x:i.x,
		y:i.y*Math.cos(a)-i.z*Math.sin(a),
		z:i.y*Math.sin(a)+i.z*Math.cos(a)};
		d={ //rotate around y
			x:d.x*Math.cos(b)+d.z*Math.sin(b),
			y:d.y,
			z:d.z*Math.cos(b)-d.x*Math.sin(b)};
		d={//rotate around z
			x:d.x*Math.cos(c)-d.y*Math.sin(c),
			y:d.x*Math.sin(c)+d.y*Math.cos(c),
			z:d.z};
			
	return new vec3(d.x,d.y,d.z);
	}
	
	vec3.prototype.trans=function(a){
		a=ttrans(a);
		a=rtrans(a);
		var b={x:0,y:0,z:0};
		b.x=(a.x)/a.z;
		b.y=(a.y)/a.z;
		b.z=a.z;
		return new vec3(b.x,b.y,b.z);
	}
	vec3.prototype.cross=function(a,b){
		return new vec3((a.y*b.z)-(a.z*b.y),(a.z*b.x)-(a.x*b.z),(a.x*b.y-a.y*b.x));
	}
	vec3.prototype.dot=function(a,b){
		return a.x*b.x+a.y*b.y+a.z*b.z;
	}

	
function trisurf(a,b,c){
this.a=a;
this.b=b;
this.c=c;
this.f=vec3.cross(vec3.sub(b,a),vec3.sub(c,b)).unit();

}
/*
function qsurf(a,b,c,d){//please make sure this four point is in one surface
this.a=a;
this.b=b;
this.c=c;
this.d=d;
this.f=vec3.cross(vec3.sub(b,a),vec3.sub(c,b));
}*/
function ray3(a,b){
	this.p=a;
	this.d=b.unit();//p=point d=direction
}//a,b vec3
function raysurf(r,t){//ray cross with squre
var e1=t.b-t.a;
var e2=t.c-t.a;
var d=r.d.unit();
var o=r.p;
var tt=vec3.sub(o,t.a);
var p=vec3.cross(d,e2);
var q=vec3.cross(tt,e1);
var g=vec3.dot(p,e1).mod
var t=vec3.dot(q,e2)/g;
var u=vec3.dot(p,t)/g;
var v=vec3.dot(q,d)/g;
if(u<0||v<0||u>1||v>1||t<0){
	return false;
}else{
	return {pp:vec3.add(o,d.mul(t)),t:t,u:u,v:v};
}
}
function ri(r,t){
	return vec3.sub(r.d,vec3.dot(r.d,t.f).mul(t.f)).unit();
}
function fs(r,t){
	var rr=raysurf(r,t);
	if(rr!=false){
		return ray3(rr,ri(r,t));
	}else{
		return false;
	}
}
//TODO:  Add Zhe She And complete the whole scene below...
//Re TODO: Fuck the Zhe She...Screw you guys, I'm going home..

