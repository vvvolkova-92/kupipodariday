import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from "typeorm";
import { Wish } from "./entities/wish.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}
  // создание подарка
  async create(owner: User, createWishDto: CreateWishDto): Promise<Wish> {
    // кто-то же вещь добавил изначально, значит должен быть владелец?
    const wish = await this.wishRepository.create({ ...createWishDto, owner });
    return this.wishRepository.save(createWishDto);
  }
  // поиск всех
  findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }
  // поиск по id
  async findById(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOneBy({ id });
    return wish;
    //TODO выкинуть ошибку, если ничего не нашлось
  }
  //
  async update(id: number, updateWishDto: UpdateWishDto) {
    //TODO выкинуть ошибки, если нет подарка с таким айди или другая беда =)
    const wish = await this.wishRepository.update(id, {
      ...updateWishDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: number) {
    //TODO выкинуть ошибки, если нет подарка с таким айди или другая беда =)
    const wish = await this.wishRepository.findOneBy({ id });
    await this.wishRepository.delete(id);
  }
}
