import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourEntity } from './entities/tours.entity';
import { UsersService } from 'src/users/users.service';
import { StorageService } from 'src/storage/storage.service';
import { ViewUserDto } from 'src/users/dto/view-user.dto';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ResidenceService } from 'src/residence/residence.service';
import { TourDetailsViewDto } from './dto/tour-details-view.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(TourEntity)
    private readonly toursRepository: Repository<TourEntity>,
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
    private readonly residenceService: ResidenceService,
  ) {}

  async findAll(): Promise<TourEntity[]> {
    return await this.toursRepository.find({
      relations: {
        author: true,
      },
    });
  }

  async getAll(): Promise<any> {
    const tours = await this.toursRepository.find({
      relations: {
        author: true,
      },
    });

    const toursDtos = [];
    for (const tour of tours) {
      const { imageKeys, ...tourData } = tour;

      const image_urls = [];
      for (const imageKey of imageKeys) {
        image_urls.push(await this.storageService.get(imageKey));
      }
      toursDtos.push({
        image_urls: image_urls,
        ...tourData,
      });
    }

    return toursDtos;
  }

  async findById(id: string): Promise<TourEntity> {
    return await this.toursRepository.findOne({
      where: {
        uuid: id,
      },
      relations: {
        author: true,
        residencies: true,
      },
    });
  }

  async getById(id: string, userId?: string): Promise<TourDetailsViewDto> {
    const tour = await this.findById(id);

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    if (!tour.isPublished) {
      if (userId && userId !== tour.author.id) {
        throw new UnauthorizedException('Not author of this tour');
      }
    }

    const {
      imageKeys,
      author,
      residencies,
      ...tourData
    } = tour;

    const imageUrls: string[] = [];
    for (const imageKey of imageKeys) {
      const presignedUrl = await this.storageService.get(imageKey);
      imageUrls.push(presignedUrl);
    }

    const residenciesDtos = [];
    for (const residency of [...residencies]) {
      const residencyDto = await this.residenceService.getById(residency.id);
      residenciesDtos.push(residencyDto);
    }

    const authorDto: ViewUserDto = {...author}

    return {
      imageUrls: imageUrls,
      residencies: residenciesDtos,
      author: authorDto,
      residenceComfort: 5,
      ...tourData,
    };
  }

  async create(
    createTourDto: CreateTourDto,
    images: Express.Multer.File[],
    author_uuid: string,
  ): Promise<TourEntity> {
    const author = await this.usersService.findById(author_uuid);
    const { images: _, ...tourData } = createTourDto;

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

    for (const imageKey of tourToDelete.imageKeys) {
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
