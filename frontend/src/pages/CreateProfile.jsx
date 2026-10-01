import { useState } from "react";
import { createProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import { Container, Paper, Typography, TextField, Button, Box, IconButton, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateProfile.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const LANGUAGES_LIST = ["English", "Hindi", "Odia", "Bengali", "Telugu", "Tamil"];

const getInitialData = (role) => {
  if (role === "patient") {
    return { name: "", age: "", phone: "", language: "English", location: { village: "", district: "", state: "" } };
  }
  if (role === "doctor") {
    return {
      name: "", specialty: "", hospital: "", experience: "", description: "", image: "",
      languages: [], qualifications: [], availability: [],
      location: { city: "", district: "", state: "" },
    };
  }
  if (role === "pharmacy") {
    return {
      name: "", image: "", contactPhone: "",
      location: { village: "", city: "", district: "", state: "" },
    };
  }
  return { name: "" };
};

function CreateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(() => getInitialData(user.role));
  const [saving, setSaving] = useState(false);

  const toNumberOrBlank = (v) => (v === "" || v === null || v === undefined ? v : Number(v));

  const handleCreate = async () => {
    if (!data.name || !data.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setSaving(true);
      const payload = { ...data, name: data.name.trim() };

      if (user.role === "patient") {
        payload.age = toNumberOrBlank(payload.age);
      }

      if (user.role === "doctor") {
        payload.experience = toNumberOrBlank(payload.experience);
        payload.qualifications = (payload.qualifications || [])
          .filter((q) => q.degree || q.institution || q.year)
          .map((q) => ({ ...q, year: toNumberOrBlank(q.year) }));
        payload.availability = (payload.availability || [])
          .map((a) => ({
            ...a,
            slots: (a.slots || []).map((s) => s.trim()).filter(Boolean),
          }))
          .filter((a) => a.day && a.slots.length > 0);
      }

      await createProfile(user.role, payload);
      toast.success("Profile created!");
      navigate("/profile");
    } catch (err) {
      toast.error("Could not create profile");
    } finally {
      setSaving(false);
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
  // ---------- Generic helpers ----------
  const setField = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const updateLocation = (field, value) =>
    setData((d) => ({ ...d, location: { ...(d.location || {}), [field]: value } }));

  // ---------- Qualifications ----------
  const addQualification = () =>
    setData((d) => ({
      ...d,
      qualifications: [...(d.qualifications || []), { degree: "", institution: "", year: "" }],
    }));

  const updateQualification = (i, field, value) =>
    setData((d) => ({
      ...d,
      qualifications: (d.qualifications || []).map((q, idx) =>
        idx === i ? { ...q, [field]: value } : q
      ),
    }));

  const removeQualification = (i) =>
    setData((d) => ({
      ...d,
      qualifications: (d.qualifications || []).filter((_, idx) => idx !== i),
    }));

  // ---------- Availability ----------
  const addAvailabilityDay = () =>
    setData((d) => ({
      ...d,
      availability: [...(d.availability || []), { day: "", slots: [""] }],
    }));

  const updateAvailabilityDay = (i, value) =>
    setData((d) => ({
      ...d,
      availability: (d.availability || []).map((a, idx) =>
        idx === i ? { ...a, day: value } : a
      ),
    }));

  const removeAvailabilityDay = (i) =>
    setData((d) => ({
      ...d,
      availability: (d.availability || []).filter((_, idx) => idx !== i),
    }));

  const addSlot = (dayIndex) =>
    setData((d) => ({
      ...d,
      availability: (d.availability || []).map((a, idx) =>
        idx === dayIndex ? { ...a, slots: [...(a.slots || []), ""] } : a
      ),
    }));

  const updateSlot = (dayIndex, slotIndex, value) =>
    setData((d) => ({
      ...d,
      availability: (d.availability || []).map((a, idx) =>
        idx === dayIndex
          ? { ...a, slots: (a.slots || []).map((s, si) => (si === slotIndex ? value : s)) }
          : a
      ),
    }));

  const removeSlot = (dayIndex, slotIndex) =>
    setData((d) => ({
      ...d,
      availability: (d.availability || []).map((a, idx) =>
        idx === dayIndex
          ? { ...a, slots: (a.slots || []).filter((_, si) => si !== slotIndex) }
          : a
      ),
    }));

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Create Profile</Typography>

        <TextField fullWidth required label="Name" margin="normal" value={data.name ?? ""}
          onChange={(e) => setField("name", e.target.value)} />

        {user.role === "patient" && (
          <>
            <TextField fullWidth label="Age" type="number" margin="normal" value={data.age ?? ""}
              onChange={(e) => setField("age", e.target.value)} />
            <TextField fullWidth label="Phone" margin="normal" value={data.phone ?? ""}
              onChange={(e) => setField("phone", e.target.value)} />
            <TextField fullWidth label="Village" margin="normal" value={data.location?.village ?? ""}
              onChange={(e) => updateLocation("village", e.target.value)} />
            <TextField fullWidth label="District" margin="normal" value={data.location?.district ?? ""}
              onChange={(e) => updateLocation("district", e.target.value)} />
            <TextField fullWidth label="State" margin="normal" value={data.location?.state ?? ""}
              onChange={(e) => updateLocation("state", e.target.value)} />
            <TextField select fullWidth label="Language" margin="normal" value={data.language || "English"}
              onChange={(e) => setField("language", e.target.value)}>
              {LANGUAGES_LIST.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField>
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
            <TextField fullWidth label="Specialty" margin="normal" value={data.specialty ?? ""}
              onChange={(e) => setField("specialty", e.target.value)} />
            <TextField fullWidth label="Hospital" margin="normal" value={data.hospital ?? ""}
              onChange={(e) => setField("hospital", e.target.value)} />
            <TextField fullWidth label="Experience (years)" type="number" margin="normal" value={data.experience ?? ""}
              onChange={(e) => setField("experience", e.target.value)} />
            <TextField fullWidth label="Description" multiline rows={3} margin="normal" value={data.description ?? ""}
              onChange={(e) => setField("description", e.target.value)} />

            <Typography sx={{ marginTop: 2 }}>Qualifications</Typography>
            {(data.qualifications || []).map((q, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                <TextField size="small" label="Degree" value={q.degree ?? ""}
                  onChange={(e) => updateQualification(i, "degree", e.target.value)} />
                <TextField size="small" label="Institution" value={q.institution ?? ""}
                  onChange={(e) => updateQualification(i, "institution", e.target.value)} />
                <TextField size="small" label="Year" type="number" value={q.year ?? ""} sx={{ width: 90 }}
                  onChange={(e) => updateQualification(i, "year", e.target.value)} />
                <IconButton color="error" onClick={() => removeQualification(i)}><DeleteIcon /></IconButton>
              </Box>
            ))}
            <Button sx={{ marginTop: 1 }} onClick={addQualification}>+ Add Qualification</Button>

            <TextField fullWidth label="Image URL" margin="normal" value={data.image ?? ""}
              onChange={(e) => setField("image", e.target.value)}
              helperText="Leave blank to use default photo" />

            <TextField select fullWidth label="Languages Spoken" margin="normal"
              SelectProps={{ multiple: true }}
              value={data.languages || []}
              onChange={(e) => setField("languages", e.target.value)}>
              {LANGUAGES_LIST.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField>

            <Typography sx={{ marginTop: 2 }}>Availability</Typography>
            {(data.availability || []).map((a, dayIndex) => (
              <Box key={dayIndex} sx={{ marginTop: 1, padding: 1, border: "1px solid #ddd", borderRadius: 1 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <TextField select size="small" label="Day" value={a.day || ""} sx={{ minWidth: 130 }}
                    onChange={(e) => updateAvailabilityDay(dayIndex, e.target.value)}>
                    {DAYS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                  </TextField>
                  <IconButton color="error" onClick={() => removeAvailabilityDay(dayIndex)}><DeleteIcon /></IconButton>
                </Box>
                {(a.slots || []).map((slot, slotIndex) => (
                  <Box key={slotIndex} sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                    <TextField size="small" label="Time (e.g. 10:00 AM)" value={slot ?? ""}
                      onChange={(e) => updateSlot(dayIndex, slotIndex, e.target.value)} />
                    <IconButton color="error" onClick={() => removeSlot(dayIndex, slotIndex)}><DeleteIcon /></IconButton>
                  </Box>
                ))}
                <Button size="small" sx={{ marginTop: 1 }} onClick={() => addSlot(dayIndex)}>+ Add Time Slot</Button>
              </Box>
            ))}
            <Button sx={{ marginTop: 1 }} onClick={addAvailabilityDay}>+ Add Day</Button>

            <TextField fullWidth label="City" margin="normal" value={data.location?.city ?? ""}
              onChange={(e) => updateLocation("city", e.target.value)} />
            <TextField fullWidth label="District" margin="normal" value={data.location?.district ?? ""}
              onChange={(e) => updateLocation("district", e.target.value)} />
            <TextField fullWidth label="State" margin="normal" value={data.location?.state ?? ""}
              onChange={(e) => updateLocation("state", e.target.value)} />
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

          <>
            <TextField fullWidth label="Image URL" margin="normal" value={data.image ?? ""}
              onChange={(e) => setField("image", e.target.value)} />
            <TextField fullWidth label="Contact Phone" margin="normal" value={data.contactPhone ?? ""}
              onChange={(e) => setField("contactPhone", e.target.value)} />
            <TextField fullWidth label="Village/Area" margin="normal" value={data.location?.village ?? ""}
              onChange={(e) => updateLocation("village", e.target.value)} />
            <TextField fullWidth label="City" margin="normal" value={data.location?.city ?? ""}
              onChange={(e) => updateLocation("city", e.target.value)} />
            <TextField fullWidth label="District" margin="normal" value={data.location?.district ?? ""}
              onChange={(e) => updateLocation("district", e.target.value)} />
            <TextField fullWidth label="State" margin="normal" value={data.location?.state ?? ""}
              onChange={(e) => updateLocation("state", e.target.value)} />
          </>
        )}

        <Button fullWidth variant="contained" sx={{ marginTop: 3 }} onClick={handleCreate} disabled={saving}>
          {saving ? "Creating..." : "Create Profile"}
        </Button>
      </Paper>
    </Container>
  );
}

export default CreateProfile;