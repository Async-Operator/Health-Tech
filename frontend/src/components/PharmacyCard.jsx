import { Card, CardContent, CardMedia, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PharmacyCard({ pharmacy }) {
  const navigate = useNavigate();
  const loc = pharmacy.location || {};

  return (
    <Card sx={{ maxWidth: 320, margin: "auto", borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={pharmacy.image}
        alt={pharmacy.name}
        sx={{ objectFit: "cover", objectPosition: "center" }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>{pharmacy.name}</Typography>

        <Typography color="text.secondary" noWrap>
          {[loc.village, loc.city, loc.district].filter(Boolean).join(", ")}
        </Typography>

        {/* NEW: distance line */}
        {pharmacy.distance !== undefined && (
          <Typography variant="body2" color="primary">
            {(pharmacy.distance / 1000).toFixed(1)} km away
          </Typography>
        )}

        {pharmacy.matchedMedicines?.length > 0 && (
          <div style={{ marginTop: 8 }}>
            {pharmacy.matchedMedicines.map((m) => (
              <Chip
                key={m._id || m.medicineName}
                size="small"
                variant="outlined"
                sx={{ marginRight: 0.5, marginTop: 0.5 }}
                label={`${m.medicineName}: ${m.quantity > 0 ? "In stock" : "Out of stock"}`}
                color={m.quantity > 0 ? "success" : "error"}
              />
            ))}
          </div>
        )}

        <Chip
          size="small"
          sx={{ marginTop: 1 }}
          label={pharmacy.isOpenNow ? "Open" : "Closed"}
          color={pharmacy.isOpenNow ? "success" : "default"}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => navigate(`/pharmacies/${pharmacy._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
export default PharmacyCard;