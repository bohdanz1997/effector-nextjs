import { uuid } from 'lib/uuid'
import { $lists, addList, setLists } from './index'

$lists
  .on(setLists, (_, lists) => lists)
  .on(addList, (lists, list) => lists.concat(list))

setLists([
  { id: uuid(), title: 'TODO' },
  { id: uuid(), title: 'In progress' },
])
