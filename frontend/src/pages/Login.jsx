import { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosClient.post("/login", { email, password });

      setUser({
        role: res.data.role,
        userId: res.data.userId
      });

      toast.success("Login successful!");
      navigate(res.data.profileExists ? "/" : "/create-profile");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <Container maxWidth="xs" className="login-page">
      <Paper className="login-card">

        <div className="login-header">
          <Typography variant="h5">
            Welcome Back
          </Typography>

          <p>
            Sign in to continue to your healthcare account.
          </p>
        </div>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-action-section">

        <Button
          fullWidth
          variant="contained"
          className="login-button auth-primary-btn"
          onClick={handleLogin}
        >
          Login
        </Button>

        <div className="auth-divider">NEW HERE?</div>

        <Button
          fullWidth
          className="signup-link-button auth-secondary-btn"
          onClick={() => navigate("/signup")}
        >
          New user? Signup
        </Button>

      </div>

      </Paper>
    </Container>
  );
}

export default Login;