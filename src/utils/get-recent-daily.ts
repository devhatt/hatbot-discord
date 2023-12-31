/* eslint-disable @typescript-eslint/no-explicit-any */
export function GetRecentDaily(objectArray: any[], object: any): any {
  if (!objectArray) {
    return null
  }

  const dailys = objectArray.filter((obj) => obj[object])

  const today = new Date()
  const dailyOnCurrentDate = dailys.filter(
    (obj) =>
      new Date(obj[object].createdAt).toDateString() === today.toDateString()
  )

  if (dailyOnCurrentDate.length === 0) {
    return null
  }

  return dailyOnCurrentDate[0][object]
}
