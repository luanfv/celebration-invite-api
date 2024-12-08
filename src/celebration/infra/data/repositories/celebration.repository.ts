import { CelebrationEntity } from '../entities/celebration.entity';
import { CelebrationAggregate } from './../../../domain/celebration.aggregate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CelebrationRepository {
  private _celebration: CelebrationEntity[] = [];

  save(celebration: CelebrationAggregate) {
    const { address, date, description, id, status, title, createAt } =
      celebration.values;
    this._celebration.push(
      new CelebrationEntity(
        id,
        title,
        status,
        description,
        address,
        date,
        createAt,
      ),
    );
  }

  findById(id: string) {
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
    });
  }
}
