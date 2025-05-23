import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private _userRepo: Repository<User>) { }

  getAll() {
    return this._userRepo.find();
  }

  getById(id: string) {
    return this._userRepo.findBy({ id, });
  }

  getByEmail(email: string) {
    return this._userRepo.findBy({ email, });
  }

  getByUsername(username: string) {
    return this._userRepo.findBy({ username, });
  }

  create(user: CreateUserDTO) {
    const newUser = this._userRepo.create(user);
    return this._userRepo.save(newUser);
  }

  updateById(id: string, user: UpdateUserDTO) {
    return this._userRepo.update(id, user);
  }

  deleteById(id: string) {
    return this._userRepo.delete(id);
  }
}
