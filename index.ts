import * as readline from "readline-sync";
import Chalk from "chalk";
import TodoList, { TodoItem, TodoItemWithDueDate } from "./main";

const todoList = new TodoList();
console.log(
  Chalk.bgBlue(
    "👋 Welcome to the Todo List CLI App! Here's what you can do: 🎉"
  )
);
function ShowChoices() {
  console.log(Chalk.greenBright("0. Show choices"));
  console.log(Chalk.greenBright("1. Add a todo item 📝"));
  console.log(Chalk.greenBright("2. Mark a todo item as completed ✔️"));
  console.log(Chalk.greenBright("3. Remove a todo item 🗑️"));
  console.log(Chalk.greenBright("4. List all todo items 📋"));
  console.log(
    Chalk.greenBright("5. Filter todo items by completion status 🔍")
  );
  console.log(
    Chalk.greenBright("6. Update the task description of a todo item 📝")
  );
  console.log(Chalk.greenBright("7. Clear all completed todo items 💪"));
  console.log(Chalk.greenBright("8. Exit the app 🚪"));
}

ShowChoices();

let choice: number = 0;
while (choice !== 8) {
  choice = readline.questionInt("Enter your choice: ");
  switch (choice) {
    case 0: {
      ShowChoices();
      break;
    }
    case 1: {
      const task: string = readline.question("📝 Enter the task: ");
      const hasDueDate: boolean =
        readline
          .question("Do you have a due date for this task? (y/n): ")
          .toLowerCase() === "y";
      let dueDate: string;
      if (hasDueDate) {
        dueDate = readline.question(
          "Enter the due date in the format of YYYY-MM-DD: "
        );
        if (isNaN(Date.parse(dueDate))) {
          console.log("Invalid date format;");
          continue;
        }
        todoList.addTodo(task, dueDate);
      } else {
        todoList.addTodo(task);
      }
      break;
    }
    case 2: {
      const id: number = readline.questionInt(
        "✔️ Enter the ID of the todo item to mark as completed: "
      );
      todoList.completeTodo(id);
      break;
    }
    case 3: {
      const id: number = readline.questionInt(
        "🗑️ Enter the ID of the todo item to remove: "
      );
      const confirm = readline.question("Are you sure? (y/n): ");
      if (confirm.toLowerCase() !== "y") continue;
      todoList.removeTodo(id);
      break;
    }
    case 4: {
      console.log("📋 Todo List:");
      console.table(todoList.listTodos());
      break;
    }
    case 5: {
      const completedString: string = readline.question(
        "Enter true to filter completed todo items, false to filter incomplete todo items: "
      );
      let completed: boolean;
      if (completedString.toLowerCase() === "true") completed = true;
      else if (completedString.toLowerCase() === "false") completed = false;
      else {
        console.log("❌ Invalid input; accepts true or false only.");
        continue;
      }
      const filteredTodos: (TodoItem | TodoItemWithDueDate)[] =
        todoList.filterTodos(completed);
      console.log("📋 Filtered Todo List:");
      console.table(filteredTodos);
      break;
    }
    case 6: {
      const id: number = readline.questionInt(
        "📝 Enter the ID of the todo item to update: "
      );
      const task: string = readline.question("📝 Enter the new task: ");
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
