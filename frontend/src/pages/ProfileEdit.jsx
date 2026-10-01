import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProfileEdit.css";

const LANGUAGES = [
  "English",
  "Hindi",
  "Odia",
  "Bengali",
  "Telugu",
  "Tamil",
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const LANGUAGES_LIST = ["English", "Hindi", "Odia", "Bengali", "Telugu", "Tamil"];

function ProfileEdit() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(user.role)
      .then((res) => setData(res.data))
      .catch(() => setData(null));
      .catch(() => setError(true));
  }, [user.role]);

  const toNumberOrBlank = (v) => (v === "" || v === null || v === undefined ? v : Number(v));

  const handleSave = async () => {
    try {
      const payload = { ...data };

      if (user.role === "patient") {
        payload.age = toNumberOrBlank(payload.age);
      }

      if (user.role === "doctor") {
        payload.experience = toNumberOrBlank(payload.experience);
        payload.qualifications = (payload.qualifications || []).map((q) => ({
          ...q,
          year: toNumberOrBlank(q.year),
        }));
        payload.availability = (payload.availability || [])
          .map((a) => ({
            ...a,
            slots: (a.slots || []).map((s) => s.trim()).filter(Boolean),
          }))
          .filter((a) => a.day && a.slots.length > 0);
      }

      await updateProfile(user.role, payload);
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const updateLocation = (field, value) => {
    setData({
      ...data,
      location: {
        ...data.location,
        [field]: value,
      },
    });
  };

  const addQualification = () => {
    setData({
      ...data,
      qualifications: [
        ...(data.qualifications || []),
        {
          degree: "",
          institution: "",
          year: "",
        },
      ],
    });
  };

  const updateQualification = (i, field, value) => {
    const updated = [...data.qualifications];
    updated[i][field] = value;

    setData({
      ...data,
      qualifications: updated,
    });
  };

  const removeQualification = (i) => {
    setData({
      ...data,
      qualifications: data.qualifications.filter(
        (_, idx) => idx !== i
      ),
    });
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="profile-edit-page">
      <div className="profile-edit-container">

        <Paper className="profile-edit-card" elevation={0}>

          <Typography
            component="h1"
            className="profile-edit-title"
          >
            Edit Profile
          </Typography>

          <div className="profile-edit-form">

            {/* NAME */}
            <div className="profile-edit-field full-width">
              <TextField
                fullWidth
                label="Name"
                value={data.name || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* PATIENT */}
            {user.role === "patient" && (
              <>
                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={data.age || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        age: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Phone"
                    value={data.phone || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Village"
                    value={data.location?.village || ""}
                    onChange={(e) =>
                      updateLocation(
                        "village",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="District"
                    value={data.location?.district || ""}
                    onChange={(e) =>
                      updateLocation(
                        "district",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="State"
                    value={data.location?.state || ""}
                    onChange={(e) =>
                      updateLocation(
                        "state",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    select
                    fullWidth
                    label="Language"
                    value={data.language || "English"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        language: e.target.value,
                      })
                    }
                  >
                    {LANGUAGES.map((language) => (
                      <MenuItem
                        key={language}
                        value={language}
                      >
                        {language}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </>
            )}

            {/* DOCTOR */}
            {user.role === "doctor" && (
              <>
                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Specialty"
                    value={data.specialty || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        specialty: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Hospital"
                    value={data.hospital || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        hospital: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Experience"
                    type="number"
                    value={data.experience || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        experience: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-field full-width">
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={data.description || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-qualifications full-width">

                  <Typography className="profile-edit-section-title">
                    Qualifications
                  </Typography>

                  {(data.qualifications || []).map((q, i) => (
                    <Box
                      key={i}
                      className="profile-edit-qualification"
                    >
                      <TextField
                        size="small"
                        label="Degree"
                        value={q.degree}
                        onChange={(e) =>
                          updateQualification(
                            i,
                            "degree",
                            e.target.value
                          )
                        }
                      />

                      <TextField
                        size="small"
                        label="Institution"
                        value={q.institution}
                        onChange={(e) =>
                          updateQualification(
                            i,
                            "institution",
                            e.target.value
                          )
                        }
                      />

                      <TextField
                        size="small"
                        label="Year"
                        type="number"
                        value={q.year}
                        onChange={(e) =>
                          updateQualification(
                            i,
                            "year",
                            e.target.value
                          )
                        }
                      />

                      <IconButton
                        className="profile-edit-delete"
                        onClick={() =>
                          removeQualification(i)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}

                  <Button
                    className="profile-edit-add"
                    onClick={addQualification}
                  >
                    + Add Qualification
                  </Button>
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="City"
                    value={data.location?.city || ""}
                    onChange={(e) =>
                      updateLocation(
                        "city",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="District"
                    value={data.location?.district || ""}
                    onChange={(e) =>
                      updateLocation(
                        "district",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="State"
                    value={data.location?.state || ""}
                    onChange={(e) =>
                      updateLocation(
                        "state",
                        e.target.value
                      )
                    }
                  />
                </div>
              </>
            )}

            {/* PHARMACY */}
            {user.role === "pharmacy" && (
              <>
                <div className="profile-edit-field full-width">
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={data.image || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        image: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    value={data.contactPhone || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactPhone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="Village/Area"
                    value={data.location?.village || ""}
                    onChange={(e) =>
                      updateLocation(
                        "village",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="City"
                    value={data.location?.city || ""}
                    onChange={(e) =>
                      updateLocation(
                        "city",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="District"
                    value={data.location?.district || ""}
                    onChange={(e) =>
                      updateLocation(
                        "district",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="profile-edit-field">
                  <TextField
                    fullWidth
                    label="State"
                    value={data.location?.state || ""}
                    onChange={(e) =>
                      updateLocation(
                        "state",
                        e.target.value
                      )
                    }
                  />
                </div>
              </>
            )}

          </div>

          {/* ACTIONS */}
          <div className="profile-edit-actions">
            <Button
              className="profile-edit-save"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>

        </Paper>
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

  if (error) return <p>Could not load profile. Please try again later.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Edit Profile</Typography>

        <TextField fullWidth label="Name" margin="normal" value={data.name ?? ""}
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
            <TextField fullWidth label="Specialty" margin="normal" value={data.specialty ?? ""}
              onChange={(e) => setField("specialty", e.target.value)} />
            <TextField fullWidth label="Hospital" margin="normal" value={data.hospital ?? ""}
              onChange={(e) => setField("hospital", e.target.value)} />
            <TextField fullWidth label="Experience" type="number" margin="normal" value={data.experience ?? ""}
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

        <Button fullWidth variant="contained" sx={{ marginTop: 3 }} onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
}

export default ProfileEdit;