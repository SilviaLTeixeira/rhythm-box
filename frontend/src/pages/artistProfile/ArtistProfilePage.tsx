import { useParams, useNavigate } from 'react-router-dom';
import { useArtist } from '../../domains/artists/hooks/useArtist';
import { Layout, Typography, Row, Col, Spin, Alert, Button, Space } from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export function ArtistProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { artist, loading, error } = useArtist(slug!);

  if (loading) {
    return <Spin tip="Carregando..." style={{ margin: '2rem' }} />;
  }


  if (error) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: 'var(--blue-primary)' }}>
          <Title style={{ color: '#fff', margin: 0, lineHeight: '64px' }} level={3}>
            Rhythm Box
          </Title>
        </Header>
        <Content style={{ padding: '2rem' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Alert
              message="Slug não existente"
              type="warning"
              showIcon
            />
            <Space>
              <Button onClick={() => navigate('/artists')}>
                Voltar à Busca
              </Button>
              <Button onClick={() => navigate('/')} type="primary">
                Voltar ao Início
              </Button>
            </Space>
          </Space>
        </Content>
      </Layout>
    );
  }

  const imageUrl = `https://www.vagalume.com.br${artist!.pic_medium}`;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'var(--blue-primary)', padding: '0 2rem' }}>
        <Title style={{ color: '#fff', margin: 0, lineHeight: '64px' }} level={3}>
          {artist?.desc}
        </Title>
      </Header>
      <Content style={{ padding: '2rem' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <img
              src={imageUrl}
              alt={artist?.desc}
              style={{ width: '100%', borderRadius: 8 }}
            />
            <Text>Gêneros: {artist?.genre.map((g) => g.name).join(', ')}</Text>
            <br />
          </Col>
          <Col xs={24} md={16}>
            <Title level={4}>Top 5 Músicas</Title>
            <Row gutter={[8, 8]}>
              {artist?.toplyrics.item.slice(0, 5).map((track) => (
                <Col key={track.id} span={24}>
                  <Text style={{ display: 'block', padding: '8px', background: '#fff', borderRadius: 4 }}>
                    {track.desc}
                  </Text>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Botões de navegação ao final da seção */}
        <Space style={{ marginTop: '2rem' }}>
          <Button onClick={() => navigate('/artists')}>
            Voltar à Busca
          </Button>
          <Button onClick={() => navigate('/')} type="primary">
            Voltar ao Início
          </Button>
        </Space>
      </Content>
    </Layout>
  );
}
