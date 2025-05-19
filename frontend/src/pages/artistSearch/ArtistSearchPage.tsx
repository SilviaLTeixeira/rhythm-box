import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Input, Typography, Button, Space } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

export function ArtistSearchPage() {
  const [slug, setSlug] = useState('');
  const navigate = useNavigate();

  const onSearch = () => {
    if (slug.trim()) {
      navigate(`/artists/${slug.trim()}`);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'var(--blue-primary)', padding: '0 2rem' }}>
        <Title style={{ color: '#fff', margin: 0, lineHeight: '64px' }} level={3}>
          Rhythm Box
        </Title>
      </Header>
      <Content style={{ padding: '2rem' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={4}>Buscar Perfil de Artista</Title>
          
          <Input.Search
            placeholder="Digite o slug (ex: u2, linkin-park)"
            enterButton="Buscar"
            size="large"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onSearch={onSearch}
          />

          <Space size="middle" style={{ marginTop: '1rem' }}>
            <Button onClick={() => navigate('/')} type="default">
              Voltar ao Início
            </Button>
          </Space>
        </Space>
      </Content>
    </Layout>
  );
}

