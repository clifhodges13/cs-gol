import React, { useState } from 'react'

export default function Input({ gridHeight, gridWidth }) {

    const defaultSize = { gridHeight, gridWidth }

    const [ size, setSize ] = useState(defaultSize)
    const [ input, setInput ] = useState()

    const handleChange = e => {
        setInput(e.target.value)
    }

    const submit = e => {
        e.preventDefault()
        setSize({
            gridHeight: input,
            gridWidth: input
        })
    }

    return (
        <form onSubmit={submit}>
            <input
                onChange={handleChange}
            />
        </form>
    )
}
