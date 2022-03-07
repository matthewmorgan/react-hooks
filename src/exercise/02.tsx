// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'


function useLocalStorageState<T>(initialValue: T): {value: T, setValue: (n: T) => void} {
    const [value, setValue] = React.useState<T>(() => initialValue || JSON.parse(window.localStorage.getItem('value')))
    React.useEffect(() => {
        window.localStorage.setItem('value', JSON.stringify(value))
    }, [value]);

    return {value, setValue}
}

function Greeting({initialName = ''}) {

    const {value: name, setValue: setName} = useLocalStorageState<string>(initialName)

    function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
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
    return <Greeting/>
}

export default App
