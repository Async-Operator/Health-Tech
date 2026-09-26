import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", role: "patient" });
  const navigate = useNavigate();

  const handleSignup = async () => {
  try {
    const res = await axiosClient.post("/signup", form);
    setUser({ role: res.data.role, userId: res.data.userId });
    toast.success("Signup successful!");
    navigate("/create-profile");   
  } catch (err) {
    toast.error("Signup failed");
  }
};

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>Signup</Typography>
        <TextField fullWidth label="Email" margin="normal" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <TextField select fullWidth label="Role" margin="normal" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <MenuItem value="patient">Patient</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="pharmacy">Pharmacy</MenuItem>
        </TextField>
        <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleSignup}>
          Signup
        </Button>
      </Paper>
    </Container>
  );
}
export default Signup;