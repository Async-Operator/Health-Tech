import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";
import { Container, Paper, Typography, TextField, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

function ManageMedicine() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfile("pharmacy").then(res => setData(res.data)).catch(() => setData(null));
  }, []);

  const addMedicine = () => {
    setData({ ...data, medicineStock: [...(data.medicineStock || []), { medicineName: "", quantity: 0 }] });
  };
  const updateMedicine = (i, field, value) => {
    const updated = [...data.medicineStock];
    updated[i][field] = value;
    setData({ ...data, medicineStock: updated });
  };
  const removeMedicine = (i) => {
    setData({ ...data, medicineStock: data.medicineStock.filter((_, idx) => idx !== i) });
  };

  const handleSave = async () => {
    try {
      await updateProfile("pharmacy", data);
      toast.success("Medicine stock updated!");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Manage Medicine Stock</Typography>

        {(data.medicineStock || []).map((item, i) => (
          <Box key={i} sx={{ display: "flex", gap: 1, marginTop: 1, alignItems: "center" }}>
            <TextField label="Medicine" size="small" value={item.medicineName}
              onChange={(e) => updateMedicine(i, "medicineName", e.target.value)} />
            <TextField label="Qty" type="number" size="small" value={item.quantity}
              onChange={(e) => updateMedicine(i, "quantity", e.target.value)} />
            <IconButton color="error" onClick={() => removeMedicine(i)}><DeleteIcon /></IconButton>
          </Box>
        ))}

        <Button sx={{ marginTop: 2 }} onClick={addMedicine}>+ Add Medicine</Button>

        <Box sx={{ marginTop: 3 }}>
          <Button variant="contained" onClick={handleSave}>Save Stock</Button>
        </Box>
      </Paper>
    </Container>
  );
}
export default ManageMedicine;