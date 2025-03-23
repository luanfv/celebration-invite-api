import { CelebrationEntity } from '../entity/celebration.entity';
import { CelebrationAggregate } from '../../../domain/celebration.aggregate';
import { Injectable } from '@nestjs/common';
import { CelebrationRepository } from '../../../application/repository/celebration.repository';

@Injectable()
export class CelebrationMemoryRepository implements CelebrationRepository {
  private _celebration: CelebrationEntity[] = [];

  async save(celebration: CelebrationAggregate) {
    const {
      address,
      date,
      description,
      id,
      status,
      title,
      createdAt,
      updatedAt,
    } = celebration.values;
    this._celebration.push(
      new CelebrationEntity(
        id,
        title,
        status,
        description,
        address,
        date,
        createdAt,
        updatedAt,
      ),
    );
  }

  async findById(id: string) {
    const celebration = this._celebration.find(
      (celebration) => celebration.id === id,
    );
    return CelebrationAggregate.restore({
      id: celebration.id,
      addressNumber: celebration.address.number,
      addressStreet: celebration.address.street,
      addressZipCode: celebration.address.zipCode,
      date: celebration.date,
      description: celebration.description,
      title: celebration.title,
      status: celebration.status,
      createdAt: celebration.createdAt,
      updatedAt: celebration.updatedAt,
    });
  }
}
