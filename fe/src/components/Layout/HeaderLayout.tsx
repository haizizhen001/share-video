import { useNavigate } from "react-router-dom";
import { Button, Layout, Typography, Space } from "antd";
import { ShareAltOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";


const { Header } = Layout;
const { Title, Text } = Typography;



const HeaderLayout = () => {
  const navigate = useNavigate();
  const currentUser = '';

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const goToShare = () => {
    navigate("/share");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
       
      }}
    >
      <Space>
        <HomeOutlined style={{ fontSize: "36px"}}/>
        <Title
          className="App-color-white"
          level={1}
          style={{ marginTop: "5px" }}
        >
          Funny Movies
        </Title>
      </Space>
      <div>
        <Title
          className="App-color-white"
          level={4}
          style={{ marginTop: "15px" }}
        >
          {/* Remitano */}
        </Title>
      </div>
      <Space size={"small"}>
        <Text className="App-color-white">
          Welcome <b>  </b>
        </Text>
        <Button
          type="primary"
          icon={<ShareAltOutlined />}
          onClick={goToShare}
        >
          Share a movie
        </Button>
        <Button type="dashed" icon={<LogoutOutlined />} danger onClick={logout}>
          Logout
        </Button>
      </Space>
    </Header>
  );
};

export default HeaderLayout;
