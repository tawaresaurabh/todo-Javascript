const addButton = document.getElementById('addButton')
let addInput = document.getElementById('itemInput')
let clearButton = document.getElementById('clearButton')
let todoTableBody = document.getElementById('todoTableBodyId')
let todoListArr = []
let todoOpenCountSpan = document.getElementById('openCountSpanId')
let todoDoneCountSpan = document.getElementById('doneCountSpanId')
let todoTotalCountSpan = document.getElementById('totalCountSpanId')
let todoItemsHeader = document.getElementById('todoItemsHeaderId')


let sorted = false;

todoOpenCountSpan.innerText = 0
todoDoneCountSpan.innerText = 0
totalCountSpanId.innerText = 0



function addTodoItem() {


    if (!addInput.value) {
        alert('Please enter some text')
        return
    }
    let itemFound = false


    todoListArr.forEach((todoListItem) => {
        if (todoListItem.data == addInput.value) {
            alert('Item already exists')
            itemFound = true
        }
    });
    if (itemFound) {
        return
    }

    createTodoDom('notDone', addInput.value)

    todoListArr.push({
        data: addInput.value,
        state: 'notDone'
    })

    addInput.value = ''
    updateCounts()

}

function createTodoDom(state, text) {

    let todotr = document.createElement('tr')
    let todoText = document.createElement('td')
    let todoActions = document.createElement('td')
    let buttonSpan = document.createElement('span')
    let removeButton = document.createElement('button')
    let emptySlash = document.createElement('label')
    let doneButton = document.createElement('button')
    if (state == 'notDone') {
        todoText.innerText = text
        doneButton.innerText = 'Done'
        doneButton.className = 'btn btn-success'
        doneButton.addEventListener('click', completeTodoItem)
    } else {
        let strikeOut = document.createElement('del')
        todoText.appendChild(strikeOut)
        strikeOut.innerText = text
        doneButton.innerText = 'Not Done'
        doneButton.className = 'btn btn-success'
        doneButton.addEventListener('click', incompleteTodoItem)
    }

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

}

function updateCounts() {
    
    let openCountArr = todoListArr.filter((todoListItem) => {
        return todoListItem.state == 'notDone'

    })

    let doneCountArr = todoListArr.filter((todoListItem) => {
        return todoListItem.state == 'done'

    })

    todoTotalCountSpan.innerText = todoListArr.length
    todoOpenCountSpan.innerText = openCountArr.length
    todoDoneCountSpan.innerText = doneCountArr.length

}

function removeTodoItem() {
    let rmButton = this
    let tr = rmButton.parentElement.parentElement.parentElement
    let data = tr.children[0].innerText
    tr.parentElement.removeChild(tr)
    todoListArr = todoListArr.filter((todoListItem) => {
        return todoListItem.data != data
    })
    updateCounts()

}

function incompleteTodoItem() {

    let notDoneButton = this
    let span = this.parentElement
    let tr = notDoneButton.parentElement.parentElement.parentElement
    let todoTexttd = tr.children[0]
    let strikeOutTag = todoTexttd.children[0]
    let todoText = strikeOutTag.innerText
    strikeOutTag.parentElement.removeChild(strikeOutTag)
    todoTexttd.innerText = todoText
    todoListArr.forEach((todoListItem) => {
        if (todoListItem.data == todoText) {
            todoListItem.state = 'notDone'
        }
    })
    updateCounts()

    this.innerText = 'Done'
    this.removeEventListener('click', incompleteTodoItem)
    this.addEventListener('click', completeTodoItem)

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

    todoListArr.forEach((todoListItem) => {
        if (todoListItem.data == todoText) {
            todoListItem.state = 'done'
        }
    })
    updateCounts()

    this.innerText = 'Not Done'
    this.removeEventListener('click', completeTodoItem)
    this.addEventListener('click', incompleteTodoItem)
}


function clearTodo() {
    todoListArr = []
    updateCounts()
    todoTableBody.innerHTML = ''
}


function sortTodoList() {
    todoListArr.sort((a, b) => {
        let sortDataA = a.data.toUpperCase();
        let sortDataB = b.data.toUpperCase();
        if (sorted) {
            if (sortDataA > sortDataB) {
                return -1;
            }
            if (sortDataA < sortDataB) {
                return 1;
            }
        } else {
            if (sortDataA < sortDataB) {
                return -1;
            }
            if (sortDataA > sortDataB) {
                return 1;
            }
        }
        return 0;
    })


    if (!sorted) {
        sorted = true
    } else {
        sorted = false
    }

    todoTableBody.innerHTML = ''
    todoListArr.forEach((todoListItem) => {
        createTodoDom(todoListItem.state, todoListItem.data)
    })

}

addButton.addEventListener('click', addTodoItem)
clearButton.addEventListener('click', clearTodo)
todoItemsHeader.addEventListener('click', sortTodoList)












