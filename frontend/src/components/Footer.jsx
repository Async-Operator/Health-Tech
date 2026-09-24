import { Box, Typography, Container, Grid, Link as MuiLink } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#1976d2", color: "white", padding: 3, marginTop: 6 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6">Telehealth Bridge</Typography>
            <Typography variant="body2">Healthcare for rural India</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle1">Quick Links</Typography>
            <MuiLink href="/" color="inherit" display="block">Home</MuiLink>
            <MuiLink href="/" color="inherit" display="block">Doctors</MuiLink>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle1">Contact</Typography>
            <Typography variant="body2">support@telehealthbridge.com</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          © 2026 Telehealth Bridge. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
export default Footer;