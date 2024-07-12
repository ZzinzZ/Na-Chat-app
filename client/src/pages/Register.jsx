import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoadingBox from "../components/LoadingBox";

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    setRegisterError,
    isLoading,
  } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(confirmPassword !== registerInfo.password) {
      setRegisterError({ error: true, message: "The re-entered password does not match" })
      return;
    }
    registerUser();
  };
  const handleConfirm = (e) => {
    setConfirmPassword(e.target.value.toString());
    console.log(confirmPassword);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "5%",
            textAlign: "center",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Form.Control type="password" placeholder="Confirm password" onChange={handleConfirm}/>
              <Button
                type="submit"
                variant="primary"
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {isLoading ?  (
                  <Stack direction="horizontal" gap={3} style={{
                    justifyContent: "center",
                    textAlign: "center",
                  }}>
                    <span>Creating your account </span>
                    <LoadingBox />
                  </Stack>
                ): <span>Register</span>}
              </Button>
              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError?.message}</p>
                </Alert>
              )}
              <Alert variant="info">
                Already have an account? <Link to="/login">Login</Link>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
