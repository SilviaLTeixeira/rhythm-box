import { type FC } from 'react';
import { Row, Col, Typography, Button, Space, Table, Popconfirm } from 'antd';
import { type ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import { useTracks } from '../../domains/tracks/hooks/useTracks';
import type { Track } from '../../domains/tracks/types/Track';

export const TracksListPage: FC = () => {
  const navigate = useNavigate();
  const { tracks, loading, error, deleteTrack } = useTracks();

  const columns: ColumnsType<Track> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Álbum', dataIndex: 'album', key: 'album' },
    { title: 'Artista (ID)', dataIndex: 'artistId', key: 'artistId', width: 120 },
    {
    title: 'Ações',
    key: 'actions',
    render: (_: any, record: Track) => (
        <Space>
        <Button onClick={() => navigate(`/tracks/${record.id}`)}>
            Editar
        </Button>
        <Popconfirm
            title="Confirma exclusão?"
            onConfirm={() => deleteTrack(record.id)}
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
            Tracks
          </Typography.Title>
        </Col>
        <Col>
          <Space>
            <Button type="primary" onClick={() => navigate('/tracks/new')}>
              Nova Track
            </Button>
            <Button onClick={() => navigate('/')}>
              Voltar ao Início
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={tracks}
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
