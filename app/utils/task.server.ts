type Task = { id: number; text: string; completed: boolean };
let tasks: Task[] = [
  { id: 1, text: "Learn Remix", completed: false },
  { id: 2, text: "Write an optimized app", completed: false },
];

export function getTasks() {
  return tasks;
}

export function addTask(text: string) {
  const task = { id: Date.now(), text, completed: false };
  tasks.unshift(task);
  return task;
}

export function deleteTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
}
