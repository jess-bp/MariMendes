class Task {
    constructor(nome, telefone, email, texto){
        this.nome = nome
        this.telefone = telefone
        this.email = email
        this.texto = texto
    }
}

class Database {

    constructor(){
        const id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    loadTasks() {
        const tasks = Array()
        
        const id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            const task = JSON.parse(localStorage.getItem(i))

            if(task === null){
                continue
            }

            task.id = i
            tasks.push(task)
        }
        return tasks
    }

    createTask(task) {
        const id = getNextId()
        localStorage.setItem(id, JSON.stringify(task))
        localStorage.setItem('id', id)
    }

    removeTask(id) {
        localStorage.removeItem(id)
    }

    searchTasks(task) {
        let filteredTasks = Array()

        filteredTasks = this.loadTasks()

        if(task.year !== '') {
            filteredTasks = filteredTasks.filter(t => t.nome === task.nome)
        }

        if(task.month !== '') {
            filteredTasks = filteredTasks.filter(t => t.telefone === task.telefone)
        }

        if(task.day !== '') {
            filteredTasks = filteredTasks.filter(t => t.email === task.email)
        }

        if(task.type !== '') {
            filteredTasks = filteredTasks.filter(t => t.texto === task.texto)
        }

        return filteredTasks
    }
}

const database = new Database()

function getNextId() {
    const nextId = localStorage.getItem('id')
    return parseInt(nextId) + 1;
}

function registerTask() {
    const nome        = document.getElementById('nome').value
    const telefone    = document.getElementById('telefone').value
    const email       = document.getElementById('email').value
    const texto       = document.getElementById('texto').value

    const task = new Task(nome, telefone, email, texto)

    if(task.validateData()){
        database.createTask(task)
    }
}

function searchTasks() {
    const nome        = document.getElementById('nome').value
    const telefone    = document.getElementById('telefone').value
    const email       = document.getElementById('email').value
    const texto       = document.getElementById('texto').value

    const task = new Task(nome, telefone, email, texto)

    const tasks = database.searchTasks(task)

    loadTasks(tasks)
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.body.contains(document.getElementById('listTasks'))){
        loadTasks()
    }
})