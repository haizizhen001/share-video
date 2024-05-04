import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Layout,
  Typography,
  Space,
  Form,
  Input,
  notification,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  ShareAltOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useContextUser } from '../Common/UserContext'
import { useAuth } from '../../functions/useAuth';

const { Header } = Layout;
const { Title, Text } = Typography;

const HeaderLayout = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const { user, setUser } = useContextUser();
  
  const onLogin = async (value: any) => {
    try {
      const currentUser = await login(value.email, value.password);
      if (currentUser) {
        setUser(currentUser);
        notification.success({
          message: 'Success',
          description: 'Login successfully',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Login error',
        });
      }
    } catch (e) {
      const error = e as Error;
      notification.error({
        message: 'Error',
        description: error.message,
      });
    }
  };
  const onLogout = () => {
    logout();
    setUser(null);
  };
  const share = () => {
    navigate('/share');
  };
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Space>
        <HomeOutlined
          style={{ fontSize: '36px', verticalAlign: 'middle', color: 'white' }}
        />
        <Title level={1} style={{ color: 'white' }}>
          Funny Movies
        </Title>
      </Space>
      <div>
        <Title level={4} style={{ color: 'white' }} />
      </div>
      {Object.keys(user || {}).length === 0 && (
        <Space size={'small'}>
          <Form
            className='login-form'
            style={{ display: 'flex', justifyContent: 'center' }}
            name='login'
            initialValues={{
              remember: true,
            }}
            onFinish={onLogin}
          >
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Emaiil is required!',
                },
              ]}
            >
              <Input
                type='email'
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Email'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Password is required!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                name='login'
                htmlType='submit'
                className='App-button-primary'
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <Space size={'small'}>
            <Link style={{ textDecoration: 'none' }} to={'/register'}>
              Sign Up
            </Link>
          </Space>
        </Space>
      )}
      {Object.keys(user || {}).length > 0 && (
        <Space size={'small'}>
          <Text className='white'>
            Welcome <b>{user?.userName}</b>
          </Text>
          <Button type='primary' icon={<ShareAltOutlined />} onClick={share}>
            Share a movie
          </Button>
          <Button
            type='dashed'
            icon={<LogoutOutlined />}
            danger
            onClick={onLogout}
          >
            Logout
          </Button>
        </Space>
      )}
    </Header>
  );
};

export default HeaderLayout;
