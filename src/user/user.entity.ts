import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "nvarchar", length: 50, unique: true, })
  username: string;

  @Column({ type: "nvarchar", length: 50, unique: true, })
  email: string;

  @Column()
  password: string;

  @Column({ default: false, })
  isAdmin: boolean = false;
}
