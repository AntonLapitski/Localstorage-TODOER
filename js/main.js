window.addEventListener("load", startup);

function startup() {

  	document.querySelector('.btn').addEventListener('click', createTask);
	
	const buttons = document.querySelectorAll('.btn-delete');
	
	buttons.forEach(function(currentBtn){
  		currentBtn.addEventListener('click', deleteTask);
	});

	const buttonsEdit = document.querySelectorAll('.btn-edit');

	buttonsEdit.forEach(function(currentBtn){
  		currentBtn.addEventListener('click', editTask);
	});

	const buttonsSave = document.querySelectorAll('.btn-save');

	buttonsSave.forEach(function(currentBtn){
  		currentBtn.addEventListener('click', saveTask);
	});

}

function createTask() {
	
	var name = document.getElementById('task_name').value;
	var responsible = document.getElementById('task_responsible').value;
	var hours = document.getElementById('task_hours').value;
	var arr = [name,responsible,hours,'edit','delete'];
	var id = getLast();

	if(id == Number.NEGATIVE_INFINITY){
		id = 0;
	}
	
	if (arr.includes('')) {
		alert('Some of the fields is empty');
	}

	if(!arr.includes('')) {
		
		var table = document.getElementById("my_table");
		var row = table.insertRow(1);

		for (var i = 0; i <=4; i++) {
			
			var cell = row.insertCell(-1);
			var newID = id + 1;
			if(arr[i] === 'edit'){
				arr[i] = "<button id='edit-" + newID +"'class='btn-edit'>Edit</button>" +
						 "<button id='save-" + newID +"'class='btn-save'>Save</button>";
			}

			if (arr[i] === 'delete') {
				arr[i] = "<button id='delete-" + newID +"'class='btn-delete'>Delete</button>";
			}

			cell.innerHTML = arr[i];
		}
		
		id++;	
		localStorage.setItem(id, arr);
		location.reload();	
	}

}

function tasks() {

	var values = allStorage();

	for (var i = 0; i < values.length; i++) {
		
		var table = document.getElementById("my_table");
		var row = table.insertRow(1);
		var test = values[i].split(",");

		for (var j = 0; j < test.length; j++) {
				
			var cell = row.insertCell(-1);
			cell.innerHTML = test[j];
		}	
	}
}

function editTask() {

	 var current = getSecondPart(this.id);
	 var index = 0;
	 var count = 0;

	 for (var i = 0; i < document.getElementById("my_table").rows.length; i++) {
	 	
	 	var one = document.getElementById("my_table").rows[i].innerHTML;
	 	one = one.substring(one.length, one.indexOf('edit-'));
	 	one = one.substring(0, one.indexOf('"'));
	 	one = getSecondPart(one);

 		if (one == current) {
	 		index = i;
	 		break;
 		}
	 }

	 checker = getParts(document.getElementById("my_table").rows[index].innerHTML);

	 for (var i = 0; i < checker.length; i++) {
	 	document.getElementById("my_table").rows[index].cells[i].innerHTML = "<input id='inpt-" + current + i + "'type='text' value=" + checker[i] + ">";
	 }
}

function deleteTask() {
	var id = getSecondPart(this.id);
	localStorage.removeItem(id);
	location.reload();
}

function saveTask() {

	var current = getSecondPart(this.id);
	var name = document.getElementById('inpt-'+ current + 0).value;
	var responsible = document.getElementById('inpt-' + current + 1).value;
	var hours = document.getElementById('inpt-'+ current + 2).value;
	var arr = [name,responsible,hours,'edit','delete'];
	var id = getLast();

	localStorage.removeItem(current);
	location.reload();
	if (arr.includes('')) {
		alert('Some of the fields is empty');
	}

	if(!arr.includes('')) {
		
		var table = document.getElementById("my_table");
		var row = table.insertRow(1);

		for (var i = 0; i <=4; i++) {
			
			var cell = row.insertCell(-1);
			var newID = id + 1; 
			if(arr[i] === 'edit'){
				arr[i] = "<button id='edit-" + newID +"'class='btn-edit'>Edit</button>" +
						 "<button id='save-" + newID +"'class='btn-save'>Save</button>";
			}

			if (arr[i] === 'delete') {
				arr[i] = "<button id='delete-" + newID +"'class='btn-delete'>Delete</button>";
			}

			cell.innerHTML = arr[i];
		}
		
		id++;		
		localStorage.setItem(id, arr);
		location.reload();
	}
}

function getLast() {
	var obj = Object.keys(localStorage);
	var arr = Object.values(obj);
	var last = arr[arr.length-1];
	var max = Math.max.apply(null, arr);
	return max;
}

function getSecondPart(str) {

    return str.split('-')[1];
}

function getParts(str) {

	str = str.split('</td>').join(',');
	str = str.split('<td>').join('');
	str = str.substring(0, str.indexOf('<'));
	var arr = str.split(",");
	arr.splice(-1,1);
	return arr;
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}
