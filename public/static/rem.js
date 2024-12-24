var html = document.documentElement;
window.rem = html.getBoundingClientRect().width / 750 *100;
// html.style.fontSize = window.rem + 'px';
html.style.setProperty('font-size',window.rem + 'px','important')
window.addEventListener('resize', function () {
			var html = document.documentElement;
			window.rem = html.getBoundingClientRect().width / 750 *100;
			// html.style.fontSize = window.rem + 'px';
			html.style.setProperty('font-size',window.rem + 'px','important')
})
