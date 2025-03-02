
// its possible to define the todo Item as 
// const type = {
//     id: number;
//   task: string;
//   completed: boolean;
// }
// which i frankly prefer as it uses a familiar syntax and I could do something as making a type a string like type ="yes" | "no"

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}


//it also possible to extend ( with type aliases it's called intersection like in sets lol) like
// type TodoItemWithDueDate = TodoItem & {
//    dueDate: Date;
// }

export interface TodoItemWithDueDate extends TodoItem {
  dueDate: Date;
}

class TodoList {
  private list: (TodoItem | TodoItemWithDueDate)[];
  constructor() {
    this.list = [];
  }

  addTodo(task: string, dueDate?: string): void {
    let taskDueDate;
    if (dueDate) {
      // i know i already checked in the case 1 of my index.ts
      if(!isNaN(Date.parse(dueDate))){
        taskDueDate = new Date(dueDate);
      }else{
        console.log("Invalid Date format")
        return
      }
    }
    let item: TodoItem|TodoItemWithDueDate = { id: this.list.length + 1, task, completed: false };
    if(dueDate)  item = {...item, dueDate: taskDueDate}
    this.list.push(item);
    console.log("✅ Task added successfully!");
  }

  completeTodo(id: number) {
    const index: number = this.list.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.list[index].completed = true;
      console.log("🎉 Task marked as completed!");
    } else {
      console.log("🚫 Task with ID " + id + " doesn't exist in the task list.");
      return
    }
  }

  removeTodo(id: number): void {
    const index: number = this.list.findIndex((item) => item.id === id);
    if (index !== -1) {
      const [removed]: (TodoItem | TodoItemWithDueDate)[] = this.list.splice(index, 1);
      console.log(`🗑️ Removed the task with ID: ${removed.id}, task: ${removed.task}`);
    } else {
      console.log("🚫 Task with ID " + id + " doesn't exist in the task list.");
      return
    }
  }

  listTodos(): (TodoItem | TodoItemWithDueDate)[] {
    return this.list;
  }

  filterTodos(completed: boolean) {
    return this.list.filter((item) => item.completed === completed);
  }

  updateTodo(id: number, task: string) {
    const index: number = this.list.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.list[index].task = task;
      console.log("✏️ Task updated successfully!");
    } else {
      console.log("🚫 Task with ID " + id + " doesn't exist in the task list.");
      return
    }
  }

  clearCompletedTodos() {
    this.list = this.list.filter((item) => !item.completed);
    console.log("🧹 Cleared all completed tasks.");
  }
}

export default TodoList