export function thisWeekDay (day) {
  now = new Date()
  now.setHours(0,0,0,0)
  now.setDate( now.getDate() - now.getDay()+day)
  console.log(now)
}

export function handleTimeToComplete (timeToComplete, )