import React from 'react'

export default function Button({ simulating, setSimulating }) {
    return (
        <button
            onClick={() => setSimulating(!simulating)}    
        >{simulating ? 'STOP' : 'START'}</button>
    )
}
