import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";
import DoctorCard from "../components/DoctorCard";
import { Grid } from "@mui/material";

function DoctorListing() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {doctors.map((doc) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doc._id}>
          <DoctorCard doctor={doc} />
        </Grid>
      ))}
    </Grid>
    );
}
export default DoctorListing;