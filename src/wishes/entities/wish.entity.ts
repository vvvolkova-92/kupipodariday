import {Column, Entity, ManyToOne} from 'typeorm';
import { BaseClass } from '../../base/base-class';
import {IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length, MaxLength, MinLength} from 'class-validator';
import {User} from "../../users/entities/user.entity";

@Entity()
export class Wish extends BaseClass {
  // колонка name wish
  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'Название слишком короткое, минимум 1 символ',
  })
  @MaxLength(250, {
    message: 'Название слишком длинное, максимум 250 символов',
  })
  name: string;

  // колонка link
  @Column()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  // колонка image
  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  // колонка price
  @Column()
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  price: number;

  // колонка raised
  @Column({
    default: 0,
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  raised: number;

  // колонка description
  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 1024)
  description: string;
  // колонка copied
  @Column()
  @IsInt()
  copied: number;
  // колонка со ссылкой на пользователя, который добавил подарок в желаемые, 1 ко многим
  @ManyToOne(() => User, (owner) => owner.wishes)
  owner: User;
  // todo массив ссылок на заявки скинуться от других пользователей
}
