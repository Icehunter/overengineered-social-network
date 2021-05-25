import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/abstracts/EntityBase';
import { Exclude, Expose } from 'class-transformer';
import bcrypt from 'bcrypt';
import { Role } from './Role';

@Entity({ name: 'users' })
export class User extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role_id: number;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Expose({ name: 'full_name' })
  get fullName() {
    return this.first_name + ' ' + this.last_name;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async setDefaultRole() {
    const roleId = this.role_id ? this.role_id : 2;

    this.role_id = roleId;
  }
}
