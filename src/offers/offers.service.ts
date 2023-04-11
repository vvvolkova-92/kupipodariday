import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Offer } from "./entities/offer.entity";
import { Wish } from "../wishes/entities/wish.entity";
import { WishesService } from "../wishes/wishes.service";

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}
  async create(user: User, createOfferDto: CreateOfferDto) {
    const wishId = createOfferDto.item;
    const wish = await this.wishesService.findById(wishId);
    //TODO считать сумму
    //TODO запрет скидывать самому себе
    // if(user.id === wish.owner.id)
    await this.wishesService.update(wish.id, {
      raised: +wish.raised + +createOfferDto.amount,
    });
    await this.offerRepository.save({
      ...createOfferDto,
      user,
      item: wish,
    });
  }

  async findAll() {
    return await this.offerRepository.find();
  }

  async findById(id: number) {
    return await this.offerRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
