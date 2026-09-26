import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import { Container, Paper, Typography, TextField, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileEdit() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(user.role).then(res => setData(res.data)).catch(() => setData(null));
  }, [user.role]);

  const handleSave = async () => {
    try {
      await updateProfile(user.role, data);
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const addMedicine = () => {
    setData({ ...data, medicineStock: [...(data.medicineStock || []), { medicineName: "", quantity: 0 }] });
  };
  const updateMedicine = (i, field, value) => {
    const updated = [...data.medicineStock];
    updated[i][field] = value;
    setData({ ...data, medicineStock: updated });
  };
  const removeMedicine = (i) => {
    setData({ ...data, medicineStock: data.medicineStock.filter((_, idx) => idx !== i) });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Edit Profile</Typography>

        <TextField fullWidth label="Name" margin="normal" value={data.name || ""}
          onChange={(e) => setData({ ...data, name: e.target.value })} />

        {user.role === "patient" && (
          <>
            <TextField fullWidth label="Age" type="number" margin="normal" value={data.age || ""}
              onChange={(e) => setData({ ...data, age: e.target.value })} />
            <TextField fullWidth label="Gender" margin="normal" value={data.gender || ""}
              onChange={(e) => setData({ ...data, gender: e.target.value })} />
            <TextField fullWidth label="Village" margin="normal" value={data.village || ""}
              onChange={(e) => setData({ ...data, village: e.target.value })} />
            <TextField fullWidth label="Language" margin="normal" value={data.language || ""}
              onChange={(e) => setData({ ...data, language: e.target.value })} />
          </>
        )}

        {user.role === "doctor" && (
          <>
            <TextField fullWidth label="Specialty" margin="normal" value={data.specialty || ""}
              onChange={(e) => setData({ ...data, specialty: e.target.value })} />
            <TextField fullWidth label="Hospital" margin="normal" value={data.hospital || ""}
              onChange={(e) => setData({ ...data, hospital: e.target.value })} />
            <TextField fullWidth label="Experience" type="number" margin="normal" value={data.experience || ""}
              onChange={(e) => setData({ ...data, experience: e.target.value })} />
            <TextField fullWidth label="Description" multiline rows={3} margin="normal" value={data.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })} />
          </>
        )}

        {user.role === "pharmacy" && (
          <>
            <TextField fullWidth label="Location" margin="normal" value={data.location || ""}
              onChange={(e) => setData({ ...data, location: e.target.value })} />
          </>
        )}

        <Button fullWidth variant="contained" sx={{ marginTop: 3 }} onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
}
export default ProfileEdit;