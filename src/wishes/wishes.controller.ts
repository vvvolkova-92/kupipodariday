import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}
  // 1. POST /wishes - новый желаемый подарок
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user, createWishDto);
  }
  //
  // @Get()
  // findAll() {
  //   return this.wishesService.findAll();
  // }
  // 2. GET /wishes/:id - подарок по id
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.wishesService.findById(+id);
  }
  // todo для PATCH и DELETE реализовать проверку по ID!
  // 3. PATCH /wishes/:id - редактировать подарок по id
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return await this.wishesService.update(+id, updateWishDto);
  }
  // 4. DELETE /wishes/:id - удалить подарок по id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.wishesService.remove(+id);
  }
  // 5. GET /wishes/last - в свагере непонятно, а в чек-листе 40 последних подарков
  @Get('last')
  async findLastWishes() {
    return await this.wishesService.lastWishes();
  }
  // 6. GET /wishes/top - в свагере непонятно, а в чек-листе 10 топ подарков
  @Get('top')
  async findTopWishes() {
    return await this.wishesService.topWishes();
  }
  // 7. POST /wishes/:id/copy - копия подарка
  @Post(':id/copy')
  async copyWish(@Req() req, @Param('id') id: string) {
    return await this.wishesService.copyWish(+id, req.user);
  }
}
