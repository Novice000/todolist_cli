"use strict";
// its possible to define the todo Item as 
// const type = {
//     id: number;
//   task: string;
//   completed: boolean;
// }
// which i frankly prefer as it uses a familiar syntax and I could do something as making a type a string like type ="yes" | "no"
Object.defineProperty(exports, "__esModule", { value: true });
class TodoList {
    constructor() {
        this.list = [];
    }
    addTodo(task, dueDate) {
        let taskDueDate;
        if (dueDate) {
            // i know i already checked in the case 1 of my index.ts
            if (!isNaN(Date.parse(dueDate))) {
                taskDueDate = new Date(dueDate);
            }
            else {
                console.log("Invalid Date format");
                return;
            }
        }
        let item = { id: this.list.length + 1, task, completed: false };
        if (dueDate)
            item = Object.assign(Object.assign({}, item), { dueDate: taskDueDate });
        this.list.push(item);
        console.log("✅ Task added successfully!");
    }
    completeTodo(id) {
        const index = this.list.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.list[index].completed = true;
            console.log("🎉 Task marked as completed!");
        }
        else {
            console.log("🚫 Task with ID " + id + " doesn't exist in the task list.");
            return;
        }
    }
    removeTodo(id) {
        const index = this.list.findIndex((item) => item.id === id);
        if (index !== -1) {
            const [removed] = this.list.splice(index, 1);
            console.log(`🗑️ Removed the task with ID: ${removed.id}, task: ${removed.task}`);
        }
        else {
            console.log("🚫 Task with ID " + id + " doesn't exist in the task list.");
            return;
        }
    }
    listTodos() {
        return this.list;
    }
    filterTodos(completed) {
        return this.list.filter((item) => item.completed === completed);
    }
    updateTodo(id, task) {
        const index = this.list.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.list[index].task = task;
            console.log("✏️ Task updated successfully!");
        }
        else {
            console.log("🚫 Task with ID " + id + " doesn't exist in the task list.");
            return;
        }
    }
    clearCompletedTodos() {
        this.list = this.list.filter((item) => !item.completed);
        console.log("🧹 Cleared all completed tasks.");
    }
}
exports.default = TodoList;
