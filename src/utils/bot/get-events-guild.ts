import { Client } from 'discord.js'

export async function GetEventsGuild(client: Client<boolean>, guildId: string) {
  const guild = await client.guilds.fetch(guildId)

  if (!guild) {
    return
  }

  const eventsFetch = await guild.scheduledEvents.fetch()

  const hasEvent = eventsFetch.map((event) => {
    const startTimeEvent = new Date(Number(event.scheduledStartTimestamp))
    const endTimeEvent = new Date(Number(event.scheduledEndTimestamp))

    return {
      id: event.id,
      name: event.name,
      startDate: startTimeEvent,
      endDate: endTimeEvent,
    }
  })

  const eventWithEndDate = hasEvent.filter((event) => event.endDate)
  return eventWithEndDate
}
