import { Channel, ChannelType } from 'discord.js'
import { getPullOwner } from './get-pull-owner'

describe('getPullOwner', () => {
  it('receives undefined when doesnt have a user with the name', async () => {
    const channelMock = {
      type: ChannelType.PublicThread,
      messages: {
        fetchPinned: jest.fn().mockReturnValue({
          at: jest.fn().mockReturnValue({ content: '<@teste>' }),
        }),
      },
      members: {
        fetch: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue(undefined),
        }),
      },
    } as unknown as Channel

    const mockOwner = await getPullOwner(channelMock)

    expect(mockOwner).toBeUndefined()
    expect(mockOwner).not.toBe('teste')
  })

  it('receives undefined when doesnt have message with a user name', async () => {
    const channelMock = {
      type: ChannelType.PublicThread,
      messages: {
        fetchPinned: jest.fn().mockReturnValue({
          at: jest.fn().mockReturnValue({ content: '' }),
        }),
      },
      members: {
        fetch: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue({ user: 'teste' }),
        }),
      },
    } as unknown as Channel

    const mockOwner = await getPullOwner(channelMock)

    expect(mockOwner).toBeUndefined()
    expect(mockOwner).not.toBe('teste')
  })

  describe('when has a message with a user name', () => {
    it('receives undefined if message dont match with the regex', async () => {
      const channelMock = {
        type: ChannelType.PublicThread,
        messages: {
          fetchPinned: jest.fn().mockReturnValue({
            at: jest.fn().mockReturnValue({
              content: 'not what the regex is expecting',
            }),
          }),
        },
        members: {
          fetch: jest.fn().mockReturnValue({
            get: jest
              .fn()
              .mockReturnValue({ user: 'not what the regex is expecting' }),
          }),
        },
      } as unknown as Channel

      const mockOwner = await getPullOwner(channelMock)

      expect(mockOwner).toBeUndefined()
      expect(mockOwner).not.toBe('teste')
    })

    it('doesnt get any user when the channel is not a public thread', async () => {
      const channelMock = {
        type: ChannelType.PrivateThread,
        messages: {
          fetchPinned: jest.fn().mockReturnValue({
            at: jest.fn().mockReturnValue({ content: '<@teste>' }),
          }),
        },
        members: {
          fetch: jest.fn().mockReturnValue({
            get: jest.fn().mockReturnValue({ user: 'teste' }),
          }),
        },
      } as unknown as Channel

      const mockOwner = await getPullOwner(channelMock)

      expect(mockOwner).toBeUndefined()
      expect(mockOwner).not.toBe('teste')
    })

    describe('when have a user with the name', () => {
      it('gets the message correctly if it match with the regex', async () => {
        const channelMock = {
          type: ChannelType.PublicThread,
          messages: {
            fetchPinned: jest.fn().mockReturnValue({
              at: jest.fn().mockReturnValue({ content: '<@teste>' }),
            }),
          },
          members: {
            fetch: jest.fn().mockReturnValue({
              get: jest.fn().mockReturnValue({ user: 'teste' }),
            }),
          },
        } as unknown as Channel

        const mockOwner = await getPullOwner(channelMock)

        expect(mockOwner).toBe('teste')
        expect(mockOwner).not.toBeUndefined()
      })
    })
  })
})
