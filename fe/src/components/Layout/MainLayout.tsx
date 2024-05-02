import { Layout, theme } from 'antd';
import HeaderLayout from './HeaderLayout';
import { UserProvider } from '../Context/UserContext';

const { Content } = Layout;
const BaseLayout = ({ children }: { children: React.ReactNode }) => {
 

  return (
    <>
      <Layout>
        <UserProvider>
          <HeaderLayout/>
          <Layout>
            <Content
              style={{
                padding: '10px',
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {children}
            </Content>
          </Layout>
        </UserProvider>
      </Layout>
    </>
  );
};

export default BaseLayout;
