import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { Chip } from "@mui/material";
import "./DoctorDetail.css";
import BookingModal from "../components/BookingModal";
import { toast } from "react-toastify";
import { Box, Container, Typography, Grid, Chip, Paper, Divider, Button, Table, TableBody, TableRow, TableCell } from "@mui/material";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/doctors/${id}`)
      .then((res) => setDoctor(res.data));
  }, [id]);

  const handleBookClick = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "patient") {
      toast.error("Only patients can book consultations");
    } else {
      alert("Booking flow coming next");
      setOpenModal(true);
    }
  };

  if (!doctor) {
    return (
      <div className="doctor-detail-loading">
        <div className="doctor-loading-spinner"></div>
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  const loc = doctor.location || {};

  return (
    <main className="doctor-detail-page">
      <div className="doctor-detail-container">

        <div className="doctor-detail-card">

          <div className="doctor-detail-image-wrapper">
            <img
              className="doctor-detail-image"
              src={doctor.image}
              alt={doctor.name}
            />

            <div className="doctor-detail-verified">
              ? Verified Doctor
            </div>
          </div>

          <div className="doctor-detail-info">

            <div className="doctor-detail-label">
              HEALTHCARE PROFESSIONAL
            </div>

            <h1>{doctor.name}</h1>

            <div className="doctor-detail-specialty">
              {doctor.specialty}
            </div>

            <p className="doctor-detail-hospital">
              ?? {doctor.hospital}
            </p>

            <p className="doctor-detail-experience">
              <strong>{doctor.experience}</strong> years of experience
            </p>

            <p className="doctor-detail-location">
              ?? {loc.city}, {loc.district}, {loc.state}
            </p>

            {doctor.languages?.length > 0 && (
              <div className="doctor-detail-languages">
                {doctor.languages.map((lang) => (
                  <Chip
                    key={lang}
                    label={lang}
                    className="doctor-language-chip"
                  />
                ))}
              </div>
            )}

            <div className="doctor-detail-action">
              <button onClick={handleBookClick}>
                Book Consultation
                <span>?</span>
              </button>
            </div>

          </div>
        </div>

        <section className="doctor-detail-section">
          <h3>About the Doctor</h3>
          <p>
            {doctor.description || "No description added yet."}
          </p>
        </section>
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Typography variant="h4">{doctor.name}</Typography>
            <Typography variant="h6" color="text.secondary">{doctor.specialty}</Typography>
            <Typography sx={{ marginTop: 1 }}>{doctor.hospital}</Typography>
            <Typography sx={{ marginTop: 1 }}>Experience: {doctor.experience} years</Typography>
            <Typography sx={{ marginTop: 1 }}>{loc.city}, {loc.district}, {loc.state}</Typography>
            <Box sx={{ marginTop: 2 }}>
              {doctor.languages?.map((lang) => (
                <Chip key={lang} label={lang} sx={{ marginRight: 1 }} />
              ))}
            </Box>
            <Button variant="contained" fullWidth sx={{ marginTop: 3 }} onClick={handleBookClick}>
              Book Consultation
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />
        <Typography variant="h6">About</Typography>
        <Typography sx={{ marginTop: 1, color: "text.secondary" }}>
          {doctor.description || "No description added yet."}
        </Typography>

        {doctor.qualifications?.length > 0 && (
          <section className="doctor-detail-section">
            <h3>Qualifications</h3>

            <div className="doctor-qualifications">
              {doctor.qualifications.map((q, i) => (
                <div className="doctor-qualification" key={i}>
                  <div className="qualification-icon">?</div>

                  <div>
                    <strong>{q.degree}</strong>
                    <p>{q.institution}</p>
                    <span>{q.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="doctor-detail-section">
          <h3>Availability</h3>

          <div className="doctor-availability">
        <Divider sx={{ marginY: 3 }} />
        <Typography variant="h6">Availability</Typography>
        <Table sx={{ marginTop: 1 }}>
          <TableBody>
            {doctor.availability?.map((a) => (
              <div className="availability-row" key={a.day}>
                <strong>{a.day}</strong>

                <div>
                  {a.slots?.map((slot) => (
                    <span className="availability-slot" key={slot}>
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
          </TableBody>
        </Table>
      </Paper>

      {doctor && (
        <BookingModal open={openModal} onClose={() => setOpenModal(false)} doctor={doctor} />
      )}
    </Container>
  );
}
export default DoctorDetail;