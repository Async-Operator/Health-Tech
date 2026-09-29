import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";
import DoctorCard from "../components/DoctorCard";
import { Grid } from "@mui/material";
import "./DoctorListing.css";

function DoctorListing() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="doctor-listing-page">
      <div className="doctor-listing-container">

        <div className="doctor-listing-header">
          <h1>Find a Doctor</h1>
          <p>
            Connect with qualified doctors and book a consultation.
          </p>
        </div>

        <Grid container spacing={3} className="doctor-grid">
          {doctors.map((doc) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={doc._id}
            >
              <DoctorCard doctor={doc} />
            </Grid>
          ))}
        </Grid>

      </div>
    </div>
  );
}

export default DoctorListing;