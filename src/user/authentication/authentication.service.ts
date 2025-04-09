import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { CreateUserDTO } from '../DTO/create-user.dto';
import { UpdateUserDTO } from '../DTO/update-user.dto';
import { UserService } from "../user.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {
  constructor (private _userService: UserService) {}

  async create(user: CreateUserDTO) {
    let existingUser = await this._userService.getByEmail(user.email);

    if (existingUser.length > 0) {
      throw new BadRequestException("L'email fourni est déjà associé à un compte.");
    } else {
      existingUser = await this._userService.getByUsername(user.username);

      if (existingUser.length > 0) {
        throw new BadRequestException("Le nom d'utilisateur fourni est déjà associé à un compte.");
      }
    }

    const salt = randomBytes(8).toString("hex");
    const hash = (await scrypt(user.password, salt, 32)) as Buffer;

    const hashedPassword = salt + "." + hash.toString("hex");

    return this._userService.create({
      ...user,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
    const [user] = await this._userService.getByEmail(email);

    if (!user) {
      throw new NotFoundException("Aucun compte trouvé associé à l'email fourni");
    }

    const [salt, hashedPassword] = user.password.split(".");

    const hash = (await scrypt(password, salt, 32) as Buffer);

    if (hashedPassword !== hash.toString("hex")) {
      throw new BadRequestException("Le mot de passe entré est inccorrect.");
    }

    return user;
  }

  async updateUserById(id: string, newUser: UpdateUserDTO) {
    const user = await this._userService.getById(id);

    if (!user) {
      throw new NotFoundException("Utilisateur·ice introuvable.");
    }

    const salt = randomBytes(8).toString("hex");
    const hash = (await scrypt(newUser.password, salt, 32)) as Buffer;

    const hashedPassword = salt + "." + hash.toString("hex");

    return this._userService.updateById(id, {
      ...newUser,
      password: hashedPassword,
    });
  }
}
