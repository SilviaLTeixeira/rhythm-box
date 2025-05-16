import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { ArtistsModule } from './artists/artists.module';

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
    PlaylistsModule,ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

