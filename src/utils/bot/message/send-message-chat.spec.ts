import { ChannelType, Client, TextChannel } from 'discord.js'
import { SendMessageChat } from './send-message-chat'

const makeSut = () => {
  const mockChannel: TextChannel = {
    id: 'text-channel-id',
    type: ChannelType.GuildAnnouncement,
    send: jest.fn().mockImplementationOnce(() => Promise.resolve()),
  } as unknown as TextChannel

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

describe('Send Message on TextChannel', () => {
  it('should be possible send message', async () => {
    const { mockChannel, mockClient } = makeSut()

    const input = 'Example message'

    expect(() =>
      SendMessageChat(mockClient, {
        channelID: mockChannel.id,
        message: input,
      })
    ).resolves
  })
})
