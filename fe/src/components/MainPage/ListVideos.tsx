import { useEffect, useState } from 'react';
import { Card, List, Col, Row, notification, Button } from 'antd';

import { Video } from '../../common/app-interface';
import { useVideo } from '../../functions/useVideo';
import { useContextUser } from '../Common/UserContext';
import { Socket, io } from 'socket.io-client';
const { REACT_APP_WEBSOCKET_URL } = process.env;

const ListVideos = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [list, setList] = useState<Video[]>([]);
  const { getVideos } = useVideo();
  const { user } = useContextUser();
  const [socketConnected, setSocketConnected] = useState<Socket | null>(null);
  const getVideoList = async () => {
    try {
      setLoadingPage(true);
      const videos = await getVideos();
      setList(videos);
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    } finally {
      setLoadingPage(false);
    }
  };
  const openNotificationA = (title: string, email: string) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type='primary' size='small' onClick={() => getVideoList()}>
        Reload Video List
      </Button>
    );
    notification.open({
      message: 'Notification New Video ',
      description: `New video: '${title}' shared by ${email}, please reload the video list to see the new video!`,
      btn,
      key,
    });
  };
  const listenSocket = (socket: Socket) => {
    socket.on('connect', () => {
      console.log('Connected');
    });
    socket.on('message', (message: any) => {
      console.log('onMessage event received!');
      const video = JSON.parse(message);
      openNotificationA(video.data.title, video.data.email);
    });

    // handle connection errors
    socket.on('connect_error', (err) => {
      console.log('Connection Error', err);
      setSocketConnected(null);
    });

    // handle connection timeout
    socket.on('connect_timeout', () => {
      console.log('Connection Timeout');
      setSocketConnected(null);
    });
  };
  const disconnectSocket = (socket: Socket) => {
    socket.off('connect');
    socket.off('message');
    socket.off('connect_error');
    socket.off('connect_timeout');
  };
  useEffect(() => {
    getVideoList();
  }, []);

  useEffect(() => {
    if (user?.userName && !socketConnected) {
      const socket = io(REACT_APP_WEBSOCKET_URL || '');
      setSocketConnected(socket);
      listenSocket(socket);
    } else if (!user?.userName && socketConnected) {
      disconnectSocket(socketConnected);
    }
    return () => {
      if(socketConnected) disconnectSocket(socketConnected);
    };
  }, [user]);

  return (
    <List
      style={{ width: '100%' }}
      className='list-videos'
      loading={loadingPage}
      itemLayout='vertical'
      size='large'
      split={false}
      dataSource={list}
      renderItem={(item: Video) => (
        <List.Item key={item._id}>
          <Card hoverable>
            <Row gutter={10}>
              <Col span={8}>
                <iframe
                  width='100%'
                  height='375'
                  src={item.link || ''}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                ></iframe>
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={24}>
                    <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                    <br />
                    <span style={{ fontWeight: 'bold' }}>
                      Share by: {item.email}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span style={{ fontWeight: 'bold' }}>Description:</span>
                    <br />
                    <span>{item.content}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListVideos;
