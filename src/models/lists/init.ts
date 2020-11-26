import { $lists, setLists } from './index'

$lists.on(setLists, (_, lists) => lists)
