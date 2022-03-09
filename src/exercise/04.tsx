// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function useLocalStorageState<T>(initialValue?: T): [value: T, setValue: (n: T) => void] {
    const [value, setValue] = React.useState<T>(() => initialValue || JSON.parse(window.localStorage.getItem('value')))
    React.useEffect(() => {
        window.localStorage.setItem('value', JSON.stringify(value))
    }, [value]);

    return [value, setValue]
}

type State = {
    currentStep: number,
    history: Array<Array<string | null>>,
}
function Board() {
    // 🐨 squares is the state for this component. Add useState for squares
    const initialState: State = {
        currentStep: 0,
        history: [Array(9).fill(null)]
    }

    const [state, setState] = useLocalStorageState<State>(initialState)

    const squares = state.history[state.currentStep]
    const winner = calculateWinner(squares)
    const nextValue = calculateNextValue(squares)
    const status = calculateStatus(winner, squares, nextValue)

    // This is the function your square click handler will call. `square` should
    // be an index. So if they click the center square, this will be `4`.
    function selectSquare(square) {
        // 🐨 first, if there's already winner or there's already a value at the
        // given square index (like someone clicked a square that's already been
        // clicked), then return early so we don't make any state changes
        if (winner || squares[square]) {
            return;
        }

        const updatedSquares = [...squares]
        updatedSquares[square] = nextValue
        setState({
            currentStep: state.currentStep + 1,
            history: [...state.history, updatedSquares],
        })
    }

    function restart() {
        setState(initialState)
    }

    function renderSquare(i) {
        return (
            <button disabled={state.currentStep !== state.history.length - 1} className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
            </button>
        )
    }

    function forward() {
        // don't forward if we're at the end of the history
        if (state.currentStep >= state.history.length - 1) {
            return;
        }
        setState({
            ...state,
            currentStep: state.currentStep + 1,
        })
    }

    function back() {
        // don't back if we're at the beginning of the history
        if (state.currentStep <= 0) {
            return;
        }
        setState({
            ...state,
            currentStep: state.currentStep - 1,
        })
    }

    return (
        <div>
            {/* 🐨 put the status in the div below */}
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 12}}>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <button className="back" onClick={back} disabled={state.currentStep === 0}>
                        {"<<"}
                    </button>
                    <button className="forward" onClick={forward} disabled={state.currentStep === state.history.length -1}>
                        {">>"}
                    </button>
                </div>
                <button className="restart" onClick={restart}>
                    restart
                </button>
            </div>

        </div>
    )
}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
        </div>
    )
}

function calculateStatus(winner, squares, nextValue) {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
            ? `Scratch: Cat's game`
            : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
    const xSquaresCount = squares.filter(r => r === 'X').length
    const oSquaresCount = squares.filter(r => r === 'O').length
    return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

function App() {
    return <Game/>
}

export default App
