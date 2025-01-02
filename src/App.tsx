import React, { JSX, ReactElement, useEffect, useState } from 'react';
import { HashConnect, HashConnectConnectionState, SessionData } from 'hashconnect';

const App: React.FC = () => {

    const [size, setSize] = useState<number>(70);
    const [shape, setShape] = useState<string>('circle');
    const [SVGElements, setSVGElements] = useState<JSX.Element[]>([]);
    const removeElement = (id: string) => {
        setSVGElements(prev => prev.filter((el: JSX.Element) => { return el.props.id !== id }));
    }
    const handleCanvasClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const generatedID = Date.now().toString();
        let newElement: JSX.Element | null = null;
        const rect = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (shape === 'erase') {
            const target = event.target as SVGElement;
            if (target.id) {
                removeElement(target.id);
            }
            return;
        }
        else if (shape === 'circle') {
            newElement = <circle cx={x} cy={y} r={size / 2} fill="red" id={generatedID} />;
        }
        else if (shape === 'square') {
            newElement = <rect x={x - size / 2} y={y - size / 2} width={size} height={size} id={generatedID} />;
        }
        if (newElement !== null) {
            setSVGElements(previousElements => ([...previousElements, newElement]));
        }
    }
    const Canvas: React.FC = () => {
        return (<svg className='canvas'
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleCanvasClick}
        >
            <rect id="canvas" width="100%" height="100%" fill="white" />
            {SVGElements.map(item => item)}
        </svg>);
    };

    return (
        <div>
            <h1>
                <a href="https://github.com/JoseHerminioCollas/aaarto/" target="new">
                    Aaarto
                </a>
                <a href="http://goatstone.com" target="new">goatstone</a>
            </h1>
            <Canvas />
            <section className="panel">
                <section id="shape">
                    <label>
                        Circle
                        <input type="radio" name="shape" value="circle"
                            checked={shape === 'circle'}
                            onChange={({ target }) => setShape(target.value)}
                        />
                    </label>
                    <label>
                        Square <input type="radio" name="shape" value="square"
                            checked={shape === 'square'}
                            onChange={({ target }) => setShape(target.value)}
                        />
                    </label>
                    <label>
                        Erase <input type="radio" name="shape" value="erase"
                            checked={shape === 'erase'}
                            onChange={({ target }) => setShape(target.value)}
                        />
                    </label>
                </section>
                <section id="size">
                    <h3>Size</h3>
                    <input type="range" value={size} onChange={({ target }) => setSize(Number(target.value))} min="10" max="300" />
                </section>
                <section id="color">
                    <h3>Color</h3>
                    <input type="color" value="#cccccc" />
                </section>
                <section id="mint">
                    <button>
                        Open Wallet
                    </button>
                    <button disabled>
                        Create
                    </button>
                </section>
            </section>
        </div>
    );
};

export default App;