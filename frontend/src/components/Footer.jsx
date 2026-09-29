import {
  Box,
  Typography,
  Container,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import "./Footer.css"
function Footer() {
  return (
    <footer className="site-footer">

      <Container maxWidth="xl">

        <Box className="footer-glass">

          <Grid container spacing={6}>

            {/* =================================================
                BRAND
            ================================================= */}

            <Grid size={{ xs: 12, md: 5 }}>

              <Box className="footer-brand">

                <Box className="footer-logo">
                  A
                </Box>

                <Box>
                  <Typography className="footer-brand-name">
                    Telehealth Bridge
                  </Typography>

                  <Typography className="footer-brand-tagline">
                    Healthcare for rural India
                  </Typography>
                </Box>

              </Box>

              <Typography className="footer-description">
                Connecting patients with doctors through accessible
                digital healthcare.
              </Typography>

              <Typography className="footer-location">
                Serving communities across India
              </Typography>

            </Grid>


            {/* =================================================
                QUICK LINKS
            ================================================= */}

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

              <Typography className="footer-heading">
                Quick Links
              </Typography>

              <Box className="footer-links">

                <MuiLink
                  href="/"
                  className="footer-link"
                >
                  Home
                </MuiLink>

                <MuiLink
                  href="/doctors"
                  className="footer-link"
                >
                  Doctors
                </MuiLink>

              </Box>

            </Grid>


            {/* =================================================
                CONTACT
            ================================================= */}

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>

              <Typography className="footer-heading">
                Contact
              </Typography>

              <Typography className="footer-email">
                support@telehealthbridge.com
              </Typography>

              <Typography className="footer-contact-text">
                For healthcare support and platform-related
                assistance, contact our team.
              </Typography>

            </Grid>

          </Grid>


          {/* =================================================
              BOTTOM
          ================================================= */}

          <Box className="footer-bottom">

            <Typography>
              © 2026 Telehealth Bridge. All rights reserved.
            </Typography>

            <Typography className="footer-bottom-tag">
              Accessible healthcare. Connected communities.
            </Typography>

          </Box>

        </Box>

      </Container>

    </footer>
  );
}

export default Footer;