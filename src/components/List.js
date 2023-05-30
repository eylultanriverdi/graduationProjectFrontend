import React, { useState } from 'react'
import ListForm from './ListForm'
import { FaEdit } from 'react-icons/fa'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import {CgScrollV} from 'react-icons/cg'


const List = ({ lists, completeList, removeList, updateList }) => {

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateList(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <ListForm edit={edit} onSubmit={submitUpdate} ></ListForm>
    }

    return lists.map((list, index) => (
        <div  key={index}>
            <div key={list.id} onClick={() => completeList(list.id)}>
                {list.text}
            </div>
            <div >
                <AiOutlineCloseSquare
                    onClick={() => removeList(list.id)}
                ></AiOutlineCloseSquare>
                <FaEdit
                    onClick={() => setEdit({ id: list.id, value: list.text })}
                >
                </FaEdit>
                <CgScrollV></CgScrollV>
            </div>
        </div>

    ))
}

export default List
