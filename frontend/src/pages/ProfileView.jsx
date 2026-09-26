import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import { Container, Paper, Typography, Chip, Box, Divider } from "@mui/material";

function ProfileView() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfile(user.role).then(res => setData(res.data)).catch(() => setData(null));
  }, [user.role]);

  if (!data) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>My Profile</Typography>
        <Chip label={user.role.toUpperCase()} color="primary" sx={{ marginBottom: 2 }} />
        <Divider sx={{ marginBottom: 2 }} />

        <Typography><b>Name:</b> {data.name}</Typography>

        {user.role === "patient" && (
          <Box sx={{ marginTop: 1 }}>
            <Typography><b>Age:</b> {data.age}</Typography>
            <Typography><b>Gender:</b> {data.gender}</Typography>
            <Typography><b>Village:</b> {data.village}</Typography>
            <Typography><b>Language:</b> {data.language}</Typography>
          </Box>
        )}

        {user.role === "doctor" && (
          <Box sx={{ marginTop: 1 }}>
            <Typography><b>Specialty:</b> {data.specialty}</Typography>
            <Typography><b>Hospital:</b> {data.hospital}</Typography>
            <Typography><b>Experience:</b> {data.experience} years</Typography>
            <Typography><b>About:</b> {data.description}</Typography>
          </Box>
        )}

        {user.role === "pharmacy" && (
          <Box sx={{ marginTop: 1 }}>
            <Typography><b>Location:</b> {data.location}</Typography>
            <Typography sx={{ marginTop: 1 }}><b>Medicine Stock:</b></Typography>
            {(data.medicineStock || []).map((m, i) => (
              <Typography key={i}>- {m.medicineName} ({m.quantity})</Typography>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
}
export default ProfileView;