import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import { Container, Paper, Typography, Chip, Box, Divider, Avatar } from "@mui/material";

function ProfileView() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfile(user.role).then(res => setData(res.data)).catch(() => setData(null));
  }, [user.role]);

  if (!data) return <p>Loading...</p>;

  const loc = data.location || {};

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper sx={{ padding: 3 }}>
        {user.role === "doctor" && (
          <Avatar src={data.image} sx={{ width: 100, height: 100, marginBottom: 2 }} />
        )}
        {user.role === "pharmacy" && data.image && (
          <Box component="img" src={data.image} alt={data.name}
            sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 2, marginBottom: 2 }} />
        )}

        <Typography variant="h5" gutterBottom>{data.name}</Typography>
        <Chip label={user.role.toUpperCase()} color="primary" sx={{ marginBottom: 2 }} />
        <Divider sx={{ marginBottom: 2 }} />

        {user.role === "patient" && (
          <Box>
            <Typography><b>Age:</b> {data.age}</Typography>
            <Typography><b>Gender:</b> {data.gender}</Typography>
            <Typography><b>Phone:</b> {data.phone}</Typography>
            <Typography sx={{ marginTop: 1 }}><b>Location:</b> {loc.village}, {loc.district}, {loc.state}</Typography>
            <Typography><b>Language:</b> {data.language}</Typography>
            {data.chronicDiseases?.length > 0 && (
              <Typography sx={{ marginTop: 1 }}><b>Chronic Diseases:</b> {data.chronicDiseases.join(", ")}</Typography>
            )}
            {data.allergies?.length > 0 && (
              <Typography><b>Allergies:</b> {data.allergies.join(", ")}</Typography>
            )}
          </Box>
        )}

        {user.role === "doctor" && (
          <Box>
            <Typography><b>Specialty:</b> {data.specialty}</Typography>
            <Typography><b>Hospital:</b> {data.hospital}</Typography>
            <Typography><b>Experience:</b> {data.experience} years</Typography>
            <Typography sx={{ marginTop: 1 }}><b>About:</b> {data.description}</Typography>

            {data.qualifications?.length > 0 && (
              <Box sx={{ marginTop: 1 }}>
                <Typography><b>Qualifications:</b></Typography>
                {data.qualifications.map((q, i) => (
                  <Typography key={i}>- {q.degree}, {q.institution} ({q.year})</Typography>
                ))}
              </Box>
            )}

            <Typography sx={{ marginTop: 1 }}><b>Location:</b> {loc.city}, {loc.district}, {loc.state}</Typography>
          </Box>
        )}

        {user.role === "pharmacy" && (
          <Box>
            <Typography><b>Contact:</b> {data.contactPhone}</Typography>
            <Typography sx={{ marginTop: 1 }}><b>Location:</b> {loc.village}, {loc.city}, {loc.district}, {loc.state}</Typography>
            <Typography sx={{ marginTop: 1 }}><b>Medicine Stock:</b></Typography>
            {(data.medicineStock || []).length === 0 && <Typography color="text.secondary">No stock added yet</Typography>}
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