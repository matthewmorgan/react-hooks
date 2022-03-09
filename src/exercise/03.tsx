// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
    const [name, setName] = React.useState('')

    return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.currentTarget.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
type Props = {
    animal: string,
    onAnimalChange: (a: string) => void,
}
function FavoriteAnimal({animal, onAnimalChange}: Props) {

  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.currentTarget.value)}
      />
    </div>
  )
}

function Display({animal}: {animal: string}) {
    return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal}/>
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal}/>
    </form>
  )
}

export default App
