import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tracks')
export class Tracks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column() 
  album: string;

  @Column()
  artistId: string;
}