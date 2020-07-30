import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import Cell from './Cell';
import Button from './Button';
import Ticker from './Ticker';
// import Input from './Input';
import SetSpeed from './SetSpeed';
import { buildGrid, glider, pulsar, randomizeGrid, gridWidth, gridHeight } from '../helpers/buildGrid';
import Reset from './Reset';
import ColorPicker from './ColorPicker';

export default function Grid() {
    const gridStyle = {
        gridTemplateColumns: `repeat(${gridWidth}, 20px)`
    }

    const [ grid, setGrid ] = useState([]);

    const [ simulating, setSimulating ] = useState(false);
    const isSimulating = useRef(simulating);
    isSimulating.current = simulating;
    
    const [ count, setCount ] = useState(0);
    const runningCount = useRef(count);
    runningCount.current = count;

    const [ speed, setSpeed ] = useState(50);
    const runningSpeed = useRef(speed);
    runningSpeed.current = speed;

    const [ color, setColor ] = useState('#2342a1')

    useEffect(() => {
        setGrid(() => buildGrid());
    }, []);

    const init = () => {
        setSimulating(!simulating);
        if(!simulating) {
            isSimulating.current = true;
            runSim();
        }
    };

    const createNewGrid = (i,j) => {
        const newGrid = produce(grid, gridCopy => {
            gridCopy[i][j] = grid[i][j] ? 0 : 1;
        })
        setGrid(newGrid)
    };

    const resetGrid = () => {
        setCount(0)
        setGrid(() => buildGrid());
    };

    const runSim = useCallback(() => {
        if (!isSimulating.current) {
            return
        };
        
        const ops = [
            [0,1],
            [0,-1],
            [1,-1],
            [-1,1],
            [1,1],
            [-1,-1],
            [1,0],
            [-1,0]
        ]
        
        setGrid(g => {
            return produce(g, copy => {
                for(let i=0; i<gridWidth; i++) {
                    for(let j=0; j<gridHeight; j++) {
                        let neighbors = 0;

                        ops.forEach(([x,y]) => {
                            const newI = i+x;
                            const newJ = j+y;
                            if(newI >= 0 && newI < gridWidth && newJ >=0 && newJ < gridHeight) {
                                neighbors += g[newI][newJ];
                            }
                        })

                        if (g[i][j]===1 && (neighbors < 2 || neighbors > 3)) {
                            copy[i][j] = 0;
                        } else if (g[i][j]===0 && neighbors===3) {
                            copy[i][j] = 1;
                        }
                    }
                }
            })
        });

        setTimeout(() => {
            setCount(runningCount.current + 1);
            runSim();
        }, (speed*10)); 
    }, [speed]);

    return (
        <div className="App-grid-wrapper">

            <div className="App-grid" style={gridStyle}>
                {grid && grid.map((row, i) =>
                    row.map((col, j) => (
                        <Cell
                            key={`${i}_${j}`}
                            alive={grid[i][j]}
                            createNewGrid={createNewGrid}
                            i={i}
                            j={j}
                            color={color}
                        />
                    )
                ))}  
            </div>
            <div className="App-control-board">
                <Ticker count={count} />
                <Button
                    simulating={simulating}
                    setSimulating={setSimulating}
                    init={init}
                />
                <button style={{background: 'teal', color: 'azure'}}
                        onClick={() => {
                        setCount(0)
                        setGrid(() => randomizeGrid())
                    }}>Randomize</button>
                <div style={{minWidth: '400px'}}>
                    {!isSimulating.current ? (
                        <>
                        <div>
                            <button onClick={() => setGrid(glider)}>Start with Glider</button>
                            <button onClick={() => setGrid(pulsar)}>Start with Pulsar</button>
                        </div>
                        <SetSpeed
                            speed={runningSpeed.current}
                            setSpeed={setSpeed}
                        />
                        <Reset
                            resetGrid={resetGrid}
                        />
                        </>
                    ) : null}
                </div>
                <ColorPicker setColor={setColor} />
            </div>
        </div>
    )
}
