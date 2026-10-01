import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
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
    axiosClient.get(`/doctors/${id}`).then(res => setDoctor(res.data));
  }, [id]);

  const handleBookClick = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "patient") {
      toast.error("Only patients can book consultations");
    } else {
      setOpenModal(true);
    }
  };

  if (!doctor) return <p>Loading...</p>;

  const loc = doctor.location || {};

  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box
              component="img"
              src={doctor.image}
              alt={doctor.name}
              sx={{ width: "100%", height: 300, objectFit: "cover", objectPosition: "top", borderRadius: 2 }}
            />
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
          <>
            <Divider sx={{ marginY: 3 }} />
            <Typography variant="h6">Qualifications</Typography>
            {doctor.qualifications.map((q, i) => (
              <Typography key={i} sx={{ marginTop: 1 }}>- {q.degree}, {q.institution} ({q.year})</Typography>
            ))}
          </>
        )}

        <Divider sx={{ marginY: 3 }} />
        <Typography variant="h6">Availability</Typography>
        <Table sx={{ marginTop: 1 }}>
          <TableBody>
            {doctor.availability?.map((a) => (
              <TableRow key={a.day}>
                <TableCell><b>{a.day}</b></TableCell>
                <TableCell>{a.slots.join(", ")}</TableCell>
              </TableRow>
            ))}
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