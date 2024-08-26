import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, WebSocket } from 'ws';
import { WebsocketClient } from 'okx-api';
import { IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  clientsMap = new Map<string, WebSocket>();
  constructor(private okxWsClient: WebsocketClient) {}

  handleConnection(client) {
    const clientId = uuidv4();
    this.clientsMap.set(clientId, client);
    client.id = clientId; // 将 clientId 附加到客户端对象
    console.log(client.id + '已连接');
  }

  handleDisconnect(client: any) {
    this.clientsMap.delete(client.id);
    console.log(client.id + '断开连接');
  }

  sendToClient(clientId: string, message: any) {
    const client = this.clientsMap.get(clientId);
    if (client) {
      client.send(JSON.stringify(message));
    }
  }
  sendToAll(message: any) {
    this.server.clients.forEach((item) => item.send(JSON.stringify(message)));
  }

  @SubscribeMessage('70')
  handle70Event(client: any, data: any) {
    console.log(this.okxWsClient);

    this.okxWsClient.on('update', (data) => {
      this.sendToClient(client.id, data);
    });
    this.okxWsClient.on('response', (data) => {});
    data.projects.split(',').forEach((p) => {
      this.okxWsClient.subscribe({
        channel: data.channel,
        instId: `${p}-USDT-SWAP`,
      });
    });
  }

  @SubscribeMessage('20')
  handle20Event(client: any, data: any) {
    this.okxWsClient.on('update', (data) => {
      console.log(data);

      this.sendToClient(client.id, data);
    });
    this.okxWsClient.subscribe({
      channel: 'instruments',
      instType: 'FUTURES',
    });
  }
}
