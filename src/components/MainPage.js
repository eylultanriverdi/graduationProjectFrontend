import React from 'react'
/* import List from './List'
import ListForm from './ListForm' */
import Button from '@mui/material/Button';


const MainPage = () => {

    /*     const [lists, setLists] = useState([])
    
        const addUser = list => {
            if (!list.text || /^\s*$/.test(list.text)) {
                return
            }
    
            const newList = [list, ...lists]
    
            setLists(newList)
        }
    
        const updateList = (listId, newValue) => {
            if (!newValue.text || /^\s*$/.test(newValue.text)) {
                return
            }
    
            setLists(previous => previous.map(item => (item.id === listId ? newValue : item)))
    
        }
    
        const removeList = id => {
            const removeArr = [...lists].filter(list => list.id !== id)
    
            setLists(removeArr);
        }
    
    
        
        const completeList = id => {
            let updatedLists = lists.map(list => {
                if (list.id === id) {
                    list.isComplete = !list.isComplete
                }
                return list;
            });
            setLists(updatedLists);
        } */


    return (
        <div>
            {/* <ListForm onSubmit={addUser} ></ListForm>
            <List
                lists={lists}
                completeList={completeList}
                removeList={removeList}
                updateList={updateList}
            ></List> */}

            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="https://javaguides.net" className="navbar-brand">Healty Life</a></div>
                    </nav>
                </header>
            </div>
        </div>
    )
}

export default MainPage
