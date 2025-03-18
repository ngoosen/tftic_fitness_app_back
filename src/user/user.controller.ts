import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (private _userService: UserService) { }

  @Get()
  async getAll() {
    return this._userService.getAll();
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    return this._userService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this._userService.create(body);
  }

  @Patch("/:id")
  async updateById(@Param("id") id: string, @Body() body: UpdateUserDTO) {
    return this._userService.updateById(id, body);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    return this._userService.deleteById(id);
  }
}
