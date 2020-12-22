document.addEventListener('DOMContentLoaded', (event) => {

	var container = document.querySelector('.container');
	var list = document.querySelector('.list-group.undone');
	var listDone = document.querySelector('.list-group.done');
	var listItem = list.children;
	var li;
	let tasks = [
		{
			name : "Anwser first mail",
			id : 0,
			orderId : 0,
			state : "undone"
		},
		{
			name : "Review second conscendum",
			id : 1,
			orderId : 1,
			state : "undone"
		},
		{
			name : "Prepare event #3",
			id : 2,
			orderId : 2,
			state : "undone"
		},
		{
			name : "Finish project Lorem Ipsum",
			id : 3,
			orderId : 3,
			state : "undone"
		},
		{
			name : "Done task project Ipsum",
			id : 4,
			orderId : 4,
			state : "done"
		},
	];

	//******************************//
	//******* Initialisation *******//
	//******************************//

	// Initialiase list HTML
	for (i = 0; i < tasks.length ; i++) {
		HTMLTaskCreator(tasks[i].name, tasks[i].id, tasks[i].orderId, tasks[i].state);
	}

	//******************************//
	//********** Helpers ***********//
	//******************************//

	// Adds action buttons to every list item
	function addsButton(element) {
		var buttonsDiv = document.createElement('div');
		buttonsDiv.className = 'ml-auto btn-group list-group-btn';
		buttonsDiv.innerHTML = `<!--
		   		--><span class="btn px-2 btn-sm btn-edit btn-secondary" data-toggle="modal" data-target="#editModal"><svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg></span><!--
				--><span class="btn px-2 btn-sm btn-up btn-secondary"><svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg></span><!--
				--><span class="btn px-2 btn-sm btn-down btn-secondary"><svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></span><!--
				--><span class="btn px-2 btn-sm btn-delete btn-secondary text-danger mr-3"><svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg></span>
			</div>`;
		element.appendChild(buttonsDiv);
	};
	// Deletes task in object 
	function taskDeletor(idel) {
		const currentTask = tasks.find( el => el.id == idel);
		let taskIndex = tasks.indexOf(currentTask);
		tasks.splice(taskIndex, 1);;
	}
	// Creates task in object 
	function taskCreator(nameValue, idValue, orderValue, stateValue) {
		tasks.push({name:nameValue,id:idValue,orderId:orderValue,state:stateValue});
	}
	// Creates task in DOM and in Object
	function HTMLTaskCreator(name, idValue, orderValue, stateValue, animated) {
		var newItem = document.createElement('li');
		if (animated) {
			newItem.className = 'list-group-item align-items-center animate__animated animate__fadeInDown animate__faster';
		} else {
			newItem.className = 'list-group-item align-items-center';
		}
		newItem.innerHTML = `
			<div class="form-check col pretty p-bigger p-smooth p-round p-icon">
				<input class="form-check-input" type="checkbox" value="" id="">
				<div class="state">
					<span class="icon mdi mdi-check"><svg style="width:14px;height:14px" viewBox="0 0 24 24"><g><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /><g></svg></span>
					<label class="form-check-label" for="">
						` + name + 
					`</label>
           		</div>
           	</div>`;
		newItem.setAttribute('data-task-id', idValue);
		newItem.setAttribute('data-task-order-id', orderValue);
		newItem.querySelector('.form-check-label').setAttribute('for', 'listItem'+idValue);
		newItem.querySelector('.form-check-input').setAttribute('id', 'listItem'+idValue);
		addsButton(newItem);
		if (stateValue == "undone") {
			list.appendChild(newItem);
			newItem.querySelector('.form-check-input').checked = false;
		} else {
			listDone.appendChild(newItem);
			newItem.querySelector('.form-check-input').checked = true;
		}
		// Creates task in object if does not already exists
		var idAlreadyExists = false;
		for(var x = 0; x < tasks.length; x++) {
		    if (tasks[x].id == idValue) {
		        idAlreadyExists = true;
		        break;
		    }
		}
		if (idAlreadyExists === false) {
			taskCreator(name, idValue, orderValue, stateValue);
		}
	}

	//******************************//
	//****** Task Modification *****//
	//******************************//
	
	// Adds new task
	container.addEventListener('click', (event) => {
		var newItemButton = document.getElementById('newItemButton');
		if (event.target == newItemButton) {
			var nameValue = document.getElementById('newItem').value;
			var idValue = tasks.length;
			var newItemOrder = document.querySelector('.list-group.undone').childNodes.length -1;
			var stateValue = "undone";
			// Creates task in DOM & Object
			HTMLTaskCreator(nameValue, idValue, newItemOrder, stateValue, true);
			let li = document.querySelector('.list-group.undone').lastChild;
			// Clears input
			document.getElementById('newItem').value = '';
			let classesToRemove = [ 'animate__animated', 'animate__fadeInDown', 'animate__faster'];
			setTimeout(function(){
				li.classList.remove(...classesToRemove);
			}, 800);
		}
	});

	list.addEventListener('click', (event) => {
		// REMOVE
		if (event.target.classList.contains('btn-delete')) {
			let li = event.target.parentNode.parentNode;
			let index = li.getAttribute('data-task-id');
			let classesToAdd = [ 'animate__animated', 'animate__fadeOutUp'];
			li.classList.add(...classesToAdd);
			
			setTimeout(function(){ 
				// remove task in object
				taskDeletor(index);
				// remove task in HTML
				li.remove();
				for (i = 0; i < tasks.length ; i++) {
					// resets orders iD in Object
					if (document.querySelectorAll('.list-group-item')[i]) {
						document.querySelectorAll('.list-group-item')[i].setAttribute('data-task-order-id', i);
					}
					// resets orders iD in DOM
					tasks[i].orderId = i;
				}
			}, 800);

		}
		// MOVE UP
		if (event.target.classList.contains('btn-up')) {
			let li = event.target.parentNode.parentNode;
			let taskId = li.getAttribute('data-task-id');
			let taskOrderId = li.getAttribute('data-task-order-id');
			let liBefore = li.previousElementSibling;

			if (liBefore) {
				let taskBeforeId = liBefore.getAttribute('data-task-id');;
				let taskBeforeOrderId = liBefore.getAttribute('data-task-order-id');
				// Change order id in object
				taskBeforeOrderId++;
				taskOrderId--;
				// matches lis with right tasks ids in Object
				const currentTask = tasks.find( el => el.id == taskId);
				const currentTaskBefore = tasks.find( el => el.id == taskBeforeId);
				currentTask.orderId = taskOrderId;
				currentTaskBefore.orderId = taskBeforeOrderId;
				// Change task position in DOM
				list.insertBefore(li, liBefore);
				// Change task orderId in DOM
				li.setAttribute('data-task-order-id', taskOrderId);
				liBefore.setAttribute('data-task-order-id', taskBeforeOrderId);
			}
		}
		// MOVE DOWN
		if (event.target.classList.contains('btn-down')) {
			let li = event.target.parentNode.parentNode;
			let taskId = li.getAttribute('data-task-id');
			let taskOrderId = li.getAttribute('data-task-order-id');
			let liAfter = li.nextElementSibling;

			if (liAfter) {
				let taskAfterId = liAfter.getAttribute('data-task-id');
				let taskAfterOrderId = liAfter.getAttribute('data-task-order-id');
				// Changer order id in object
				taskAfterOrderId--;
				taskOrderId++;
				// matches lis with right tasks ids in Object
				const currentTask = tasks.find( el => el.id == taskId);
				const currentTaskAfter = tasks.find( el => el.id == taskAfterId);
				currentTask.orderId = taskOrderId;
				currentTaskAfter.orderId = taskAfterOrderId;
				// Change task position in DOM
				list.insertBefore(liAfter, li);
				// Change task orderId in DOM
				li.setAttribute('data-task-order-id', taskOrderId);
				liAfter.setAttribute('data-task-order-id', taskAfterOrderId);
			}
		}
	});
	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('form-check-label')) {
			event.preventdefault();
		}
	});
	// CHANGE TASK STATE
	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('form-check-input')) {
			let li = event.target.parentNode.parentNode;
			let taskId = li.getAttribute('data-task-id');
			let input = event.target;

			if(input.checked == false) {
				li.classList.remove('half-opacity');
				let classesToAdd = [ 'animate__animated', 'animate__fadeInDown'];
				li.classList.add(...classesToAdd);
				tasks[taskId].state = "undone";
				list.appendChild(li);
				setTimeout(function(){
					li.classList.remove(...classesToAdd);
				}, 800);
		    } else if (input.checked == true) {
				let classesToAdd = [ 'animate__animated', 'animate__fadeOutUp'];
				li.classList.add('half-opacity');
				setTimeout(function(){ 
					li.classList.add(...classesToAdd);
					setTimeout(function(){ 
						listDone.appendChild(li);
						tasks[taskId].state = "done";
						li.classList.remove(...classesToAdd);
					}, 800);
				}, 800);
		    }
		}
	});
	// EDIT TASK NAME
	function modifyTaskName () {
		let formInputValue;
		let taskId;
		let editModalForm = document.getElementById('editForm');

		list.addEventListener('click', (event) => {
			if (event.target.classList.contains('btn-edit')) {
				let li = event.target.parentNode.parentNode;
				taskId = li.getAttribute('data-task-id');
			}
		});
		editModalForm.addEventListener('submit', (event) => {
			event.preventDefault();
			let formInput = document.getElementById('editContentInput');
			formInputValue = formInput.value;
			document.querySelector('[data-task-id="'+taskId+'"] .form-check-label').innerHTML = formInputValue;
			tasks[taskId].name = formInputValue;
			formInput.value = '';
			$('#editModal').modal('hide');
		});
	} 
	modifyTaskName();

	// Toggles, hide and show content
	// accessing the elements with same classname
	const hideAndSeeks = document.querySelectorAll('.hide-and-seek');
	// adding the event listener by looping
	hideAndSeeks.forEach(element => {
		let elementToHide = element.querySelector('.hide-and-seek-content');
		let toggleButton = element.querySelector('.hide-and-seek-btn');
		if (elementToHide.style.display == "block") {
			toggleButton.textContent = "Hide";
		} else {
			toggleButton.textContent = "Show";
		}
		element.addEventListener('click', (event) => {
			if (event.target == toggleButton) {
				let elementToHide = toggleButton.closest('.hide-and-seek').querySelector('.hide-and-seek-content');
				if (elementToHide.style.display == "block") {
					elementToHide.style.display = "none";
					toggleButton.textContent = "Show";
				} else {
					elementToHide.style.display = "block";
					toggleButton.textContent = "Hide";
				}
			}
		});
	});
})
