import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonData} from "../types";


type Props = { pokemonName: string };

type State = {
    status: "idle",
} | {
    status: "pending",
} | {
    status: "rejected",
    error: {message: string},
} | {
    status: "resolved",
    pokemon: PokemonData,
};

const idleState: State = {
    status: "idle",
};

function PokemonInfo({pokemonName}: Props) {
    const [state, setState] = React.useState<State>(idleState);

    React.useEffect(() => {
        if (!pokemonName) {
            setState(idleState);
            return;
        }
        setState({status: "pending"});
        fetchPokemon(pokemonName).then(pokemonData => {
            setState({status: "resolved", pokemon: pokemonData});
        })
            .catch(err => {
                setState({status: "rejected", error: {message: err.message}})
            })
    }, [pokemonName]);

    if (state.status === "rejected"){
        throw state.error;
    }
    if (state.status === "idle") {
        return <>Submit a pokemon</>;
    }
    if (state.status === "pending") {
        return <PokemonInfoFallback name={pokemonName}/>;
    }
    return <PokemonDataView pokemon={state.pokemon}/>;
}

function App() {
    const [pokemonName, setPokemonName] = React.useState('')

    function handleSubmit(newPokemonName: string) {
        setPokemonName(newPokemonName)
    }

    return (
        <div className="pokemon-info-app">
            <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit}/>
            <hr/>
            <div className="pokemon-info">
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => {
                        handleSubmit("")
                    }}
                    resetKeys={[pokemonName]}
                >
                    <PokemonInfo pokemonName={pokemonName}/>
                </ErrorBoundary>
            </div>
        </div>
    )
}

type ErrorFallbackProps = {
    error?: {message: string},
    resetErrorBoundary: () => void,
}

function ErrorFallback({error, resetErrorBoundary}: ErrorFallbackProps) {
    return (
        <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default App
