import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import Cell from './Cell';
import Button from './Button';
import Ticker from './Ticker';
import Input from './Input';
import SetSpeed from './SetSpeed';
import buildGrid, { gridWidth, gridHeight } from '../helpers/buildGrid';

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

    const [ speed, setSpeed ] = useState(10);
    const runningSpeed = useRef(speed);
    runningSpeed.current = speed;

    useEffect(() => {
        setGrid(() => buildGrid());
    }, [])

    const createNewGrid = (i,j) => {
        const newGrid = produce(grid, gridCopy => {
            gridCopy[i][j] = grid[i][j] ? 0 : 1;
        })
        setGrid(newGrid)
    };

    const init = () => {
        setSimulating(!simulating);
        if(!simulating) {
            isSimulating.current = true;
            runSim();
        }
    }

    const runSim = useCallback(() => {
        if (!isSimulating.current) {
            return
        }
        
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
                        // if(copy[j+1] && copy[i][j+1]   && copy[i][j+1]===1)   neighbors+=1;
                        // if(copy[j-1] && copy[i][j-1]   && copy[i][j-1]===1)   neighbors+=1;
                        // if(copy[i-1] && copy[i-1][j]   && copy[i-1][j]===1)   neighbors+=1;
                        // if(copy[i+1] && copy[i+1][j]   && copy[i+1][j]===1)   neighbors+=1;
                        // if(copy[i+1] && copy[i+1][j+1] && copy[i+1][j+1]===1) neighbors+=1;
                        // if(copy[i+1] && copy[i+1][j-1] && copy[i+1][j-1]===1) neighbors+=1;
                        // if(copy[i-1] && copy[i-1][j-1] && copy[i-1][j-1]===1) neighbors+=1;
                        // if(copy[i-1] && copy[i-1][j+1] && copy[i-1][j+1]===1) neighbors+=1;

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
        })
        setTimeout(() => {
            setCount(runningCount.current + 1);
            runSim();
        }, (speed*10)) // TODO: add 'speed' variable that is manipulateable by user input
    }, [speed]);

    return (
        <div className="App-grid-wrapper">
            <Ticker count={count} />
            <Button
                simulating={simulating}
                setSimulating={setSimulating}
                init={init}
            />

            <div className="App-grid" style={gridStyle}>
                {grid.map((row, i) =>
                    row.map((col, j) => (
                        <Cell
                            key={`${i}_${j}`}
                            alive={grid[i][j]}
                            createNewGrid={createNewGrid}
                            i={i}
                            j={j}
                        />
                    )
                ))}  
            </div>
            {/* <Input
                gridWidth={gridWidth}
                gridHeight={gridHeight}
            /> */}
            <SetSpeed
                speed={runningSpeed.current}
                setSpeed={setSpeed}
            />
        </div>
    )
}
