 var home = document.getElementsByClassName('home')[0];
 var ins = document.getElementsByClassName('in')[0];
 function disno(){
 	home.style.display='none';
 	ins.style.display='inherit';
 	console.log(home);
 }
 function dis(){
 	ins.style.display='none';
 	home.style.display='';
 	console.log(ins);
 }
