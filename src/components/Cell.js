import React from 'react';
import produce from 'immer';

export default function Cell({ alive, grid, setGrid, i, j }) {
    const aliveOrDead = alive ? 'alive' : 'dead';
    return (
        <div
            className={`App-cell ${aliveOrDead}`}
            onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                })
                setGrid(newGrid)
            }}    
        ></div>
    );
};
