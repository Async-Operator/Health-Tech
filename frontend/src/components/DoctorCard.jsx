import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 320, margin: "auto", borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="220"
        image={doctor.image}
        alt={doctor.name}
        sx={{ objectFit: "cover", objectPosition: "top" }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>{doctor.name}</Typography>
        <Typography color="text.secondary">{doctor.specialty}</Typography>

        {doctor.distance !== undefined && (
          <Typography variant="body2" color="primary">
            {(doctor.distance / 1000).toFixed(1)} km away
          </Typography>
        )}

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ marginTop: 1 }}
          onClick={() => navigate(`/doctors/${doctor._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
export default DoctorCard;