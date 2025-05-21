import React, { memo } from 'react'

type GreetingProps = {
  name: string;
  hobies: string[]
};

export default memo(function Greeting({name, hobies}: GreetingProps) {
  return (
    <>
        <div className="text-xl">Hello, {name}!</div>
        <ul>
            { hobies.map((data) => (
                <li>{data}</li>
            )) }
        </ul>
    </>
    
  )
})
