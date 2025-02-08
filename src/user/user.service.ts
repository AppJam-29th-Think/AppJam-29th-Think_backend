import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseStrategy } from 'src/shared/strategies/response.strategy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private responseStrategy: ResponseStrategy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { uid: createUserDto.uid },
      });

      if (existingUser) {
        this.responseStrategy.conflict('User already exists');
      }

      const newUser = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(newUser);

      return this.responseStrategy.created(
        'User created successfully',
        savedUser,
      );
    } catch (error) {
      return this.responseStrategy.error('Failed to create user', error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      if (!users.length) {
        return this.responseStrategy.notFound('No Users found');
      }

      return this.responseStrategy.success(
        'Users retrieved successfully',
        users,
      );
    } catch (error) {
      return this.responseStrategy.error('Failed to retrieve Users', error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { uid: id } });

      if (!user) {
        return this.responseStrategy.notFound('User not found');
      }

      return this.responseStrategy.success('User retrieved successfully', user);
    } catch (error) {
      return this.responseStrategy.error('Failed to retrieve user', error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existingPost = await this.userRepository.findOne({
        where: { uid: id },
      });

      if (!existingPost) {
        return this.responseStrategy.notFound('User not found');
      }

      await this.userRepository.update(id, updateUserDto);

      return this.responseStrategy.success('User updated successfully');
    } catch (error) {
      return this.responseStrategy.error('Failed to update user', error);
    }
  }

  async remove(id: string) {
    try {
      const post = await this.userRepository.findOne({ where: { uid: id } });

      if (!post) {
        return this.responseStrategy.notFound('User not found');
      }

      await this.userRepository.delete(id);

      return this.responseStrategy.success('User deleted successfully');
    } catch (error) {
      return this.responseStrategy.error('Failed to delete user', error);
    }
  }
}
