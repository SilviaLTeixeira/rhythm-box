import { useState } from 'react'; 
import {
  Layout,
  Typography,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Alert
} from 'antd';
import { type User }        from '@/domains/users/types/User';
import { type CreateUserDto } from '@/domains/users/types/CreateUserDto';
import { useUsers }         from '@/domains/users/hooks/useUsers';
import { createUser, updateUser, deleteUser } from '@/domains/users/services/userService';

const { Header, Content } = Layout;
const { Title }           = Typography;

export function UserListPage() {
  const { users, loading, error, refresh } = useUsers();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser]   = useState<User|undefined>(undefined);
  const [form] = Form.useForm<CreateUserDto>();

  const openCreate = () => {
    setEditingUser(undefined);
    form.resetFields();
    setModalVisible(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({ name: user.name });
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const dto = await form.validateFields();
      if (editingUser) {
        await updateUser(editingUser.id, dto);
        message.success('Usuário atualizado');
      } else {
        await createUser(dto);
        message.success('Usuário criado');
      }
      setModalVisible(false);
      refresh();
    } catch {
     
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      message.success('Usuário deletado');
      refresh();
    } catch {
      message.error('Falha ao deletar usuário');
    }
  };

  const columns = [
    { title: 'ID',   dataIndex: 'id',   width: 80 },
    { title: 'Nome', dataIndex: 'name' },
    {
      title: 'Ações',
      key: 'actions',
      width: 160,
      render: (_: any, record: User) => (
        <Space>
          <Button size="small" onClick={() => openEdit(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Deletar este usuário?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">
              Deletar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) return <Alert message={error} type="error" style={{ margin: 24 }} />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--blue-primary)',
          padding: '0 2rem',
        }}
      >
        <Title level={3} style={{ color: '#fff', margin: 0, lineHeight: '64px' }}>
          Usuários
        </Title>
        <Space>
          <Button type="primary" onClick={openCreate}>
            Novo Usuário
          </Button>
          <Button onClick={() => window.location.href = '/'}>
            Voltar ao Início
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: '2rem' }}>
        <Table<User>
          rowKey="id"
          dataSource={users}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </Content>

      <Modal
        title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Informe o nome' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
