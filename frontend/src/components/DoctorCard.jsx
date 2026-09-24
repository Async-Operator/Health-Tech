import { Card, CardContent,CardActions, Typography, Button,CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  return (
    <Card sx={{maxWidth: 320, margin: "auto", borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="220"
        image={doctor.image}
        alt={doctor.name}
        sx={{ 
          objectFit: "cover",
          objectPosition: "top" 
        }}
      />
      <CardContent>
        <Typography variant="h6">{doctor.name}</Typography>
        <Typography color="text.secondary">{doctor.specialty}</Typography>
        <Typography variant="body2">{doctor.hospital}</Typography> 
      </CardContent>

      <CardActions>
        <Button size="small" sx={{ marginTop: 1 }} onClick={() => navigate(`/doctors/${doctor._id}`)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default DoctorCard;
