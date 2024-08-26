import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { AbcService } from './abc.service';
import { CreateAbcDto } from './dto/create-abc.dto';
import { UpdateAbcDto } from './dto/update-abc.dto';
import { Server, WebSocket } from 'ws';
@WebSocketGateway()
export class AbcGateway {
  constructor(private readonly abcService: AbcService) {}

  @SubscribeMessage('createAbc')
  create(@MessageBody() createAbcDto: CreateAbcDto) {
    return this.abcService.create(createAbcDto);
  }

  @SubscribeMessage('findAllAbc')
  findAll(client, data: string) {
    console.log(client, WebSocket);
  }

  @SubscribeMessage('findOneAbc')
  findOne(@MessageBody() id: number) {
    return this.abcService.findOne(id);
  }

  @SubscribeMessage('updateAbc')
  update(@MessageBody() updateAbcDto: UpdateAbcDto) {
    return this.abcService.update(updateAbcDto.id, updateAbcDto);
  }

  @SubscribeMessage('removeAbc')
  remove(@MessageBody() id: number) {
    return this.abcService.remove(id);
  }
}
