import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { getProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import DoctorCard from "../components/DoctorCard";
import { Grid, Box, Button, TextField, MenuItem, Typography, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

function DoctorListing() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [radius, setRadius] = useState(20);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchParam = search.trim() || undefined;

      if (origin) {
        axiosClient
          .get("/doctors/nearby", {
            params: { lng: origin[0], lat: origin[1], maxDistance: radius * 1000, search: searchParam },
          })
          .then((res) => setDoctors(res.data))
          .catch(() => toast.error("Could not load nearby doctors"));
      } else {
        axiosClient
          .get("/doctors", { params: { search: searchParam } })
          .then((res) => setDoctors(res.data))
          .catch((err) => console.log(err));
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [origin, radius, search]);

  const useGps = () => {
    if (!navigator.geolocation) {
      toast.error("Location not supported on this device");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setOrigin([pos.coords.longitude, pos.coords.latitude]),
      () => toast.error("Could not get location. Allow permission and try again.")
    );
  };

  const useSavedLocation = async () => {
    try {
      const res = await getProfile("patient");
      const coords = res.data?.location?.coordinates?.coordinates;
      if (coords && coords.length === 2) {
        setOrigin(coords);
      } else {
        toast.error("No saved location in your profile");
      }
    } catch {
      toast.error("Could not load your profile");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        fullWidth
        placeholder="Search by doctor name, specialty, hospital, or area"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", marginBottom: 2 }}>
        <Button variant={origin ? "outlined" : "contained"} onClick={() => setOrigin(null)}>
          All Doctors
        </Button>
        <Button variant="outlined" onClick={useGps}>Near Me (GPS)</Button>
        {user?.role === "patient" && (
          <Button variant="outlined" onClick={useSavedLocation}>My Saved Location</Button>
        )}
        {origin && (
          <TextField select size="small" label="Distance" value={radius}
            onChange={(e) => setRadius(e.target.value)} sx={{ minWidth: 110 }}>
            {[5, 10, 20, 50].map((km) => (
              <MenuItem key={km} value={km}>{km} km</MenuItem>
            ))}
          </TextField>
        )}
      </Box>

      {doctors.length === 0 && (
        <Typography color="text.secondary">
          No doctor found. Try a different word{origin ? " or a bigger distance" : ""}.
        </Typography>
      )}

      <Grid container spacing={3}>
        {doctors.map((doc) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doc._id}>
            <DoctorCard doctor={doc} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default DoctorListing;