import { ChannelType, Client, NewsChannel } from 'discord.js'
import { SendMessageNewsChat } from './send-message-newschat'

const makeSut = () => {
  const mockChannel: NewsChannel = {
    id: 'news-channel-id',
    type: ChannelType.GuildAnnouncement,
    send: jest.fn().mockImplementationOnce(() => Promise.resolve()),
  } as unknown as NewsChannel

  const mockClient = {
    type: Client<boolean>,
    channels: {
      cache: {
        get: jest.fn().mockReturnValue(mockChannel),
      },
      fetch: jest.fn(),
    },
  } as unknown as Client<boolean>

  return {
    mockClient,
    mockChannel,
  }
}

describe('Send Message on NewsChannel', () => {
  it('should be possible send message', async () => {
    const { mockChannel, mockClient } = makeSut()

    const input = 'Example message'

    expect(() =>
      SendMessageNewsChat(mockClient, {
        channelID: mockChannel.id,
        message: input,
      })
    ).resolves
  })
})
