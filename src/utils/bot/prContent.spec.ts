import { Channel, ChannelType } from 'discord.js'
import { prContent } from './prContent'

describe('prContent', () => {
  describe('when has a message', () => {
    it('gets the values correctly', async () => {
      const mockChannel: Channel = {
        type: ChannelType.PublicThread,
        messages: {
          fetchPinned: jest.fn().mockReturnValue({
            at: jest.fn().mockReturnValue({
              content:
                '**Repositório:** repository test\n **Pull Request ID:** 1',
            }),
          }),
        },
      } as unknown as Channel

      const mockResult = await prContent(mockChannel)

      expect(mockResult?.pullId).toBe(1)
      expect(mockResult).not.toBeUndefined()
      expect(mockResult?.pullId).not.toBe('1')
      expect(mockResult?.repository).toBe('repository test')
    })
  })

  describe('when channel type its not a public thread', () => {
    it('returns undefined', async () => {
      const mockChannel: Channel = {
        type: ChannelType.PrivateThread,
      } as unknown as Channel

      const mockResult = await prContent(mockChannel)

      expect(mockResult).toBeUndefined()
    })
  })

  describe('when the pull request id is not a number', () => {
    it('doesnt convert the value to a number', async () => {
      const mockChannel: Channel = {
        type: ChannelType.PublicThread,
        messages: {
          fetchPinned: jest.fn().mockReturnValue({
            at: jest.fn().mockReturnValue({
              content:
                '**Repositório:** repository test\n **Pull Request ID:** not a number',
            }),
          }),
        },
      } as unknown as Channel

      const mockResult = await prContent(mockChannel)

      expect(mockResult?.pullId).toBeNaN()
    })
  })

  describe('when the content dont have "repositorio" and "pull request id"', () => {
    it('receive undefined from the function', async () => {
      const mockChannel: Channel = {
        type: ChannelType.PublicThread,
        messages: {
          fetchPinned: jest.fn().mockReturnValue({
            at: jest.fn().mockReturnValue({
              content: 'wrong content',
            }),
          }),
        },
      } as unknown as Channel

      const mockResult = await prContent(mockChannel)

      expect(mockResult).toBeUndefined()
    })
  })
})
