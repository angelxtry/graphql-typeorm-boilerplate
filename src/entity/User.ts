import {
  Entity, Column, BaseEntity, PrimaryGeneratedColumn,
} from 'typeorm';
// import uuidv4 from 'uuid/v4';

@Entity('users')
export class User extends BaseEntity {
  // @PrimaryColumn('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('text')
  password: string;

  // @BeforeInsert()
  // addId() {
  //   this.id = uuidv4();
  // }
}
