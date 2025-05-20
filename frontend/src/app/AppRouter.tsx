import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { ArtistSearchPage } from '../pages/artistSearch';
import { UserListPage } from '@/pages/users/UserListPage';
import { ArtistProfilePage } from '@/pages/artistProfile/ArtistProfilePage';
import { PlaylistsListPage } from '@/pages/playlist/PlaylistsListPage';
import { PlaylistFormPage } from '@/pages/playlist/PlaylistFormPage';
import { TracksListPage } from '@/pages/tracks/TrackListPage';
import { TrackFormPage } from '@/pages/tracks/TrackFormPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/*Users*/}
        <Route path="/users" element={<UserListPage />} />

        {/*Artists*/}
        <Route path="/artists" element={<ArtistSearchPage />} />
        <Route path="/artists/:slug" element={<ArtistProfilePage />} />

        {/* Playlists */}
        <Route path="/playlists" element={<PlaylistsListPage />} />
        <Route path="/playlists/new" element={<PlaylistFormPage />} />
        <Route path="/playlists/:id" element={<PlaylistFormPage />} />

        {/* Tracks */}
        <Route path="/tracks" element={<TracksListPage />} />
        <Route path="/tracks/new" element={<TrackFormPage />} />
        <Route path="/tracks/:id" element={<TrackFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}
