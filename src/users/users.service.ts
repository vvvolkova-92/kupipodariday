import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Wish } from "../wishes/entities/wish.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
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
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
    //TODO выкинуть ошибку, если ничего не нашлось
  }
  // поиск пользователя по username
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    return user;
    //TODO выкинуть ошибку, если ничего не нашлось
  }
  // поиск пользователя по email? не понимаю запроса
  async findByEmail(query: string): Promise<User[]> {
    const user = await this.userRepository.find({
      where: [{ email: query }],
    });
    return user;
    //TODO выкинуть ошибку, если ничего не нашлось
  }
  // поиск подарков по пользователю
  async findUserWishes(id: number): Promise<Wish[]> {
    const wishes = await this.wishRepository.find({
      where: { owner: { id } },
    });
    //TODO выкинуть ошибки
    return wishes;
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
    const user = await this.findById(id);
    await this.userRepository.delete(id);
  }
}
