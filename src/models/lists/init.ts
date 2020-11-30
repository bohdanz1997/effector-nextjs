import { forward } from 'effector'
import { request } from '../request'
import {
  $lists,
  addList,
  createListFx,
  fetchListsFx,
  removeList,
  removeListFx,
  setLists,
  updateList,
  updateListFx,
} from './index'

fetchListsFx.use(() => request('/lists', 'GET'))
createListFx.use((list) => request('/lists', 'POST', { data: list }))
updateListFx.use((list) => request(`/lists/${list.id}`, 'PUT', { data: list }))
removeListFx.use((id) => request(`/lists/${id}`, 'DELETE'))

$lists
  .on(setLists, (_, lists) => lists)
  .on(addList, (lists, list) => lists.concat(list))
  .on(updateList, (lists, newList) =>
    lists.map((list) => (list.id === newList.id ? newList : list)),
  )
  .on(removeList, (lists, id) => lists.filter((list) => list.id !== id))

forward({
  from: createListFx.doneData,
  to: addList,
})

forward({
  from: fetchListsFx.doneData,
  to: setLists,
})

forward({
  from: updateListFx.doneData,
  to: updateList,
})

forward({
  from: removeListFx.doneData,
  to: removeList,
})
