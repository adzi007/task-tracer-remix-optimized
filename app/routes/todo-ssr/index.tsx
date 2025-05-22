import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import TaskItem from "~/components/TaskItem";
import { addTask, deleteTask, getTasks } from "~/utils/task.server";

type Task = { id: number; text: string; completed: boolean };

export const loader: LoaderFunction = async () => {
  const data = {
    tasks: await getTasks()
  };
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "delete") {

    const id = formData.get("id");

    // -- simulate error or failed to delete --


    if (id === "1") {
      // Return a 400 error with custom message
      return new Response(JSON.stringify({ error: "Failed to delete task." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }


    // -----------------------------------------

    if (typeof id === "string") {

      await deleteTask(Number(id));

    }

     return new Response(null, { status: 204 });


  }

  if (actionType === "add") {
    const text = formData.get("text");
    if (typeof text === "string" && text.trim() !== "") {
      await addTask(text);
    }
  }

  return new Response(null, { status: 200 });

};

type ActionData = {
  error?: string;
};

export default function Index() {

    const { tasks } = useLoaderData<{ tasks: Task[]} >()
    const fetcher = useFetcher<ActionData>();


    // Handle error fetcher

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (fetcher.data && fetcher.data.error) {

            setError(fetcher.data.error);

        } else if (fetcher.state === "idle") {
            
            setError(null); // clear error after retry or success
        }
    }, [fetcher.data, fetcher.state]);

    const handleDelete = useCallback((id: number) => {

        console.log("deleteing task >>> ", id);

        fetcher.submit(
            { id: String(id), _action: "delete" },
            { method: "post" }
        );

    },[fetcher])

     const renderedTasks = useMemo(() => tasks.map((task) => (
        <TaskItem key={task.id} item={task} onDelete={handleDelete} />
    )), [tasks]);

    return (
        <div>
            <h1>Hello task ssr</h1>

            {error && (
                <div className="text-red-500 mb-4">
                {error}
                </div>
            )}

            <div className="flex flex-col w-96 mx-auto">
                {renderedTasks}
            </div>
        </div>
    )
}