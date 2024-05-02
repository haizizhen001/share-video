import { Layout, theme } from "antd";
import HeaderLayout from "./HeaderLayout";
import { useEffect } from "react";
import { io } from "socket.io-client";

const { REACT_APP_WEBSOCKET_URL } = process.env;


const { Content } = Layout;

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  
  useEffect(() => {
    const socket = io(REACT_APP_WEBSOCKET_URL || "");
  
    socket.on("connect", () => {
      console.log("Connected");
    });
  
    socket.on("message", (message: any) => {
      console.log("onMessage event received!");
      console.log(message);
    });
  
    // handle connection errors
    socket.on("connect_error", (err) => {
      console.log("Connection Error", err);
    });
  
    // handle connection timeout
    socket.on("connect_timeout", () => {
      console.log("Connection Timeout");
    });
  
    return () => {
      console.log("Unregistering Events!");
      socket.off("connect");
      socket.off("message");
      socket.off("connect_error");
      socket.off("connect_timeout");
    };
  }, []);

  return (
    <>
      <Layout>
        <HeaderLayout />
        <Layout>
          <Layout>
            <Content
              style={{
                padding: "10px",
                margin: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default BaseLayout;
