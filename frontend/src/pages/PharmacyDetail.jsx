import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Box, Container, Typography, Paper, Divider, Chip, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

function PharmacyDetail() {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState(null);

  useEffect(() => {
    axiosClient.get(`/pharmacies/${id}`).then((res) => setPharmacy(res.data));
  }, [id]);

  if (!pharmacy) return <p>Loading...</p>;

  const loc = pharmacy.location || {};

  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Box
          component="img"
          src={pharmacy.image}
          alt={pharmacy.name}
          sx={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 2 }}
        />

        <Typography variant="h4" sx={{ marginTop: 2 }}>{pharmacy.name}</Typography>
        <Chip
          size="small"
          sx={{ marginTop: 1 }}
          label={pharmacy.isOpenNow ? "Open" : "Closed"}
          color={pharmacy.isOpenNow ? "success" : "default"}
        />
        <Typography sx={{ marginTop: 1 }}>
          {[loc.village, loc.city, loc.district, loc.state].filter(Boolean).join(", ")}
        </Typography>
        <Typography sx={{ marginTop: 1 }}>Phone: {pharmacy.contactPhone || "Not added"}</Typography>

        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h6">Medicine Stock</Typography>
        {(pharmacy.medicineStock || []).length === 0 ? (
          <Typography color="text.secondary" sx={{ marginTop: 1 }}>No stock added yet</Typography>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ marginTop: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell><b>Medicine</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pharmacy.medicineStock.map((m) => (
                  <TableRow key={m._id}>
                    <TableCell>{m.medicineName}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={m.quantity > 0 ? "In stock" : "Out of stock"}
                        color={m.quantity > 0 ? "success" : "error"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
export default PharmacyDetail;