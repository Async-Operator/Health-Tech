import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "./Signup.css";

function Signup() {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient"
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axiosClient.post("/signup", form);

      setUser({
        role: res.data.role,
        userId: res.data.userId
      });

      toast.success("Signup successful!");
      navigate("/create-profile");
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  return (
    <Container maxWidth="xs" className="signup-page">
      <Paper className="signup-card">

        <div className="signup-header">
          <Typography variant="h5">
            Create Account
          </Typography>

          <p>
            Create your account to access healthcare services.
          </p>
        </div>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <TextField
          select
          fullWidth
          label="Role"
          margin="normal"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
        >
          <MenuItem value="patient">Patient</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="pharmacy">Pharmacy</MenuItem>
        </TextField>

        <div className="auth-action-section">

        <Button
          fullWidth
          variant="contained"
          className="signup-button auth-primary-btn"
          onClick={handleSignup}
        >
          Create Account
        </Button>

        <div className="auth-divider">ALREADY A MEMBER?</div>

        <Button
          fullWidth
          className="login-link-button auth-secondary-btn"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>

      </div>

      </Paper>
    </Container>
  );
}

export default Signup;