import '../../styles/global.css'; 
import { Layout, Row, Col, Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  PlayCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const sections = [
  {
    title: 'Playlists',
    description: 'Crie e gerencie suas playlists',
    icon: <PlayCircleOutlined style={{ fontSize: 32, color: 'var(--blue-primary)' }} />,
    link: '/playlists',
  },
  {
    title: 'Tracks',
    description: 'Adicione e veja suas músicas',
    icon: <UnorderedListOutlined style={{ fontSize: 32, color: 'var(--blue-primary)' }} />,
    link: '/tracks',
  },
  {
    title: 'Usuários',
    description: 'Gerencie usuários',
    icon: <UserOutlined style={{ fontSize: 32, color: 'var(--blue-primary)' }} />,
    link: '/users',
  },
  {
    title: 'Artistas',
    description: 'Busque perfis de artistas',
    icon: <SearchOutlined style={{ fontSize: 32, color: 'var(--blue-primary)' }} />,
    link: '/artists',
  },
];

export function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'var(--blue-primary)', padding: '0 2rem' }}>
        <Title style={{ color: '#fff', margin: 0, lineHeight: '64px' }} level={3}>
          Rhythm Box
        </Title>
      </Header>
      <Content style={{ padding: '2rem' }}>
        <Title level={4}>Bem-vindo(a) ao Rhythm Box</Title>
        <Row gutter={[16, 16]}>
          {sections.map((sec) => (
            <Col xs={24} sm={12} md={12} lg={6} key={sec.title}>
              <Card
                hoverable
                style={{ borderRadius: 8 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {sec.icon}
                <Title level={5} style={{ marginTop: '1rem' }}>
                  {sec.title}
                </Title>
                <Text>{sec.description}</Text>
                <Link to={sec.link} style={{ marginTop: '1rem' }}>
                  <Button type="primary">Acessar</Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}