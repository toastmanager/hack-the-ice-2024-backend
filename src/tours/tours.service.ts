import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourEntity } from './entities/tours.entity';
import { UpdateTourDto } from './dto/tour/update-tour.dto';
import { UsersService } from 'src/users/users.service';
import { StorageService } from 'src/storage/storage.service';
import { ConfigService } from '@nestjs/config';
import { ViewUserDto } from 'src/users/dto/view-user.dto';
import { TourViewDto } from './dto/tour/tour-view.dto';
import { CreateTourDto } from './dto/tour/create-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(TourEntity)
    private readonly toursRepository: Repository<TourEntity>,
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<TourEntity[]> {
    return await this.toursRepository.find({
      relations: {
        author: true,
      },
    });
  }

  async findById(id: string): Promise<TourEntity> {
    return await this.toursRepository.findOne({
      where: {
        uuid: id,
      },
      relations: {
        author: true,
      },
    });
  }

  async getById(id: string): Promise<TourViewDto> {
    const tour = await this.findById(id);

    if (!tour) {
      throw new NotFoundException('');
    }

    const image_urls: string[] = [];
    for (const imageKey of tour.image_keys) {
      const presignedUrl = await this.storageService.get(imageKey);
      image_urls.push(presignedUrl);
    }

    const { image_keys, author, ...tourData } = tour;

    const viewUser: ViewUserDto = {
      fullname: author.fullname,
      type: author.type,
    }

    return { image_urls: image_urls, author: viewUser, ...tourData };
  }

  async create(
    createTourData: CreateTourDto,
    images: Express.Multer.File[],
    author_uuid: string,
  ): Promise<TourEntity> {
    const author = await this.usersService.findById(author_uuid);
    const { images: _, ...tourData } = createTourData;

    const imageKeys = [];
    for (let img of images) {
      const imageKey = await this.storageService.put(
        img.originalname,
        img.buffer,
      );
      imageKeys.push(imageKey);
    }

    return await this.toursRepository.save({
      author: author,
      image_keys: imageKeys,
      ...tourData,
    });
  }

  async delete(tourId: string, userId: string): Promise<void> {
    const tourToDelete = await this.toursRepository.findOne({
      where: { uuid: tourId },
      relations: { author: true },
    });

    if (!tourId) {
      throw new NotFoundException('Tour not found');
    }
    if (tourToDelete.author.id !== userId) {
      throw new ForbiddenException('Provided user is not author of this tour');
    }

    for (const imageKey of tourToDelete.image_keys) {
      await this.storageService.delete(imageKey);
    }

    await this.toursRepository.remove(tourToDelete);
    return;
  }

  async patch(
    tourId: string,
    newTourData: UpdateTourDto,
    userId: string,
  ): Promise<TourEntity> {
    const tourToUpdate = await this.toursRepository.findOneBy({ uuid: tourId });

    if (!tourToUpdate) {
      throw new NotFoundException(`Tour with UUID ${tourId} not found`);
    }
    if (tourToUpdate.author.id !== userId) {
      throw new ForbiddenException('Provided user is not author of this tour');
    }

    return this.toursRepository.save({ uuid: tourId, ...newTourData });
  }
}
