import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: 8 }}>
      <Typography variant="h3" gutterBottom>
        Telehealth Bridge
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ marginBottom: 3 }}>
        Connecting rural patients with doctors — even on weak internet.
      </Typography>
      <Box sx={{ marginTop: 4 }}>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate("/doctors")}
        >
          Find a Doctor
        </Button>
      </Box>
    </Container>
  );
}
export default Home;