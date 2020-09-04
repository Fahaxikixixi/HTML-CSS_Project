(function() {
	let html = document.documentElement;
	let hw = html.getBoundingClientRect().width;
	// 30rem = 750px
	// 1rem = 25px
	html.style.fontSize = hw / 30 + 'px';
})()