import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import Greeting from "~/components/Greeting";
import Todoitem from "~/components/Todoitem";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const [counter, setCounter] = useState(0)
  const [name, setName] = useState("Adzi")
  const [hobies, setHobies] = useState(["Coding", "watching Movie", "Reading"])

  const [todos, setTodos] = useState([])

  const increase = () => {
    setCounter(counter + 1)
  }

  const changeName = () => {
    setName("John Doe")
  }

  // useEffect(() => {

  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //   .then( (response) => response.json() )
  //   .then((data) => setTodos(data))
    
  // },[])

  const loaded = useRef(false)

  useEffect(() => {

    console.log("call useeffect");

    if(loaded.current === false) {
      fetch("https://jsonplaceholder.typicode.com/todos")
      .then( (response) => response.json() )
      .then((data) => setTodos(data))
      .then(() => loaded.current = true)
    }
    
  })
  

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-16">

        <h1>Hello World {counter} </h1>

        <button onClick={increase}>increate+</button>
        <Greeting name={name} hobies={hobies} />
        <button onClick={changeName}>Ganti Nama</button>

        <h3 className="text-xl">Todoss</h3>

        <div className="flex w-[500px] flex-col space-y-3">

          {todos.map((data: any, index) => (

            <Todoitem key={index} userId={data.userId} id={data.id} title={data.title} completed={data.completed} />
          ))}

        </div>
        
      </div>
    </div>
  );
}


