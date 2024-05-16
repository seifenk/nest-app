import { Injectable, HttpException } from '@nestjs/common';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}
  async create(file) {
    const fileHash = crypto.createHash('md5').update(file.buffer).digest('hex');
    const fileExist = await this.findOneBy({
      hashId: fileHash,
    });
    if (fileExist) return fileExist.path;
    else {
      const path = `./uploads/${uuidv4() + '-' + file.originalname}`;
      fs.writeFileSync(path, file.buffer);
      const one = {
        hashId: fileHash,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: path.substring(1),
      };
      await this.fileRepository.save(one);
      return path.substring(1);
    }
  }

  createChunk(file, body) {
    const { hash, index, name } = body;
    fs.mkdirSync(`./uploads/chunks_${name}`, { recursive: true });
    const myHash = crypto.createHash('md5').update(file.buffer).digest('hex');
    if (myHash !== hash)
      throw new HttpException('文件校验失败,请重新上传', 400);
    const path = `./uploads/chunks_${name}/${name}-${index}`;
    fs.writeFileSync(path, file.buffer);
    return `文件${name},${index}上传成功`;
  }

  mergeChunk(body) {
    const { name } = body;

    const files = fs.readdirSync(`./uploads/chunks_${name}`);
    files.sort((a, b) => {
      return Number(a.split('-').pop()) - Number(b.split('-').pop());
    });

    let pos = 0;
    for (const file of files) {
      const writestream = fs.createWriteStream(`./uploads/${name}`, {
        start: pos,
      });
      const readstream = fs.createReadStream(
        `./uploads/chunks_${name}/${file}`,
      );

      readstream.pipe(writestream, { end: true });
      pos += fs.statSync(`./uploads/chunks_${name}/${file}`).size;
    }
  }

  findAll() {
    return `This action returns all file`;
  }

  findOneBy(data) {
    return this.fileRepository.findOneBy(data);
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
