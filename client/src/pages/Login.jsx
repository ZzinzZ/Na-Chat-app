import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoadingBox from "../components/LoadingBox";
import cloudinaryUpload from "../utils/uploads";
import { useState } from "react";
import axios from "axios";

const Login = () => {


  const {isLoading,loginInfo,updateLoginInfo, loginUser,loginError} = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row style={{
            height: '100vh',
            justifyContent: 'center',
            paddingTop:"5%",
            textAlign: 'center',
        }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo({...loginInfo,email: e.target.value})}/>
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo,password: e.target.value})}/>
              <Button type="submit" variant="primary" >{isLoading ?  (
                  <Stack direction="horizontal" gap={3} style={{
                    justifyContent: "center",
                    textAlign: "center",
                  }}>
                    <span>Signing in </span>
                    <LoadingBox />
                  </Stack>
                ): <span>Login</span>}</Button>
              {loginError?.error && (
                <Alert variant="danger">
                  <p>{loginError?.message}</p>
                </Alert>
              )}
              <Alert variant="info">
                <p>Dont have an account? <Link to="/register">Sign up now</Link></p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
  
};

export default Login;
