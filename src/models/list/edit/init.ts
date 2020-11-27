import { forward } from 'effector'

import { $isEditing } from 'models/list/add'
import { $activeListId } from 'models/card/add'
import { $editingId, listClicked } from './index'

$isEditing.on(listClicked, () => true)

$editingId.on(listClicked, (_, id) => id)

forward({
  from: listClicked,
  to: $activeListId,
})
