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

function ProfileEdit() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(user.role)
      .then((res) => setData(res.data))
      .catch(() => setData(null));
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
    </Container>
  );
}

export default ProfileEdit;