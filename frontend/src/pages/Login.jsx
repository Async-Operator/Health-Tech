import { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosClient.post("/login", { email, password });
      setUser({ role: res.data.role, userId: res.data.userId });
      toast.success("Login successful!");
      navigate(res.data.profileExists ? "/" : "/create-profile");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleLogin}>
          Login
        </Button>
        <Button fullWidth sx={{ marginTop: 1 }} onClick={() => navigate("/signup")}>
          New user? Signup
        </Button>
      </Paper>
    </Container>
  );
}
export default Login;