import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, MenuItem, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";
import { createProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LANGUAGES = ["English", "Hindi", "Odia", "Bengali", "Telugu", "Tamil"];

function CreateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);

  const [patientForm, setPatientForm] = useState({
    name: "", age: "", gender: "", phone: "",
    location: { village: "", district: "", state: "" },
    language: "English"
  });

  const [doctorForm, setDoctorForm] = useState({
    name: "", specialty: "", hospital: "", experience: "", description: "",
    qualifications: [{ degree: "", institution: "", year: "" }],
    location: { city: "", district: "", state: "" }
  });

  const [pharmacyForm, setPharmacyForm] = useState({
    name: "", image: "", contactPhone: "",
    location: { village: "", city: "", district: "", state: "" }
  });

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported on this device");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([pos.coords.longitude, pos.coords.latitude]);
        toast.success("Location detected!");
      },
      () => toast.error("Could not get location. Allow permission and try again.")
    );
  };

  const addQualification = () => {
    setDoctorForm({
      ...doctorForm,
      qualifications: [...doctorForm.qualifications, { degree: "", institution: "", year: "" }]
    });
  };
  const updateQualification = (i, field, value) => {
    const updated = [...doctorForm.qualifications];
    updated[i][field] = value;
    setDoctorForm({ ...doctorForm, qualifications: updated });
  };
  const removeQualification = (i) => {
    setDoctorForm({ ...doctorForm, qualifications: doctorForm.qualifications.filter((_, idx) => idx !== i) });
  };

  const handleCreate = async () => {
    if (!coords) {
      toast.error("Please detect your location first");
      return;
    }
    try {
      let dataToSend;
      if (user.role === "patient") {
        dataToSend = { ...patientForm, location: { ...patientForm.location, coordinates: { type: "Point", coordinates: coords } } };
      }
      if (user.role === "doctor") {
        dataToSend = { ...doctorForm, location: { ...doctorForm.location, coordinates: { type: "Point", coordinates: coords } } };
      }
      if (user.role === "pharmacy") {
        dataToSend = { ...pharmacyForm, location: { ...pharmacyForm.location, coordinates: { type: "Point", coordinates: coords } } };
      }

      await createProfile(user.role, dataToSend);
      toast.success("Profile created!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create profile");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8, marginBottom: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>Complete Your Profile</Typography>

        {user.role === "patient" && (
          <>
            <TextField fullWidth label="Name" margin="normal" value={patientForm.name}
              onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })} />
            <TextField fullWidth label="Age" type="number" margin="normal" value={patientForm.age}
              onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })} />
            <TextField select fullWidth label="Gender" margin="normal" value={patientForm.gender}
              onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField fullWidth label="Phone" margin="normal" value={patientForm.phone}
              onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })} />
            <TextField fullWidth label="Village" margin="normal" value={patientForm.location.village}
              onChange={(e) => setPatientForm({ ...patientForm, location: { ...patientForm.location, village: e.target.value } })} />
            <TextField fullWidth label="District" margin="normal" value={patientForm.location.district}
              onChange={(e) => setPatientForm({ ...patientForm, location: { ...patientForm.location, district: e.target.value } })} />
            <TextField fullWidth label="State" margin="normal" value={patientForm.location.state}
              onChange={(e) => setPatientForm({ ...patientForm, location: { ...patientForm.location, state: e.target.value } })} />
            <TextField select fullWidth label="Preferred Language" margin="normal" value={patientForm.language}
              onChange={(e) => setPatientForm({ ...patientForm, language: e.target.value })}>
              {LANGUAGES.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField>
          </>
        )}

        {user.role === "doctor" && (
          <>
            <TextField fullWidth label="Name" margin="normal" value={doctorForm.name}
              onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} />
            <TextField fullWidth label="Specialty" margin="normal" value={doctorForm.specialty}
              onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })} />
            <TextField fullWidth label="Hospital" margin="normal" value={doctorForm.hospital}
              onChange={(e) => setDoctorForm({ ...doctorForm, hospital: e.target.value })} />
            <TextField fullWidth label="Experience (years)" type="number" margin="normal" value={doctorForm.experience}
              onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })} />
            <TextField fullWidth label="About You" margin="normal" multiline rows={3} value={doctorForm.description}
              onChange={(e) => setDoctorForm({ ...doctorForm, description: e.target.value })} />

            <Typography sx={{ marginTop: 2 }}>Qualifications</Typography>
            {doctorForm.qualifications.map((q, i) => (
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

            <TextField fullWidth label="City" margin="normal" value={doctorForm.location.city}
              onChange={(e) => setDoctorForm({ ...doctorForm, location: { ...doctorForm.location, city: e.target.value } })} />
            <TextField fullWidth label="District" margin="normal" value={doctorForm.location.district}
              onChange={(e) => setDoctorForm({ ...doctorForm, location: { ...doctorForm.location, district: e.target.value } })} />
            <TextField fullWidth label="State" margin="normal" value={doctorForm.location.state}
              onChange={(e) => setDoctorForm({ ...doctorForm, location: { ...doctorForm.location, state: e.target.value } })} />
          </>
        )}

        {user.role === "pharmacy" && (
          <>
            <TextField fullWidth label="Pharmacy Name" margin="normal" value={pharmacyForm.name}
              onChange={(e) => setPharmacyForm({ ...pharmacyForm, name: e.target.value })} />
            <TextField fullWidth label="Image URL" margin="normal" value={pharmacyForm.image}
              onChange={(e) => setPharmacyForm({ ...pharmacyForm, image: e.target.value })} />
            <TextField fullWidth label="Contact Phone" margin="normal" value={pharmacyForm.contactPhone}
              onChange={(e) => setPharmacyForm({ ...pharmacyForm, contactPhone: e.target.value })} />
            <TextField fullWidth label="Village/Area" margin="normal" value={pharmacyForm.location.village}
              onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, village: e.target.value } })} />
            <TextField fullWidth label="City" margin="normal" value={pharmacyForm.location.city}
              onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, city: e.target.value } })} />
            <TextField fullWidth label="District" margin="normal" value={pharmacyForm.location.district}
              onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, district: e.target.value } })} />
            <TextField fullWidth label="State" margin="normal" value={pharmacyForm.location.state}
              onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, state: e.target.value } })} />
          </>
        )}

        <Button fullWidth variant="outlined" sx={{ marginTop: 2 }} onClick={detectLocation}>
          {coords ? "Location Detected ✓" : "Detect My Location (GPS)"}
        </Button>

        <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleCreate}>
          Save Profile
        </Button>
      </Paper>
    </Container>
  );
}
export default CreateProfile;