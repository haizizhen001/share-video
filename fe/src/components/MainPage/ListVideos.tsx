import React, { useEffect, useState } from 'react';
import { Card, List, Skeleton, Col, Row, notification, Typography } from 'antd';

import VideoService from '../../services/video.services';
import { Video } from '../../common/app-interface';

const ListVideos = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [list, setList] = useState<Video[]>([]);
  const [api] = notification.useNotification();

  useEffect(() => {
    VideoService.getVideos()
      .then((res: any) => {
        setLoadingPage(false);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
        api.error({
          message: 'Error',
          description: 'Loading error video!!',
        });
      });
    return () => {};
  }, []);

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
