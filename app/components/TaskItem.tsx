import { memo } from 'react'

type Task = { id: number; text: string; completed: boolean };

type TaskItemProps = {
    item: Task;
    onDelete: (id: number) => void;
}

function TaskItem({ item, onDelete }: TaskItemProps) {
  return (
     <div key={item.id} className="flex items-center justify-between p-2 bg-white shadow mb-2 rounded">
            <span>{item.text}</span>
            <button type="button"  onClick={() => onDelete(item.id)} className="p-2 border rounded-md">Delete</button>
    </div>
  )
}

export default memo(TaskItem)