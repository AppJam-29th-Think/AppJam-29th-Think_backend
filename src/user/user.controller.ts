import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const response = await this.userService.create(createUserDto);
    return res.status(response.status).json(response);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const response = await this.userService.findAll();
    return res.status(response.status).json(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const response = await this.userService.findOne(id);
    return res.status(response.status).json(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.update(id, updateUserDto);
    return res.status(response.status).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response = await this.userService.remove(id);
    return res.status(response.status).json(response);
  }
}
