button.onclick = () => {
	console.log('Clicked');
	alert('You clicked me')
}

function numberCount() {
	var array = [1, 2, 3];
	for (let index = 0; index < array.length; index++) {
		const element = array[index];
		alert(`The number is ${element}`);
	}
}

myDiv.addEventListener('mousemove', function(event) {
	const red = Math.floor(Math.random() * 250);
	const green = Math.floor(Math.random() * 250);
	const blue = Math.floor(Math.random() * 250);
	this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
	document.getElementById('xAxis').innerHTML = 'X-AXIS: ' + event.clientX;
	document.getElementById('yAxis').innerHTML = 'Y-AXIS: ' + event.clientY;
});

myDiv2.addEventListener('mousemove', (event) => {
	event.stopPropagation();
});

myDiv2.addEventListener('mouseenter', () => {
	console.log('Mouse entered DIV-2....');
});

// inner.addEventListener('click', (event) => {
// 	console.log('Inner clicked....');

// 	event.stopPropagation();
// });

function onClick() {
	console.log('onClick/.....');
}
outer.addEventListener('mouseenter', (event) => {

	const currentElement = document.getElementById('outer');
	console.log(currentElement.childNodes.length);
	if(currentElement.childNodes.length == 0) {
		const inner = document.createElement('div')
		inner.setAttribute('class', 'inner')
		inner.setAttribute('id', 'inner')
		inner.setAttribute('onclick', 'onClick()')
		currentElement.appendChild(inner)
	}
	// event.stopPropagation();
});

outer.addEventListener('mouseleave', (event) => {

	const currentElement = document.getElementById('outer');
	console.log(currentElement.childNodes.length,'0000');
	const innerChild = document.getElementById('inner');
	console.log(event.target);
	// if(event.target.id !== 'outer') {
		currentElement.removeChild(innerChild)
	// }
	// if(currentElement.childNodes.length == 0) {
	// 	const inner = document.createElement('div')
	// 	inner.setAttribute('class', 'inner')
	// 	inner.setAttribute('id', 'inner')
	// 	currentElement.appendChild(inner)
	// }
	// event.stopPropagation();
});


// DRAG AND DROP

var dragged;
document.addEventListener("dragstart", function(event) {
	dragged = event.target;
	event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
	dragged = event.target;
	event.target.style.opacity = '';
}, false);

document.addEventListener("dragenter", function(event) {
	console.log('Drag Entered: ', event.target.className);
});

document.addEventListener("drop", function(event) {
	console.log('Dropped');
	// if(event.target.className == 'column content') {
		dragged.parentNode.removeChild(dragged);
		event.target.appendChild(dragged);
	// }
}, false);

document.addEventListener("dragover", function(event) {
	event.preventDefault();	// prevent default to allow drop
  }, false);


