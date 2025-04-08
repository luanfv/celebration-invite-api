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
    return celebration;
  }

  async updateById(
    id: string,
    celebration: CelebrationAggregate,
  ): Promise<CelebrationAggregate> {
    const celebrationUpdated = this._celebration.find((item, index) => {
      if (item.id === id) {
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
        this._celebration[index] = new CelebrationEntity(
          id,
          title,
          status,
          description,
          address,
          date,
          createdAt,
          updatedAt,
        );
      }
    });
    if (!celebrationUpdated) return undefined;
    return CelebrationAggregate.restore({
      id: celebrationUpdated.id,
      addressNumber: celebrationUpdated.address.number,
      addressStreet: celebrationUpdated.address.street,
      addressZipCode: celebrationUpdated.address.zipCode,
      date: celebrationUpdated.date,
      description: celebrationUpdated.description,
      title: celebrationUpdated.title,
      status: celebrationUpdated.status,
      createdAt: celebrationUpdated.createdAt,
      updatedAt: celebrationUpdated.updatedAt,
    });
  }

  async findById(id: string) {
    const celebration = this._celebration.find(
      (celebration) => celebration.id === id,
    );
    if (!celebration) return undefined;
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
