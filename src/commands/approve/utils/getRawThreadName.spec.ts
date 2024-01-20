import { Channel, ChannelType } from 'discord.js'
import { getRawThreadName } from './getRawThreadName'

describe('getRawThreadName', () => {
  describe('when the message match the regex', () => {
    describe('and the channel is a public thread', () => {
      it('returns the correct value', async () => {
        const mockChannel = {
          type: ChannelType.PublicThread,
          name: '{OPEN}- test',
        } as unknown as Channel

        const mockThreadName = await getRawThreadName(mockChannel)

        expect(mockThreadName).toBe('- test')
      })
    })

    describe('but the channel isnt a public thread', () => {
      it('returns undefined', async () => {
        const mockChannel = {
          type: ChannelType.PrivateThread,
          name: '{OPEN}- test',
        } as unknown as Channel

        const mockThreadName = await getRawThreadName(mockChannel)

        expect(mockThreadName).toBeUndefined()
      })
    })
  })

  describe('when the message doesnt match the regex', () => {
    it('returns undefined', async () => {
      const mockChannel = {
        type: ChannelType.PrivateThread,
        name: 'regex doesnt expect that',
      } as unknown as Channel

      const mockThreadName = await getRawThreadName(mockChannel)

      expect(mockThreadName).toBeUndefined()
    })
  })
})
