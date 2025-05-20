import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylists } from '../../domains/playlists/hooks/usePlaylists';
import { Form, Input, Select, Button, Space, Spin } from 'antd';
import { getAllTracks } from '../../domains/tracks/services/trackService'; 

interface PlaylistFormValues {
  name: string;
  trackIds: number[];
  createdById: number;
}

export const PlaylistFormPage: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const editId = id ? parseInt(id) : null;
  const navigate = useNavigate();
  const { playlists, create, update } = usePlaylists();
  const [form] = Form.useForm<PlaylistFormValues>();
  const [tracks, setTracks] = useState<{ id: number; name: string }[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(true);

  useEffect(() => {
    getAllTracks().then(data => setTracks(data.map(t => ({ id: t.id, name: t.name }))))
      .finally(() => setLoadingTracks(false));
  }, []);

 useEffect(() => {
  if (editId !== null) {
    const p = playlists.find(pl => pl.id === editId);
    if (p) {
      form.setFieldsValue({
        name: p.name,
        
        trackIds: p.tracks.map(t => t.id),
        
        createdById: p.createdBy.id,
      });
    }
  }
}, [editId, playlists, form]);


  const onFinish = async (values:  PlaylistFormValues) => {
    if (editId !== null) {
      await update(editId, values);
    } else {
      await create(values);
    }
    navigate('/playlists');
  };

  return (
    <Space direction="vertical" style={{ width: '100%', padding: 24 }}>
      <Button onClick={() => navigate('/playlists')}>← Voltar</Button>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Nome da Playlist" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="createdById" label="ID do Usuário" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item name="trackIds" label="Tracks" rules={[{ required: true }]}>
          {loadingTracks ? <Spin /> : (
          <Select mode="multiple" options={tracks.map(t => ({ label: t.name, value: t.id }))} /> )}
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {editId ? 'Atualizar' : 'Criar'}
            </Button>
            <Button onClick={() => navigate('/playlists')}>Cancelar</Button>
          </Space>
        </Form.Item>
      </Form>
    </Space>
  );
};