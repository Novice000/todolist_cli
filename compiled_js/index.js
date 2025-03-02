"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline-sync"));
const chalk_1 = __importDefault(require("chalk"));
const main_1 = __importDefault(require("./main"));
const todoList = new main_1.default();
console.log(chalk_1.default.bgBlue("👋 Welcome to the Todo List CLI App! Here's what you can do: 🎉"));
function ShowChoices() {
    console.log(chalk_1.default.greenBright("0. Show choices"));
    console.log(chalk_1.default.greenBright("1. Add a todo item 📝"));
    console.log(chalk_1.default.greenBright("2. Mark a todo item as completed ✔️"));
    console.log(chalk_1.default.greenBright("3. Remove a todo item 🗑️"));
    console.log(chalk_1.default.greenBright("4. List all todo items 📋"));
    console.log(chalk_1.default.greenBright("5. Filter todo items by completion status 🔍"));
    console.log(chalk_1.default.greenBright("6. Update the task description of a todo item 📝"));
    console.log(chalk_1.default.greenBright("7. Clear all completed todo items 💪"));
    console.log(chalk_1.default.greenBright("8. Exit the app 🚪"));
}
ShowChoices();
let choice = 0;
while (choice !== 8) {
    choice = readline.questionInt("Enter your choice: ");
    switch (choice) {
        case 0: {
            ShowChoices();
            break;
        }
        case 1: {
            const task = readline.question("Enter the task: ");
            const hasDueDate = readline
                .question("Do you have a due date for this task? (y/n): ")
                .toLowerCase() === "y";
            let dueDate;
            if (hasDueDate) {
                dueDate = readline.question("Enter the due date in the format of YYYY-MM-DD: ");
                if (isNaN(Date.parse(dueDate))) {
                    console.log("Invalid date format;");
                    continue;
                }
                todoList.addTodo(task, dueDate);
            }
            else {
                todoList.addTodo(task);
            }
            break;
        }
        case 2: {
            const id = readline.questionInt("Enter the ID of the todo item to mark as completed: ");
            todoList.completeTodo(id);
            break;
        }
        case 3: {
            const id = readline.questionInt("Enter the ID of the todo item to remove: ");
            const confirm = readline.question("Are you sure? (y/n): ");
            if (confirm.toLowerCase() !== "y")
                continue;
            todoList.removeTodo(id);
            break;
        }
        case 4: {
            console.log("📋 Todo List:");
            console.table(todoList.listTodos());
            break;
        }
        case 5: {
            const completedString = readline.question("Enter true to filter completed todo items, false to filter incomplete todo items: ");
            let completed;
            if (completedString.toLowerCase() === "true")
                completed = true;
            else if (completedString.toLowerCase() === "false")
                completed = false;
            else {
                console.log("❌ Invalid input; accepts true or false only.");
                continue;
            }
            const filteredTodos = todoList.filterTodos(completed);
            console.log("📋 Filtered Todo List:");
            console.table(filteredTodos);
            break;
        }
        case 6: {
            const id = readline.questionInt("Enter the ID of the todo item to update: ");
            const task = readline.question("📝 Enter the new task: ");
            todoList.updateTodo(id, task);
            break;
        }
        case 7: {
            todoList.clearCompletedTodos();
            break;
        }
        case 8: {
            console.log("👋 Goodbye!");
            break;
        }
        default: {
            console.log("❌ Invalid choice. Please try again.");
            break;
        }
    }
}
