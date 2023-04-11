import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // создание пользователя
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    // TODO bcrypt пароль
    return this.userRepository.save(user);
  }
  // поиск всех пользователей
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  // поиск пользователя по id
  async findBy(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
    //TODO выкинуть ошибку, если ничего не нашлось
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //TODO выкинуть ошибки, если нет юзера с таким айди или другая беда =)
    const user = await this.userRepository.update(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
    return user;
  }

  async remove(id: number) {
    const user = await this.findBy(id);
    await this.userRepository.delete(id);
  }
}
