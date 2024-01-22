import { Channel, ChannelType } from 'discord.js'
import { getRawThreadName } from './getRawThreadName'
describe('Get Raw Thread Name Test', () => {
  describe('when message match regex', () => {
    it('returns correct value if message match regex and the channel is a public thread', async () => {
      const mockChannel = {
        type: ChannelType.PublicThread,
        name: '{OPEN}- test',
      } as unknown as Channel
      const mockThreadName = await getRawThreadName(mockChannel)
      expect(mockThreadName).toBe('- test')
    })

    it('returns undefined if channel isnt a public thread', async () => {
      const mockChannel = {
        type: ChannelType.PrivateThread,
        name: '{OPEN}- test',
      } as unknown as Channel
      const mockThreadName = await getRawThreadName(mockChannel)
      expect(mockThreadName).toBeUndefined()
    })
  })

  it('returns undefined if message doesnt match regex', async () => {
    const mockChannel = {
      type: ChannelType.PublicThread,
      name: 'regex doesnt expect that',
    } as unknown as Channel
    const mockThreadName = await getRawThreadName(mockChannel)
    expect(mockThreadName).toBeUndefined()
  })
})
