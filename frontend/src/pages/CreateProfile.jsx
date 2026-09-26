import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, MenuItem } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { createProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // separate form state per role, only relevant one gets used
  const [patientForm, setPatientForm] = useState({ name: "", age: "", gender: "", village: "", language: "" });
  const [doctorForm, setDoctorForm] = useState({ name: "", specialty: "", hospital: "", experience: "", description: "" });
  const [pharmacyForm, setPharmacyForm] = useState({ name: "", location: "" });

  const handleCreate = async () => {
  try {
    let dataToSend;
    if (user.role === "patient") dataToSend = patientForm;
    if (user.role === "doctor") dataToSend = doctorForm;
    if (user.role === "pharmacy") dataToSend = pharmacyForm;

    await createProfile(user.role, dataToSend);
    toast.success("Profile created!");
    navigate("/");   // ✅ changed from "/dashboard" to "/"
  } catch (err) {
    toast.error("Failed to create profile");
  }
};

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>Complete Your Profile</Typography>

        {user.role === "patient" && (
          <>
            <TextField fullWidth label="Name" margin="normal" 
              value={patientForm.name} onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })} />
            <TextField fullWidth label="Age" type="number" margin="normal" 
              value={patientForm.age} onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })} />
            <TextField select fullWidth label="Gender" margin="normal" 
              value={patientForm.gender} onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField fullWidth label="Village" margin="normal" 
              value={patientForm.village} onChange={(e) => setPatientForm({ ...patientForm, village: e.target.value })} />
            <TextField fullWidth label="Preferred Language" margin="normal" 
              value={patientForm.language} onChange={(e) => setPatientForm({ ...patientForm, language: e.target.value })} />
          </>
        )}

        {user.role === "doctor" && (
          <>
            <TextField fullWidth label="Name" margin="normal" 
              value={doctorForm.name} onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} />
            <TextField fullWidth label="Specialty" margin="normal" 
              value={doctorForm.specialty} onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })} />
            <TextField fullWidth label="Hospital" margin="normal" 
              value={doctorForm.hospital} onChange={(e) => setDoctorForm({ ...doctorForm, hospital: e.target.value })} />
            <TextField fullWidth label="Experience (years)" type="number" margin="normal" 
              value={doctorForm.experience} onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })} />
            <TextField fullWidth label="About You" margin="normal" multiline rows={3}
              value={doctorForm.description} onChange={(e) => setDoctorForm({ ...doctorForm, description: e.target.value })} />
          </>
        )}

        {user.role === "pharmacy" && (
          <>
            <TextField fullWidth label="Pharmacy Name" margin="normal" 
              value={pharmacyForm.name} onChange={(e) => setPharmacyForm({ ...pharmacyForm, name: e.target.value })} />
            <TextField fullWidth label="Location" margin="normal" 
              value={pharmacyForm.location} onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: e.target.value })} />
          </>
        )}

        <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleCreate}>
          Save Profile
        </Button>
      </Paper>
    </Container>
  );
}
export default CreateProfile;