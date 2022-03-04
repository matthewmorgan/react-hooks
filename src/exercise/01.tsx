// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

type Props = {
  initialName?: string,
}
function Greeting({initialName}: Props) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = React.useState<string>(initialName)

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    // 🐨 update the name here based on event.currentTarget.value
    setName(event.currentTarget.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name}/>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="world"/>
}

export default App
