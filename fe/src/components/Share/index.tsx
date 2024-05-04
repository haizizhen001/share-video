import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, notification } from 'antd';
import MainLayout from '../Layout/MainLayout';
import { LinkOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useVideo } from '../../functions/useVideo';
const { Title } = Typography;

const Share = () => {
  const [form] = Form.useForm();
  const [buttonShareLoading, setButtonShareLoading] = useState<boolean>(false);
  const { shareVideo } = useVideo();
  const validateShareVideo = (link: string) => {
    const regex = /https?:\/\/www\.youtube\.com\/watch\?v=[^&]+/;
    if (!regex.test(link)) {
      return 'Please enter a valid youtube url: https://www.youtube.com/watch?v=...';
    }
    return '';
  };
  const onShare = async (values: any) => {
    setButtonShareLoading(true);
    const valdiate = validateShareVideo(values.link);
    if (valdiate) {
      notification.error({
        message: 'Error',
        description: valdiate,
      });
      setButtonShareLoading(false);
      return;
    }
    try {
      const res = await shareVideo(values.link);
      notification.success({
        message: 'Success',
        description: 'Video shared successfully',
      });
      form.resetFields();
    } catch (err: any) {
      notification.error({
        message: 'Error',
        description: 'Sharing error video!! ' + err.message,
      });
    } finally {
      setButtonShareLoading(false);
    }
  };
  return (
    <MainLayout>
      <Card
      
        hoverable
        style={{
          width: '100%',
          backgroundColor: '#f4f4f4',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Title level={3}>Share a Youtube movie </Title>
        </div>
        <Form
          form={form}
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onShare}
        >
          <Form.Item
            name='link'
            label='Youtube URL'
            rules={[
              {
                required: true,
                message: 'youtube url is required!',
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<LinkOutlined className='site-form-item-icon' />}
              placeholder='Enter your youtube url'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              name='share_youtube'
              className='App-button-primary'
              style={{ marginTop: '30px' }}
              block
              loading={buttonShareLoading}
            >
              Share
            </Button>
            <Form.Item
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '15px',
              }}
            >
              <Link to={'/'}>
                Back to Home Page
              </Link>
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  );
};

export default Share;
