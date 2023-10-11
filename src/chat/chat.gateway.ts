import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetUser } from 'src/users/common/decorators';
import { Users } from 'src/users/users.entity';


@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
  ) {}



  @WebSocketServer()

  private server: Server; // Initialize the server property

  private logger: Logger = new Logger('ChatGateway');
  
  handleConnection(client: Socket) {
    // Handle WebSocket connection
    const accessToken = client.handshake.query.accessToken;

    if (typeof accessToken === 'string') {
      // 'accessToken' is a valid string
      try {
        // Verify the access token using your JWT service
        const user = this.jwtService.verify(accessToken, { secret: 'ATlife4u' });
      // Notify other clients that a user has joined
        this.logger.log(`User ${user.userId} connected`);
        this.server.emit('userJoined', { userId : user.userId });
     
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

  handleDisconnect(client: Socket) {
    const accessToken = client.handshake.query.accessToken;

    if (typeof accessToken === 'string') {
      // 'accessToken' is a valid string
      try {
        // Verify the access token using your JWT service
        const user = this.jwtService.verify(accessToken, { secret: 'ATlife4u' });
     // Now, 'user' contains the user information, and the access token is valid.
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

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { text: string, recipientId: string }) {
    // Handle incoming chat messages
    console.log(payload)
    const { text, recipientId } = payload;
    // Implement message handling logic (e.g., store messages, deliver to recipients)

    // Broadcast the message to the recipient(s)
    client.to(recipientId).emit('chatMessage', { text, senderId: client.id });
  }
}
