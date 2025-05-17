import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',     
      password: 'silvia',        
      database: 'rhythm_db',      
      synchronize: true,          
      autoLoadEntities: true, 
    }),
    PlaylistsModule,ArtistsModule,TracksModule,UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

