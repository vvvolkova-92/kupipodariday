import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  // 1. POST /offers СОЗДАТЬ ОФФЕР
  @Post()
  async create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return await this.offersService.create(req.user, createOfferDto);
  }
  // 2. GET /offers получить все предложения
  @Get()
  async findAll() {
    return await this.offersService.findAll();
  }
  // 3. GET /offers/:id получить предложение по id
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.offersService.findById(+id);
  }
}
