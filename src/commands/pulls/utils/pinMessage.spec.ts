import { ChannelType, ThreadChannel } from 'discord.js'
import { pinMessage } from './pinMessage'

describe('pinMessage', () => {
  describe('when has a message to pin', () => {
    it('doesnt pin the message when thread type is not public thread', async () => {
      const threadMock: ThreadChannel = {
        type: ChannelType.PrivateThread,
        messages: {
          fetch: jest.fn().mockReturnValue({
            first: jest.fn().mockReturnValue({
              pin: jest.fn(),
            }),
          }),
        },
      } as unknown as ThreadChannel

      await pinMessage(threadMock)

      // the types only works if await to the mock be resolved
      const mockFetch = await threadMock.messages.fetch()

      expect(mockFetch.first).not.toHaveBeenCalled()
      expect(mockFetch.first()?.pin).not.toHaveBeenCalled()
      expect(threadMock.type).toBe(ChannelType.PrivateThread)
    })

    it('pins the message correctly', async () => {
      const threadMock: ThreadChannel = {
        type: ChannelType.PublicThread,
        messages: {
          fetch: jest.fn().mockReturnValue({
            first: jest.fn().mockReturnValue({
              pin: jest.fn(),
            }),
          }),
        },
      } as unknown as ThreadChannel

      await pinMessage(threadMock)

      // the types only works if await to the mock be resolved
      const mockFetch = await threadMock.messages.fetch()

      expect(mockFetch.first).toHaveBeenCalled()
      expect(mockFetch.first()?.pin).toHaveBeenCalled()
      expect(threadMock.messages.fetch).toHaveBeenCalled()
    })
  })

  describe("when haven't a message to pin", () => {
    it('doesnt message correctly', async () => {
      const threadMock: ThreadChannel = {
        type: ChannelType.PublicThread,
        messages: {
          fetch: jest.fn().mockReturnValue({
            first: jest.fn().mockReturnValue(undefined),
          }),
        },
      } as unknown as ThreadChannel

      await pinMessage(threadMock)

      // the types only works if await to the mock be resolved
      const mockFetch = await threadMock.messages.fetch()

      expect(mockFetch.first).toHaveBeenCalled()
      expect(mockFetch.first()?.pin).toBeUndefined()
      expect(threadMock.messages.fetch).toHaveBeenCalled()
    })
  })
})
