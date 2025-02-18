import { Injectable } from '@nestjs/common';
import { CelebrationRepository } from '../../application/repository/celebration.repository';

@Injectable()
export class CelebrationMemoryRepository implements CelebrationRepository {
  async isExists(id: string): Promise<boolean> {
    return true;
  }
}
