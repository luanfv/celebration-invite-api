export interface CelebrationRepository {
  async isExists(id: string): Promise<boolean>;
}
