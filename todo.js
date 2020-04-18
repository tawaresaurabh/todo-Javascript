const addButton = document.getElementById('addButton')
let addInput = document.getElementById('itemInput')
let clearButton = document.getElementById('clearButton')
let todoTableBody = document.getElementById('todoTableBodyId')
let todoList = []



function listItemObj(content, status) {
    this.content = '';
    this.status = 'incomplete';
}

function addTodoItem() {

    let todotr = document.createElement('tr')
    let todoText = document.createElement('td')
    let todoActions = document.createElement('td')
    todoText.innerText = addInput.value
    let buttonSpan = document.createElement('span')
    let removeButton = document.createElement('button')
    let emptySlash = document.createElement('label')
    let doneButton = document.createElement('button')
    doneButton.innerText = 'Done'
    doneButton.className = 'btn btn-success'
    doneButton.addEventListener('click', completeTodoItem)
    removeButton.innerText = 'Remove'
    removeButton.className = 'btn btn-danger'
    removeButton.addEventListener('click', removeTodoItem)
    emptySlash.innerText = '  /  '
    buttonSpan.appendChild(doneButton)
    buttonSpan.appendChild(emptySlash)
    buttonSpan.appendChild(removeButton)
    todoActions.appendChild(buttonSpan)
    todotr.appendChild(todoText)
    todotr.appendChild(todoActions)
    todoTableBody.appendChild(todotr)
    addInput.value = ''


}

function removeTodoItem() {
    let rmButton = this
    let tr  = rmButton.parentElement.parentElement.parentElement    
    tr.parentElement.removeChild(tr)
}

function completeTodoItem() {    
    let dnButton = this
    let span = this.parentElement
    let tr = dnButton.parentElement.parentElement.parentElement        
    let todoTexttd = tr.children[0]
    let todoText = todoTexttd.innerText    
    todoTexttd.innerText = ''
    let strikeOut = document.createElement('del')
    todoTexttd.appendChild(strikeOut)
    strikeOut.innerText = todoText
    span.removeChild(span.children[0])
    span.removeChild(span.children[0])

}


function clearTodo() {
    todoTableBody.innerHTML = ''
}


addButton.addEventListener('click', addTodoItem)
clearButton.addEventListener('click', clearTodo)













