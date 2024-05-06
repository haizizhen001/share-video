import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAuth } from '../../functions/useAuth';
const { Title } = Typography;

const Register = () => {
  const [loadingBtn, setBtnLoading] = useState<boolean>(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const onRegister = async (values: any) => {
    setBtnLoading(true);
    try {
      const user = await register(
        values.userName,
        values.password,
        values.passwordVerify,
        values.name
      );
      if (user) {
        setRegisterSuccess(true);
      }
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    } finally {
      setBtnLoading(false);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {!registerSuccess && (
        <Card hoverable style={{ width: 500, backgroundColor: '#f4f4f4' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Title level={3}>Register User</Title>
          </div>

          <Form
            name='normal_login'
            className='register-form'
            initialValues={{
              remember: true,
            }}
            onFinish={onRegister}
          >
            <Form.Item
              name='name'
              rules={[{ required: true, message: 'Name is not empty!' }]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Enter your Full name'
              />
            </Form.Item>
            <Form.Item
              name='userName'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Enter you email'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                id='password'
                placeholder='Enter your Password'
              />
            </Form.Item>
            <Form.Item
              name='passwordVerify'
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passsword is not match!'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                id='passwordVerify'
                placeholder='Confirm Password'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                name='register'
                htmlType='submit'
                className='App-button-primary'
                block
                loading={loadingBtn}
              >
                Register
              </Button>
            </Form.Item>
            <Form.Item
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              Already have an account? <Link to={'/'}>Back to Home</Link>
            </Form.Item>
          </Form>
        </Card>
      )}
      {registerSuccess && (
        <Card hoverable style={{ width: 500, backgroundColor: '#f4f4f4' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              color: 'green',
            }}
          >
            <Title level={3}><CheckCircleOutlined /> Register success!</Title>
          </div>
          <Button
            type='primary'
            style={{ width: '100%', margin: '10px 0'}}
            onClick={() => setRegisterSuccess(false)}
          >
           Register new user
          </Button>
          <Button
            type='default'
            style={{ width: '100%', margin: '10px 0'}}
            onClick = {() => navigate('/')}
          >
            Back to Home
          </Button>            
        </Card>
      )}
    </div>
  );
};

export default Register;
