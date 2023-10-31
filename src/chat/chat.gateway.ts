import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetUser, Public } from 'src/users/common/decorators';
import { AtGuard } from 'src/users/common/guards/at.guard';
import { Users } from 'src/users/users.entity';


@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
  ) {}

  private connectedUsers = new Map<string, Socket>();

  @WebSocketServer()
  private server: Server; // Initialize the server property
  private logger: Logger = new Logger('ChatGateway');

  
  handleConnection(@ConnectedSocket() client: Socket) {
    const accessToken = client.handshake.query.accessToken;
  
    if (typeof accessToken === 'string') {
      try {
        const user = this.jwtService.verify(accessToken, { secret: 'ATlife4u' });
  
        this.connectedUsers.set(user.userId, client);

        // Get the list of connected user objects from the map
       // const connectedUserList = Array.from(this.connectedUsers.keys());
  
        // Broadcast the updated list to all connected clients
      //  this.server.emit('connectedUsers', connectedUserList);
  
        this.logger.log(`User ${user.userId} connected`);
        this.server.emit('userJoined', { userId: user.userId });
      } catch (error) {
        console.error('Access token verification failed:', error.message);
      }
    } else {
      console.error('Invalid access token:', accessToken);
    }
  }

  handleDisconnect(client: Socket) {
    const accessToken = client.handshake.query.accessToken;
console.log("disconnectin")
    if (typeof accessToken === 'string') {
      try {
        const user = this.jwtService.verify(accessToken, { secret: 'ATlife4u' });
        const connectedUser = this.connectedUsers.get(user.nickname);

        if (connectedUser === client) {
          this.connectedUsers.delete(user.nickname);
          this.server.emit('userLeft', { userId: user.userId });
        }
      } catch (error) {
        console.error('Access token verification failed:', error.message);
      }
    } else {
      console.error('Invalid access token:', accessToken);
    }
  }


  @SubscribeMessage('MessageToServer')
  handleMessage(client: Socket, payload: { text: string, to: string, myId:string }) {
    // Handle incoming chat messages
    console.log(payload)
  
    const { text, to, myId } = payload;
    // Implement message handling logic (e.g., store messages, deliver to recipients)

    const recipientClient = this.connectedUsers.get(to);
    recipientClient.emit('msg-recieve', payload );
    // Broadcast the message to the recipient(s)
   

   

    // if (recipientClient) {
    //   // Send the message to the recipient
    //   recipientClient.emit('chatMessage', { text, senderId: recipientId});
    // }
  }
  
  @SubscribeMessage('listConnectedUsers')
  handleListConnectedUsers(client: Socket) {
    console.log("listedUsers")
  // Get the list of connected user objects from the map
  const connectedUserList = Array.from(this.connectedUsers.keys())
  this.server.emit('connectedUsers', connectedUserList);
}
}
