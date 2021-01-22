import { $isOpen, $labelsChecked, labelClicked, menuClicked } from './index'

$isOpen.on(menuClicked, (isOpen) => !isOpen)
$labelsChecked.on(labelClicked, (labelsChecked, { id, checked }) => ({
  ...labelsChecked,
  [id]: checked,
}))
