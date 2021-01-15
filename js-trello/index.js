// Card Actions
let cardName = 'new item';
let trelloSections;
/*
	trelloSections: {
		todo: [],
		doing: [],
		done: []
	}
*/

document.addEventListener('click', (event) => {
	const actions = ['todo', 'doing', 'done'];
	const parentNode = document.getElementById(`${event.target.id}-trello`);
	if(actions.includes(event.target.id)) {
		const saveItemDiv = document.createElement('div')
		saveItemDiv.setAttribute('id', 'set-item-div');

		const newInput = document.createElement('input')
		newInput.type = 'text';
		newInput.setAttribute('class', 'input-field form-control');
		newInput.setAttribute('value', 'new item');
		newInput.setAttribute('oninput', 'onChangeCardName(event)')
		saveItemDiv.appendChild(newInput)


		const saveButton = document.createElement('button');
		saveButton.type = 'button';
		saveButton.style.backgroundColor = 'lightgreen';
		saveButton.innerHTML = 'Save';
		saveButton.setAttribute('class', 'trello-buttons cursor');
		saveButton.setAttribute('onclick', "onSaveItem()");
		saveItemDiv.appendChild(saveButton);

		const cancelButton = document.createElement('button');
		cancelButton.type = 'button';
		cancelButton.style.backgroundColor = 'lightcoral';
		cancelButton.innerHTML = 'Cancel';
		cancelButton.setAttribute('class', 'trello-buttons')
		saveItemDiv.appendChild(cancelButton);

		parentNode.appendChild(saveItemDiv);
		newInput.select();
	}
})

const onChangeCardName = function(event) {
	cardName = event.target.value;
}

const onSaveItem = function() {
	const saveItemDiv = document.getElementById('set-item-div');
	const savedItem = document.createElement('div');
	savedItem.setAttribute('class', 'form-control trello-item');

	const trelloAction = saveItemDiv.parentElement.className.split('-')[0];
	savedItem.setAttribute('id', `${trelloAction}-${cardName}`);
	savedItem.innerHTML = cardName;

	trelloSections[trelloAction].push(cardName);
	saveItemDiv.parentNode.appendChild(savedItem)
	saveItemDiv.parentNode.removeChild(saveItemDiv);

	localStorage.setItem('trello', JSON.stringify(trelloSections));
	cardName = 'new item';
}


document.addEventListener("DOMContentLoaded", () => {
	trelloSections = JSON.parse(localStorage.getItem('trello'));
	if(!trelloSections) {
		localStorage.setItem('trello', JSON.stringify({
			todo: [],
			doing: [],
			done: []
		}));
	}

	for(let section in trelloSections) {
		const currentTrello = document.getElementById(`${section}-trello`);
		const cards = trelloSections[section];

		for(let index in cards) {
			const trelloItem = document.createElement('div');
			trelloItem.setAttribute('class', 'form-control trello-item');
			trelloItem.setAttribute('id', `${section}-${cards[index]}`)
			trelloItem.innerHTML = cards[index];
			currentTrello.appendChild(trelloItem);
		}
	}
	// localStorage.removeItem('trello')
});

function removeItem() {
	console.log('Remove Item....');
}

var hoveredItemId = document;
document.addEventListener("mouseover", function(event) {
	if(event.target.className == 'form-control trello-item') {
		const currentHoverItem = document.getElementById(event.target.id);
		hoveredItemId = event.target.id;
		if(currentHoverItem.childNodes.length == 1) {
			const deleteButton = document.createElement('i');
			deleteButton.setAttribute('class', 'fa fa-trash float-right red cursor');
			deleteButton.setAttribute('onclick', 'removeItem()')
			deleteButton.setAttribute('aria-hidden', 'true');
			currentHoverItem.appendChild(deleteButton);
		}
	}
})

hoveredItemId.addEventListener('mouseout', function(event) {

	if(event.target.className == 'form-control trello-item') {
		const currentHoverItem = document.getElementById(event.target.id);
		deleteIcon = currentHoverItem.childNodes[1];
		if(event.relatedTarget.className != 'fa fa-trash float-right red cursor') {
			currentHoverItem.removeChild(deleteIcon);
		}
	}
})

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
