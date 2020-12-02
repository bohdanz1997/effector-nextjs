type KeyValue<T> = [string, T]

type GroupResult<T> = {
  [group: string]: T[]
}

type KeyResult<T> = {
  [key: string]: T
}

const wrapArray = <T>(value: KeyValue<T>): T[] =>
  (Array.isArray(value) ? value : [value]) as T[]

type GroupByFn<T> = (item: T, index: number, array: T[]) => KeyValue<T>

type SplitFn<T> = (item: T) => KeyValue<T>

export const groupBy = <T>(array: T[], fn: GroupByFn<T>) =>
  array.reduce((object, item, index, array) => {
    const [key, value] = fn(item, index, array)
    object[key] = value
    return object
  }, {} as KeyResult<T>)

export const splitArray = <T>(
  source: T[],
  fn: SplitFn<T>,
  defaultValue = {} as GroupResult<T>,
): GroupResult<T> =>
  source.reduce((results, item) => {
    const [groupName, mappedItem] = fn(item)
    const group = results[groupName] || []

    return {
      ...results,
      [groupName]: group.concat([mappedItem]),
    }
  }, defaultValue)
