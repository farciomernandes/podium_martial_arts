import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}