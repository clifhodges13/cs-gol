import React, { useState } from 'react'

export default function Input({ setSpeed }) {

    const submit = e => {
        e.preventDefault()
        setSpeed(e.target.value)
    }

    return (
        <form onSubmit={submit}>
            <select onChange={submit}>
                <option value='' selected disabled hidden>Set the Speed</option>
                <option value='110'>1</option>
                <option value='100'>2</option>
                <option value='90'>3</option>
                <option value='80'>4</option>
                <option value='70'>5</option>
                <option value='60'>6</option>
                <option value='50'>7</option>
                <option value='40'>8</option>
                <option value='30'>9</option>
                <option value='20'>10</option>
                <option value='10'>11</option>
            </select>
        </form>
    )
}
