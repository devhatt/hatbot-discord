import { Channel, ChannelType } from 'discord.js'
import { getRawThreadName } from './getRawThreadName'

const makeSut = (props?: Partial<unknown | Channel>) => {
  const mockChannel: Channel = {
    type: ChannelType.PublicThread,
    name: '{OPEN}- test',
    ...props,
  } as unknown as Channel

  return {
    mockChannel,
  }
}

describe('Get Raw Thread Name Test', () => {
  describe('when message match regex', () => {
    it('returns correct value if message match regex and the channel is a public thread', async () => {
      const { mockChannel } = makeSut()

      const mockThreadName = await getRawThreadName(mockChannel)

      expect(mockThreadName).toBe('- test')
    })

    it('returns undefined if channel isnt a public thread', async () => {
      const { mockChannel } = makeSut({ type: ChannelType.PrivateThread })

      const mockThreadName = await getRawThreadName(mockChannel)

      expect(mockThreadName).toBeUndefined()
    })
  })

  it('returns undefined if message doesnt match regex', async () => {
    const { mockChannel } = makeSut({ name: 'regex doesnt expect that' })

    const mockThreadName = await getRawThreadName(mockChannel)

    expect(mockThreadName).toBeUndefined()
  })
})
