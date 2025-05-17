import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Playlist } from '../../../playlists/domain/entities/playlist.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Playlist, (playlist) => playlist.createdBy)
  playlists: Playlist[];
}