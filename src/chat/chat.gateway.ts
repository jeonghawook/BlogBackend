import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
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

  
  handleConnection(client: Socket) {
    const accessToken = client.handshake.query.accessToken;
  
    if (typeof accessToken === 'string') {
      try {
        const user = this.jwtService.verify(accessToken, { secret: 'ATlife4u' });
  
        // Notify other clients that a user has joined
        this.connectedUsers.set(user.nickname, client);
  
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

    if (typeof accessToken === 'string') {
      // 'accessToken' is a valid string
      try {
        // Verify the access token using your JWT service
        const user = this.jwtService.verify(accessToken, { secret: 'ATlife4u' });
     // Now, 'user' contains the user information, and the access token is valid.
      this.connectedUsers.delete(user.userId)
      this.server.emit('userLeft', { userId:user.userId });
     
      } catch (error) {
        // Handle token verification error here (e.g., unauthorized access)
        console.error('Access token verification failed:', error.message);
        // Optionally, disconnect the WebSocket connection or take appropriate action
      }
    } else {
      // Handle the case where 'accessToken' is not a valid string (e.g., an array or undefined)
      console.error('Invalid access token:', accessToken);
      // Optionally, disconnect the WebSocket connection or take appropriate action
    }
 
  }

  @SubscribeMessage('MessageToServer')
  handleMessage(client: Socket, payload: { text: string, to: string, myId:string }) {
    // Handle incoming chat messages
    console.log(payload)
    const { text, to, myId } = payload;
    // Implement message handling logic (e.g., store messages, deliver to recipients)

    const recipientClient = this.connectedUsers.get(to);
    console.log(text)
    recipientClient.emit('chatMessage', payload );
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
