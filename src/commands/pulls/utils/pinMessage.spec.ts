import { ChannelType, ThreadChannel } from 'discord.js'
import { pinMessage } from './pinMessage'

const makeSut = (props?: Partial<unknown | ThreadChannel>) => {
  const mockThread: ThreadChannel = {
    type: ChannelType.PublicThread,
    messages: {
      fetch: jest.fn().mockReturnValue({
        first: jest.fn().mockReturnValue({
          pin: jest.fn(),
        }),
      }),
    },
    ...props,
  } as unknown as ThreadChannel

  return {
    mockThread,
  }
}

describe('pinMessage', () => {
  describe('when has a message to pin', () => {
    it('doesnt pin the message when thread type is not public thread', async () => {
      const { mockThread } = makeSut({ type: ChannelType.PrivateThread })

      await pinMessage(mockThread)

      // the types only works if await to the mock be resolved
      const mockFetch = await mockThread.messages.fetch()

      expect(mockFetch.first).not.toHaveBeenCalled()
      expect(mockFetch.first()?.pin).not.toHaveBeenCalled()
      expect(mockThread.type).toBe(ChannelType.PrivateThread)
    })

    it('pins the message correctly', async () => {
      const { mockThread } = makeSut()

      await pinMessage(mockThread)

      // the types only works if await to the mock be resolved
      const mockFetch = await mockThread.messages.fetch()

      expect(mockFetch.first).toHaveBeenCalled()
      expect(mockFetch.first()?.pin).toHaveBeenCalled()
      expect(mockThread.messages.fetch).toHaveBeenCalled()
    })
  })

  describe("when haven't a message to pin", () => {
    it('doesnt message correctly', async () => {
      const { mockThread } = makeSut({
        messages: {
          fetch: jest.fn().mockReturnValue({
            first: jest.fn().mockReturnValue(undefined),
          }),
        },
      })

      await pinMessage(mockThread)

      // the types only works if await to the mock be resolved
      const mockFetch = await mockThread.messages.fetch()

      expect(mockFetch.first).toHaveBeenCalled()
      expect(mockFetch.first()?.pin).toBeUndefined()
      expect(mockThread.messages.fetch).toHaveBeenCalled()
    })
  })
})
