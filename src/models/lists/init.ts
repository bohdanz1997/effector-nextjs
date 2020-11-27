import { uuid } from 'lib/uuid'
import { $lists, addList, removeListById, setLists, updateList } from './index'

$lists
  .on(setLists, (_, lists) => lists)
  .on(addList, (lists, list) => lists.concat(list))
  .on(updateList, (lists, newList) =>
    lists.map((list) => (list.id === newList.id ? newList : list)),
  )
  .on(removeListById, (lists, id) => lists.filter((list) => list.id !== id))

setLists([
  { id: uuid(), title: 'TODO' },
  { id: uuid(), title: 'In progress' },
])
