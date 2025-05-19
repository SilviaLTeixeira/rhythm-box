import type { FC } from 'react';
import { Row, Col, Typography, Button, Space, Table, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import { usePlaylists } from '../../domains/playlists/hooks/usePlaylists';
import type { Playlist } from '../../domains/playlists/types/Playlist';

export const PlaylistsListPage: FC = () => {
  const navigate = useNavigate();
  const { playlists, loading, error, remove } = usePlaylists();

  const columns: ColumnsType<Playlist> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    {
     title: 'Tracks',
     dataIndex: 'tracks',
     key: 'tracks',
     width: 200,
     render: (tracks: Playlist['tracks'] = []) =>
     Array.isArray(tracks)
      ? tracks.map(t => t.id).join(', ')    
      : '',
    },
    {
    title: 'Ações',
    key: 'actions',
    width: 180,
    render: (_: any, record: Playlist) => (
      <Space>
        <Button onClick={() => navigate(`/playlists/${record.id}`)}>
          Editar
        </Button>
        <Popconfirm
          title="Confirma exclusão?"
          onConfirm={() => remove(record.id)}
          okText="Sim"
          cancelText="Não"
        >
          <Button danger>Excluir</Button>
        </Popconfirm>
      </Space>
    ),
  },
  ];

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ background: '#1890ff', padding: '16px 24px', marginBottom: 16 }}
      >
        <Col>
          <Typography.Title level={3} style={{ color: '#fff', margin: 0 }}>
            Playlists
          </Typography.Title>
        </Col>
        <Col>
          <Space>
            <Button type="primary" onClick={() => navigate('/playlists/new')}>
              Nova Playlist
            </Button>
            <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
          </Space>
        </Col>
      </Row>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={playlists}
        pagination={false}
        style={{ padding: '0 24px' }}
      />
      {error && (
        <div style={{ padding: 24 }}>
          <Typography.Text type="danger">{error}</Typography.Text>
        </div>
      )}
    </>
  );
};
