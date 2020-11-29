import { request } from '../request'
import {
  $lists,
  addList,
  fetchListsFx,
  removeListById,
  setLists,
  updateList,
} from './index'

fetchListsFx.use(() => request('/lists', 'GET'))

$lists
  .on([setLists, fetchListsFx.doneData], (_, lists) => lists)
  .on(addList, (lists, list) => lists.concat(list))
  .on(updateList, (lists, newList) =>
    lists.map((list) => (list.id === newList.id ? newList : list)),
  )
  .on(removeListById, (lists, id) => lists.filter((list) => list.id !== id))
