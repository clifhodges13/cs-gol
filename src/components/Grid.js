import React, { useState, useCallback, useRef } from 'react';
import Cell from './Cell';
import Button from './Button';
import Input from './Input';
import buildGrid, { gridWidth, gridHeight } from '../helpers/buildGrid';

export default function Grid() {
    const gridStyle = {
        gridTemplateColumns: `repeat(${gridWidth}, 20px)`
    }

    const [ grid, setGrid ] = useState(buildGrid());
    const [ simulating, setSimulating ] = useState(false);

    const isSimulating = useRef(simulating);
    isSimulating.current = simulating
    
    const runSim = useCallback(() => {
        if (!isSimulating.current) {
            return
        } else {
            setTimeout(runSim(), 1000)
        }
    }, [])

    return (
        <div className="App-grid-wrapper">
            <div className="App-grid" style={gridStyle}>
                {grid.map((row, i) =>
                    row.map((col, j) => (
                        <Cell
                            key={`${i}_${j}`}
                            alive={grid[i][j]}
                            grid={grid}
                            setGrid={setGrid}
                            i={i}
                            j={j}
                        />
                    )
                ))}  
            </div>
            <Button
                simulating={simulating}
                setSimulating={setSimulating}
            />
            <Input
                gridWidth={gridWidth}
                gridHeight={gridHeight}
            />
        </div>
    )
}
