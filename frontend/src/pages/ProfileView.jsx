import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Paper,
  Typography,
  Chip,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import "./ProfileView.css";

function ProfileView() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfile(user.role)
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, [user.role]);

  if (!data) return <p>Loading...</p>;

  const loc = data.location || {};

  return (
    <Container className="profile-view-page">
      <div className="profile-view-container">
        <Paper className="profile-view-card" elevation={0}>

          {/* PROFILE HEADER */}
          <div className="profile-view-header">

            {user.role === "doctor" && (
              <Avatar
                src={data.image}
                className="profile-view-avatar"
              />
            )}

            {user.role === "pharmacy" && data.image && (
              <Box
                component="img"
                src={data.image}
                alt={data.name}
                className="profile-view-pharmacy-image"
              />
            )}

            <div className="profile-view-heading">
              <Typography
                component="h1"
                className="profile-view-name"
              >
                {data.name}
              </Typography>

              <Chip
                label={user.role.toUpperCase()}
                className="profile-view-role"
              />
            </div>
          </div>

          <Divider className="profile-view-divider" />

          {/* PATIENT */}
          {user.role === "patient" && (
            <Box className="profile-view-content">

              <div className="profile-view-grid">

                <div className="profile-view-info">
                  <span>Age</span>
                  <strong>{data.age || "Not provided"}</strong>
                </div>

                <div className="profile-view-info">
                  <span>Gender</span>
                  <strong>{data.gender || "Not provided"}</strong>
                </div>

                <div className="profile-view-info">
                  <span>Phone</span>
                  <strong>{data.phone || "Not provided"}</strong>
                </div>

                <div className="profile-view-info">
                  <span>Language</span>
                  <strong>{data.language || "Not provided"}</strong>
                </div>

                <div className="profile-view-info profile-view-full">
                  <span>Location</span>
                  <strong>
                    {[
                      loc.village,
                      loc.district,
                      loc.state,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Not provided"}
                  </strong>
                </div>

              </div>

              {data.chronicDiseases?.length > 0 && (
                <div className="profile-view-medical-card">
                  <Typography className="profile-view-section-title">
                    Chronic Diseases
                  </Typography>

                  <div className="profile-view-tags">
                    {data.chronicDiseases.map((disease, i) => (
                      <Chip
                        key={i}
                        label={disease}
                        className="profile-view-medical-chip"
                      />
                    ))}
                  </div>
                </div>
              )}

              {data.allergies?.length > 0 && (
                <div className="profile-view-medical-card">
                  <Typography className="profile-view-section-title">
                    Allergies
                  </Typography>

                  <div className="profile-view-tags">
                    {data.allergies.map((allergy, i) => (
                      <Chip
                        key={i}
                        label={allergy}
                        className="profile-view-allergy-chip"
                      />
                    ))}
                  </div>
                </div>
              )}

            </Box>
          )}

          {/* DOCTOR */}
          {user.role === "doctor" && (
            <Box className="profile-view-content">

              <div className="profile-view-grid">

                <div className="profile-view-info">
                  <span>Specialty</span>
                  <strong>{data.specialty || "Not provided"}</strong>
                </div>

                <div className="profile-view-info">
                  <span>Hospital</span>
                  <strong>{data.hospital || "Not provided"}</strong>
                </div>

                <div className="profile-view-info">
                  <span>Experience</span>
                  <strong>
                    {data.experience
                      ? `${data.experience} years`
                      : "Not provided"}
                  </strong>
                </div>

                <div className="profile-view-info profile-view-full">
                  <span>Location</span>
                  <strong>
                    {[
                      loc.city,
                      loc.district,
                      loc.state,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Not provided"}
                  </strong>
                </div>

              </div>

              {data.description && (
                <div className="profile-view-description">
                  <Typography className="profile-view-section-title">
                    About
                  </Typography>

                  <Typography className="profile-view-description-text">
                    {data.description}
                  </Typography>
                </div>
              )}

              {data.qualifications?.length > 0 && (
                <div className="profile-view-qualifications">

                  <Typography className="profile-view-section-title">
                    Qualifications
                  </Typography>

                  <div className="profile-view-qualification-list">
                    {data.qualifications.map((q, i) => (
                      <div
                        key={i}
                        className="profile-view-qualification"
                      >
                        <div className="profile-view-qualification-icon">
                          🎓
                        </div>

                        <div>
                          <strong>{q.degree}</strong>

                          <span>
                            {q.institution}
                          </span>

                          <small>
                            {q.year}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </Box>
          )}

          {/* PHARMACY */}
          {user.role === "pharmacy" && (
            <Box className="profile-view-content">

              <div className="profile-view-grid">

                <div className="profile-view-info">
                  <span>Contact</span>
                  <strong>
                    {data.contactPhone || "Not provided"}
                  </strong>
                </div>

                <div className="profile-view-info profile-view-full">
                  <span>Location</span>
                  <strong>
                    {[
                      loc.village,
                      loc.city,
                      loc.district,
                      loc.state,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Not provided"}
                  </strong>
                </div>

              </div>

              <div className="profile-view-stock">

                <Typography className="profile-view-section-title">
                  Medicine Stock
                </Typography>

                {(data.medicineStock || []).length === 0 ? (
                  <div className="profile-view-empty">
                    No stock added yet
                  </div>
                ) : (
                  <div className="profile-view-stock-list">
                    {data.medicineStock.map((m, i) => (
                      <div
                        key={i}
                        className="profile-view-stock-item"
                      >
                        <span>{m.medicineName}</span>
                        <strong>{m.quantity}</strong>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </Box>
          )}

        </Paper>
      </div>
    </Container>
  );
}

export default ProfileView;