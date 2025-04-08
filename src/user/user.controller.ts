import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (
    private _userService: UserService,
    private _authService: AuthenticationService,
  ) { }

  @Get()
  async getAll() {
    return this._userService.getAll();
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    return this._userService.getById(id);
  }

  @Post("/register")
  async create(@Body() body: CreateUserDTO) {
    return this._authService.create(body);
  }

  @Post("/login")
  async login(@Body() body: { email: string, password: string }) {
    return this._authService.login(body.email, body.password);
  }

  @Patch("/:id")
  async updateById(@Param("id") id: string, @Body() body: UpdateUserDTO) {
    return this._authService.updateUserById(id, body);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    return this._userService.deleteById(id);
  }
}
