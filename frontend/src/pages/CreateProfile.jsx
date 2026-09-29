import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, MenuItem, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";
import { createProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateProfile.css";

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
    <Container maxWidth="xs" className="create-profile-page">
      <Paper className="create-profile-card">

        <div className="profile-form-header">
          <Typography variant="h5">Complete Your Profile</Typography>
          <p>Fill in your details so we can connect you to the right care.</p>
        </div>

        {user.role === "patient" && (
          <>
            <div className="profile-form-section">
              <Typography component="h2" className="profile-form-section-title">
                Personal Details
              </Typography>
              <p className="profile-form-section-sub">
                Basic information about you.
              </p>
              <div className="profile-form-grid">
                <TextField fullWidth label="Name" value={patientForm.name}
                  onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })} />
                <TextField select fullWidth label="Gender" value={patientForm.gender}
                  onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                <TextField fullWidth label="Age" type="number" value={patientForm.age}
                  onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })} />
                <TextField fullWidth label="Preferred Language" select value={patientForm.language}
                  onChange={(e) => setPatientForm({ ...patientForm, language: e.target.value })}>
                  {LANGUAGES.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </TextField>
              </div>
            </div>

            <div className="profile-form-section">
              <Typography component="h2" className="profile-form-section-title">
                Contact & Location
              </Typography>
              <p className="profile-form-section-sub">
                Used for appointment coordination and finding care near you.
              </p>
              <div className="profile-form-grid">
                <TextField fullWidth label="Phone" value={patientForm.phone}
                  onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })} />
                <TextField fullWidth label="Village"
                  value={patientForm.location.village}
                  onChange={(e) => setPatientForm({ ...patientForm, location: { ...patientForm.location, village: e.target.value } })} />
                <TextField fullWidth label="District"
                  value={patientForm.location.district}
                  onChange={(e) => setPatientForm({ ...patientForm, location: { ...patientForm.location, district: e.target.value } })} />
                <TextField fullWidth label="State"
                  value={patientForm.location.state}
                  onChange={(e) => setPatientForm({ ...patientForm, location: { ...patientForm.location, state: e.target.value } })} />
              </div>
            </div>
          </>
        )}

        {user.role === "doctor" && (
          <>
            <div className="profile-form-section">
              <Typography component="h2" className="profile-form-section-title">
                Professional Details
              </Typography>
              <div className="profile-form-grid">
                <TextField fullWidth label="Name" value={doctorForm.name}
                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} />
                <TextField fullWidth label="Specialty" value={doctorForm.specialty}
                  onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })} />
                <TextField fullWidth label="Hospital" value={doctorForm.hospital}
                  onChange={(e) => setDoctorForm({ ...doctorForm, hospital: e.target.value })} />
                <TextField fullWidth label="Experience (years)" type="number" value={doctorForm.experience}
                  onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })} />
              </div>
            </div>

            <div className="profile-form-section">
              <Typography component="h2" className="profile-form-section-title">
                Qualifications
              </Typography>
              <div>
                {doctorForm.qualifications.map((q, i) => (
                  <Box key={i} className="qualification-row">
                    <TextField size="small" label="Degree" value={q.degree}
                      onChange={(e) => updateQualification(i, "degree", e.target.value)} />
                    <TextField size="small" label="Institution" value={q.institution}
                      onChange={(e) => updateQualification(i, "institution", e.target.value)} />
                    <TextField size="small" label="Year" type="number" value={q.year}
                      onChange={(e) => updateQualification(i, "year", e.target.value)} />
                    <IconButton color="error" onClick={() => removeQualification(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button className="add-row-button" onClick={addQualification}>
                  + Add Qualification
                </Button>
              </div>
            </div>

            <div className="profile-form-section">
              <Typography component="h2" className="profile-form-section-title">
                About & Location
              </Typography>
              <div className="profile-form-grid">
                <TextField fullWidth label="About You" multiline rows={3} value={doctorForm.description}
                  onChange={(e) => setDoctorForm({ ...doctorForm, description: e.target.value })} />
                <TextField fullWidth label="City"
                  value={doctorForm.location.city}
                  onChange={(e) => setDoctorForm({ ...doctorForm, location: { ...doctorForm.location, city: e.target.value } })} />
                <TextField fullWidth label="District"
                  value={doctorForm.location.district}
                  onChange={(e) => setDoctorForm({ ...doctorForm, location: { ...doctorForm.location, district: e.target.value } })} />
                <TextField fullWidth label="State"
                  value={doctorForm.location.state}
                  onChange={(e) => setDoctorForm({ ...doctorForm, location: { ...doctorForm.location, state: e.target.value } })} />
              </div>
            </div>
          </>
        )}

        {user.role === "pharmacy" && (
          <div className="profile-form-section">
            <Typography component="h2" className="profile-form-section-title">
              Pharmacy Details
            </Typography>
            <div className="profile-form-grid">
              <TextField fullWidth label="Pharmacy Name" value={pharmacyForm.name}
                onChange={(e) => setPharmacyForm({ ...pharmacyForm, name: e.target.value })} />
              <TextField fullWidth label="Contact Phone" value={pharmacyForm.contactPhone}
                onChange={(e) => setPharmacyForm({ ...pharmacyForm, contactPhone: e.target.value })} />
              <TextField fullWidth label="Image URL" value={pharmacyForm.image}
                onChange={(e) => setPharmacyForm({ ...pharmacyForm, image: e.target.value })} />
              <TextField fullWidth label="Village/Area"
                value={pharmacyForm.location.village}
                onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, village: e.target.value } })} />
              <TextField fullWidth label="City"
                value={pharmacyForm.location.city}
                onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, city: e.target.value } })} />
              <TextField fullWidth label="District"
                value={pharmacyForm.location.district}
                onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, district: e.target.value } })} />
              <TextField fullWidth label="State"
                value={pharmacyForm.location.state}
                onChange={(e) => setPharmacyForm({ ...pharmacyForm, location: { ...pharmacyForm.location, state: e.target.value } })} />
            </div>
          </div>
        )}

        <div className="profile-form-footer">
          <Button
            variant="outlined"
            className={`detect-location-btn ${coords ? "done" : ""}`}
            onClick={detectLocation}
          >
            {coords ? "Location Detected ✓" : "Detect My Location (GPS)"}
          </Button>
          <Button
            variant="contained"
            className="save-profile-btn"
            onClick={handleCreate}
          >
            Save Profile
          </Button>
        </div>

      </Paper>
    </Container>
  );
}
export default CreateProfile;