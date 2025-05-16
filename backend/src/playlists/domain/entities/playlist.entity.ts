import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { Users } from '../../../users/domain/entities/users.entity';
import { Tracks } from '../../../tracks/domain/entities/tracks.entity';

@Entity('playlists')
@Unique(['name']) 
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  
  @ManyToOne(() => Users, (user) => user.playlists, { eager: true })
  createdBy: Users;

  @ManyToMany(() => Tracks, { eager: true })
  @JoinTable({
    name: 'playlist_tracks',
    joinColumn: { name: 'playlist_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'track_id', referencedColumnName: 'id' },
  })
  tracks: Tracks[];

  @CreateDateColumn()
  createdAt: Date;
}
