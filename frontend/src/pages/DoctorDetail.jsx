import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, Typography, Grid, Chip, Paper, Divider, Button, Table, TableBody, TableRow, TableCell } from "@mui/material";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/doctors/${id}`)
      .then(res => setDoctor(res.data));
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box
            component="img"
            src={doctor.image}
            alt={doctor.name}
            sx={{ 
                width: "100%", 
                height: 300, 
                objectFit: "cover", 
                objectPosition: "top",
                borderRadius: 2 
            }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Typography variant="h4">{doctor.name}</Typography>
            <Typography variant="h6" color="text.secondary">{doctor.specialty}</Typography>
            <Typography sx={{ marginTop: 1 }}>{doctor.hospital}</Typography>
            <Typography sx={{ marginTop: 1 }}>Experience: {doctor.experience} years</Typography>
            <Box sx={{ marginTop: 2 }}>
              {doctor.languages?.map((lang) => (
                <Chip key={lang} label={lang} sx={{ marginRight: 1 }} />
              ))}
            </Box>
            <Button variant="contained" fullWidth sx={{ marginTop: 3 }}>
              Book Consultation
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h6">About</Typography>
        <Typography sx={{ marginTop: 1, color: "text.secondary" }}>
          {doctor.description || "No description added yet."}
        </Typography>

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
    </Container>
  );
}
export default DoctorDetail;