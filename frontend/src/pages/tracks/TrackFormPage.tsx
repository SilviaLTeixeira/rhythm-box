import { type FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space, Spin, Alert } from 'antd';
import { useTracks } from '../../domains/tracks/hooks/useTracks';
import { type Track } from '../../domains/tracks/types/Track';

export const TrackFormPage: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const editId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const { tracks, loading, error, createTrack, updateTrack } = useTracks();
  const [form] = Form.useForm<Partial<Track>>();

  useEffect(() => {
    if (editId !== null && !loading) {
      const t = tracks.find(t => t.id === editId);
      if (t) {
        form.setFieldsValue({
          name:     t.name,
          album:    t.album,
          artistId: t.artistId,
        });
      }
    }
  }, [editId, tracks, loading, form]);

  const onFinish = async (values: Partial<Track>) => {
    try {
      if (editId !== null) {
        await updateTrack(editId, values);
      } else {
        await createTrack(values as Omit<Track, 'id'>);
      }
      navigate('/tracks');
    } catch (e) {
    }
  };

  if (loading) {
    return (
      <Space style={{ width: '100%', height: '100vh' }} align="center">
        <Spin size="large" />
      </Space>
    );
  }

  if (error) {
    return <Alert message={error} type="error" style={{ margin: 24 }} />;
  }

  return (
    <Space direction="vertical" style={{ width: '100%', padding: 24 }}>
      <Button onClick={() => navigate('/tracks')}>← Voltar</Button>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Nome da Track"
          rules={[{ required: true, message: 'Informe o nome da track' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="album"
          label="Álbum"
          rules={[{ required: true, message: 'Informe o álbum' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="artistId"
          label="ID do Artista"
          rules={[{ required: true, message: 'Informe o ID do artista' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {editId ? 'Atualizar Track' : 'Criar Track'}
            </Button>
            <Button onClick={() => navigate('/tracks')}>Cancelar</Button>
          </Space>
        </Form.Item>
      </Form>
    </Space>
  );
};
