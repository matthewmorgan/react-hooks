import * as React from 'react'
import VanillaTilt, {HTMLVanillaTiltElement} from 'vanilla-tilt'

function Tilt({children}) {
    const tiltRef = React.useRef();

    React.useEffect(() => {
        const tiltNode: HTMLVanillaTiltElement = tiltRef.current
        VanillaTilt.init(tiltNode, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
        });
        return () => tiltNode.vanillaTilt.destroy()
    }, []);

    return (
        <div className="tilt-root" ref={tiltRef}>
            <div className="tilt-child">{children}</div>
        </div>
    )
}

function App() {
    return (
        <Tilt>
            <div className="totally-centered">vanilla-tilt.js</div>
        </Tilt>
    )
}

export default App
