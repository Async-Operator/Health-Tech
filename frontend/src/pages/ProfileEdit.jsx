import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import { Container, Paper, Typography, TextField, Button, Box, IconButton, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LANGUAGES = ["English", "Hindi", "Odia", "Bengali", "Telugu", "Tamil"];

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

  const updateLocation = (field, value) => {
    setData({ ...data, location: { ...data.location, [field]: value } });
  };

  const addQualification = () => {
    setData({ ...data, qualifications: [...(data.qualifications || []), { degree: "", institution: "", year: "" }] });
  };
  const updateQualification = (i, field, value) => {
    const updated = [...data.qualifications];
    updated[i][field] = value;
    setData({ ...data, qualifications: updated });
  };
  const removeQualification = (i) => {
    setData({ ...data, qualifications: data.qualifications.filter((_, idx) => idx !== i) });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Edit Profile</Typography>

        <TextField fullWidth label="Name" margin="normal" value={data.name || ""}
          onChange={(e) => setData({ ...data, name: e.target.value })} />

        {user.role === "patient" && (
          <>
            <TextField fullWidth label="Age" type="number" margin="normal" value={data.age || ""}
              onChange={(e) => setData({ ...data, age: e.target.value })} />
            <TextField fullWidth label="Phone" margin="normal" value={data.phone || ""}
              onChange={(e) => setData({ ...data, phone: e.target.value })} />
            <TextField fullWidth label="Village" margin="normal" value={data.location?.village || ""}
              onChange={(e) => updateLocation("village", e.target.value)} />
            <TextField fullWidth label="District" margin="normal" value={data.location?.district || ""}
              onChange={(e) => updateLocation("district", e.target.value)} />
            <TextField fullWidth label="State" margin="normal" value={data.location?.state || ""}
              onChange={(e) => updateLocation("state", e.target.value)} />
            <TextField select fullWidth label="Language" margin="normal" value={data.language || "English"}
              onChange={(e) => setData({ ...data, language: e.target.value })}>
              {LANGUAGES.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField>
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

            <Typography sx={{ marginTop: 2 }}>Qualifications</Typography>
            {(data.qualifications || []).map((q, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                <TextField size="small" label="Degree" value={q.degree}
                  onChange={(e) => updateQualification(i, "degree", e.target.value)} />
                <TextField size="small" label="Institution" value={q.institution}
                  onChange={(e) => updateQualification(i, "institution", e.target.value)} />
                <TextField size="small" label="Year" type="number" value={q.year} sx={{ width: 90 }}
                  onChange={(e) => updateQualification(i, "year", e.target.value)} />
                <IconButton color="error" onClick={() => removeQualification(i)}><DeleteIcon /></IconButton>
              </Box>
            ))}
            <Button sx={{ marginTop: 1 }} onClick={addQualification}>+ Add Qualification</Button>

            <TextField fullWidth label="City" margin="normal" value={data.location?.city || ""}
              onChange={(e) => updateLocation("city", e.target.value)} />
            <TextField fullWidth label="District" margin="normal" value={data.location?.district || ""}
              onChange={(e) => updateLocation("district", e.target.value)} />
            <TextField fullWidth label="State" margin="normal" value={data.location?.state || ""}
              onChange={(e) => updateLocation("state", e.target.value)} />
          </>
        )}

        {user.role === "pharmacy" && (
          <>
            <TextField fullWidth label="Image URL" margin="normal" value={data.image || ""}
              onChange={(e) => setData({ ...data, image: e.target.value })} />
            <TextField fullWidth label="Contact Phone" margin="normal" value={data.contactPhone || ""}
              onChange={(e) => setData({ ...data, contactPhone: e.target.value })} />
            <TextField fullWidth label="Village/Area" margin="normal" value={data.location?.village || ""}
              onChange={(e) => updateLocation("village", e.target.value)} />
            <TextField fullWidth label="City" margin="normal" value={data.location?.city || ""}
              onChange={(e) => updateLocation("city", e.target.value)} />
            <TextField fullWidth label="District" margin="normal" value={data.location?.district || ""}
              onChange={(e) => updateLocation("district", e.target.value)} />
            <TextField fullWidth label="State" margin="normal" value={data.location?.state || ""}
              onChange={(e) => updateLocation("state", e.target.value)} />
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