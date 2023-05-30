import React, { useState, useEffect, useRef } from 'react'

const ListForm = (props) => {

    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });

        setInput('');
    }

    return (
        <form  onSubmit={handleSubmit}>
            {props.edit ? (
                <>
                    <input
                        type="text"
                        placeholder="Update ypur item"
                        value={input}
                        name="text"
                        onChange={handleChange}
                        ref={inputRef}
                    >
                    </input>
                    <button>Update</button>
                </>
            ) :
                (
                    <>
                        <input
                            type="text"
                            placeholder="Add a user"
                            value={input}
                            name="text"
                            onChange={handleChange}
                            ref={inputRef}
                        >
                        </input>
                        <button>Add</button>
                    </>
                )}
        </form>
    )
}

export default ListForm
