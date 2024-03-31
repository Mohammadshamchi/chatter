import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    // for create user we reach out to the users Repository
    return this.usersRepository.create({
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password),
    });
    // and also because the user data now store in plain text we use the bcrypt library to hash the password
  }
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  // We Change id:number to id:string because in mongodb the id is a string
  async findOne(_id: string) {
    return this.usersRepository.findOne({ _id });
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserInput,
          password: await this.hashPassword(updateUserInput.password),
        },
      },
    );
  }

  async remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id });
  }
}
