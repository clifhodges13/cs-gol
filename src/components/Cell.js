import React from 'react'

export default function Cell({ state }) {
    if(state === 1) {
        return (
            <div className="App-cell alive"></div>
        )
    } else {
        return (
            <div className="App-cell dead"></div>
        )
    }
}
