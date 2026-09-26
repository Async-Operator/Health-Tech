import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import {
  ArrowForward,
  CheckCircle,
  ExpandMore,
  HealthAndSafety,
  MedicalServices,
  PersonSearch,
  VideoCall,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const doctors = [
  {
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    experience: "8+ Years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&h=800&q=80",
  },
  {
    name: "Dr. Ananya Das",
    specialty: "Pediatrics",
    experience: "6+ Years",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&h=800&q=80",
  },
  {
    name: "Dr. Suresh Mohanty",
    specialty: "Cardiology",
    experience: "15+ Years",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&h=800&q=80",
  },
  {
    name: "Dr. Priyanka Rout",
    specialty: "Dermatology",
    experience: "7+ Years",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&h=800&q=80",
  },
];

const services = [
  {
    number: "01",
    tag: "FIND A SPECIALIST",
    icon: <PersonSearch />,
    title: "Find care that fits your needs",
    text: "Browse doctors by specialty, experience, and availability. Choose the right person for you or someone in your family.",
  },
  {
    number: "02",
    tag: "ONLINE CONSULTATION",
    icon: <VideoCall />,
    title: "Speak with a doctor from home",
    text: "Get professional guidance without the waiting room. Connect through a simple video consultation from wherever you are.",
  },
  {
    number: "03",
    tag: "HEALTH RECORDS",
    icon: <HealthAndSafety />,
    title: "Keep your health in one place",
    text: "Store consultations, reports, prescriptions, and important health details so they are easier to access when you need them.",
  },
  {
    number: "04",
    tag: "SYMPTOM CHECKER",
    icon: <MedicalServices />,
    title: "Explain what you are feeling",
    text: "Describe your symptoms by typing or voice and organise the details before speaking with a doctor.",
  },
];

const steps = [
  {
    number: "01",
    title: "Make your free account",
    text: "Register with your name and phone number. It takes only 2 minutes.",
  },
  {
    number: "02",
    title: "Choose a doctor",
    text: "See doctors by specialty and language. Pick the one you trust.",
  },
  {
    number: "03",
    title: "Book a time",
    text: "Select a free time that works for you. Confirm with one click.",
  },
  {
    number: "04",
    title: "Talk online",
    text: "Join the video call from your phone. Speak freely with the doctor.",
  },
];

const faqs = [
  {
    question: "How do I book a doctor?",
    answer:
      "First make a free account. Then choose a doctor, pick a time, and confirm. You will get a message with all details.",
  },
  {
    question: "Are the doctors real and verified?",
    answer:
      "Yes. Every doctor is checked and verified before they join. You can trust them.",
  },
  {
    question: "Can I talk in my own language?",
    answer:
      "Yes. Many doctors speak Hindi, Odia, and other local languages. You can choose a doctor who speaks your language.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Yes. Your health details are private. Only the doctor you choose can see them.",
  },
  {
    question: "What if I need to change the time?",
    answer:
      "You can change or cancel the appointment from your account. Please do it a few hours before the call.",
  },
  {
    question: "Can I speak my problem instead of typing?",
    answer:
      "Yes. You can speak your symptoms. Our system will help write it clearly for the doctor.",
  },
];

const heroSlides = [
  {
    title: "Home Treatment",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
    alt: "Healthcare professional providing care at home",
  },
  {
    title: "Doctor Consultation",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85",
    alt: "Doctor speaking with a patient",
  },
  {
    title: "Family Healthcare",
    image:
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=1200&q=85",
    alt: "Family receiving healthcare support",
  },
  {
    title: "Trusted Care",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85",
    alt: "Healthcare team providing professional care",
  },
];

function Home() {
  const navigate = useNavigate();
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box className="home-page">

      {/* =====================================================
          HERO SECTION  (contains stats bar at bottom)
      ===================================================== */}

      <section className="home-hero">

        {/* Hospital background */}
        <div className="hero-background-image" />

        {/* Dark teal overlay */}
        <div className="hero-background-overlay" />

        <Container maxWidth="xl" className="hero-container">

          <Grid
            container
            className="hero-grid"
            alignItems="center"
          >

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <Grid size={{ xs: 12, md: 6 }}>

              <Box className="hero-content">

                {/* Trust badge */}

                <Box className="hero-eyebrow">
                  <CheckCircle />

                  <span>
                    Trusted Healthcare From Home
                  </span>
                </Box>

                {/* Heading */}

                <Typography
                  component="h1"
                  className="hero-title"
                >
                  Good Doctors
                  <span>
                    Close to Your Family
                  </span>
                </Typography>

                {/* Description */}

                <Typography className="hero-description">
                  Talk to real doctors from your home.
                  No long travel. Safe, simple and made
                  for every family in India.
                </Typography>

                {/* Trust points */}

                <Box className="hero-trust">

                  <Box className="hero-trust-item">
                    <CheckCircle />
                    <span>Verified Doctors</span>
                  </Box>

                  <Box className="hero-trust-item">
                    <CheckCircle />
                    <span>Private &amp; Secure</span>
                  </Box>

                  <Box className="hero-trust-item">
                    <CheckCircle />
                    <span>Video Consultation</span>
                  </Box>

                </Box>

                {/* Buttons */}

                <Box className="hero-buttons">

                  <Button
                    variant="contained"
                    className="hero-primary-btn"
                    onClick={() => navigate("/doctors")}
                    endIcon={<ArrowForward />}
                  >
                    Find a Doctor
                  </Button>

                  <Button
                    variant="outlined"
                    className="hero-secondary-btn"
                    onClick={() => {
                      document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                  >
                    How It Works
                  </Button>

                </Box>

              </Box>

            </Grid>

            {/* =================================================
                RIGHT DOCTOR / CAROUSEL
            ================================================= */}

            <Grid size={{ xs: 12, md: 6 }}>

              <Box className="hero-doctor-area">
                <Box className="hero-carousel">
                  {heroSlides.map((slide, index) => (
                    <img
                      key={slide.title}
                      src={slide.image}
                      alt={slide.alt}
                      className={`hero-carousel-image ${
                        index === heroSlide ? "is-active" : ""
                      }`}
                    />
                  ))}

                  <Box className="hero-carousel-top">
                    <Box className="hero-carousel-label">
                      <span className="hero-carousel-dot" />
                      {heroSlides[heroSlide].title}
                    </Box>

                    <Box className="hero-carousel-dots">
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.title}
                          type="button"
                          aria-label={`Show ${slide.title}`}
                          aria-current={index === heroSlide ? "true" : undefined}
                          className={`hero-carousel-dot-button ${
                            index === heroSlide ? "is-active" : ""
                          }`}
                          onClick={() => setHeroSlide(index)}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box className="hero-carousel-bottom">
                    <Box className="hero-carousel-copy">
                      <strong>{heroSlides[heroSlide].title}</strong>
                      <span>Trusted healthcare for you and your family.</span>
                    </Box>

                    <Box className="hero-carousel-progress">
                      <span
                        key={heroSlide}
                        style={{
                          animationDuration: "5000ms",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

            </Grid>

          </Grid>

        </Container>

        {/* =====================================================
            HERO STATS BAR  (inside hero, pinned to bottom)
        ===================================================== */}

        <div className="hero-stats-bar">
          <Container maxWidth="xl">
            <Grid container className="hero-stats-grid">

              <Grid size={{ xs: 6, md: 3 }}>
                <Box className="hero-stat-item">
                  <Typography className="hero-stat-number">
                    10+
                  </Typography>
                  <Typography className="hero-stat-label">
                    Types of Doctors
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Box className="hero-stat-item">
                  <Typography className="hero-stat-number">
                    350+
                  </Typography>
                  <Typography className="hero-stat-label">
                    Verified Doctors
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Box className="hero-stat-item">
                  <Typography className="hero-stat-number">
                    24/7
                  </Typography>
                  <Typography className="hero-stat-label">
                    Always Available
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Box className="hero-stat-item">
                  <Typography className="hero-stat-number">
                    100%
                  </Typography>
                  <Typography className="hero-stat-label">
                    Made for Families
                  </Typography>
                </Box>
              </Grid>

            </Grid>
          </Container>
        </div>

      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="services-section">
        <Container maxWidth="xl">
          <div className="services-heading">
            <Typography className="services-eyebrow">
              CARE THAT COMES TO YOU
            </Typography>
            <Typography component="h6" className="services-title">
              Everyday healthcare,
              <span>made simpler.</span>
            </Typography>
            <Typography className="services-description">
              From choosing a doctor to staying connected with your care,
              Swasthya Saathi keeps the important things close and easy to use.
            </Typography>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <Card
                className={`service-card ${
                  index === 0 ? "service-card-featured" : ""
                }`}
                key={service.title}
              >
                <CardContent className="service-card-content">
                  <div className="service-card-header">
                    <div className="service-icon">{service.icon}</div>
                    <span className="service-number">{service.number}</span>
                  </div>

                  <span className="service-tag">{service.tag}</span>

                  <Typography component="h3" className="service-title">
                    {service.title}
                  </Typography>

                  <Typography className="service-text">
                    {service.text}
                  </Typography>

                  <Button
                    className="service-link"
                    onClick={() => navigate("/doctors")}
                    endIcon={<ArrowForward />}
                  >
                    Explore care
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="services-bottom-note">
            <div className="services-note-icon">
              <CheckCircle />
            </div>
            <div className="services-note-copy">
              <strong>Built around your family</strong>
              <span>Simple tools, human doctors, less healthcare hassle.</span>
            </div>
            <div className="services-note-stats">
              <div className="services-note-stat">
                <strong>4</strong>
                <span>Core services</span>
              </div>
              <div className="services-note-stat">
                <strong>24/7</strong>
                <span>Access to care</span>
              </div>
              <div className="services-note-stat">
                <strong>14+</strong>
                <span>Cities supported</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          DOCTORS SECTION
      ===================================================== */}

      <section className="doctors-section">

        <Container maxWidth="xl">

          <Box className="doctors-heading">

            <Box className="doctors-heading-content">

              <Typography className="section-eyebrow">
                OUR DOCTORS
              </Typography>

              <Typography
                component="h2"
                className="section-title"
              >
                Meet our trusted doctors.
              </Typography>

              <Typography className="section-description">
                Experienced healthcare professionals ready to
                provide trusted care whenever you need it.
              </Typography>

            </Box>

            <Button
              className="view-doctors-btn"
              onClick={() => navigate("/doctors")}
              endIcon={<ArrowForward />}
            >
              See all doctors
            </Button>

          </Box>

          <Grid
            container
            spacing={3}
            className="doctors-grid"
          >

            {doctors.slice(0, 4).map((doctor) => (

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
                key={doctor.name}
              >

                <Card className="doctor-home-card">

                  <Box className="doctor-image-wrapper">

                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      loading="lazy"
                    />

                  </Box>

                  <CardContent className="doctor-card-content">

                    <Typography className="doctor-name">
                      {doctor.name}
                    </Typography>

                    <Typography className="doctor-specialty">
                      {doctor.specialty}
                    </Typography>

                    <Typography className="doctor-experience">
                      {doctor.experience} experience
                    </Typography>

                    <Button
                      className="doctor-details-btn"
                      onClick={() => navigate("/doctors")}
                    >
                      View Profile
                    </Button>

                  </CardContent>

                </Card>

              </Grid>

            ))}

          </Grid>

        </Container>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="how-section" id="how-it-works">
        <Container maxWidth="xl">
          <Box className="how-header">
            <Typography className="how-eyebrow">
              HOW IT WORKS
            </Typography>
            <Typography component="h2" className="how-title">
              Four easy steps to talk to a doctor.
            </Typography>
          </Box>

          <Grid container spacing={3} className="how-grid">
            {steps.map((step) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.number}>
                <Box className="step-card">
                  <Box className="step-top-line" />
                  <Typography className="step-number">
                    {step.number}
                  </Typography>
                  <Typography className="step-title">
                    {step.title}
                  </Typography>
                  <Typography className="step-text">
                    {step.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* =====================================================
          PATIENT STORIES
      ===================================================== */}

      <section className="stories-section">
        <Container maxWidth="xl">
          <Box className="stories-header">
            <Typography className="stories-eyebrow">
              WHAT FAMILIES SAY
            </Typography>
            <Typography className="stories-description">
              Real people from towns and villages sharing how
              Telehealth Bridge helped their family.
            </Typography>
          </Box>

          <Grid container spacing={3} className="stories-grid">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="story-card">
                <Box className="story-top-line" />
                <Box className="story-avatar">A</Box>
                <Typography className="story-text">
                  "I could talk to a good doctor without going to the city.
                  It saved time and money for my whole family."
                </Typography>
                <Typography className="story-name">
                  Anjali, Mother of two
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="story-card">
                <Box className="story-top-line" />
                <Box className="story-avatar">R</Box>
                <Typography className="story-text">
                  "The doctor spoke in Odia. I understood everything clearly.
                  Now I feel more confident about my health."
                </Typography>
                <Typography className="story-name">
                  Ramesh, Farmer
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="story-card">
                <Box className="story-top-line" />
                <Box className="story-avatar">S</Box>
                <Typography className="story-text">
                  "Booking was simple even on slow internet.
                  My parents got help without leaving home."
                </Typography>
                <Typography className="story-name">
                  Suman, College student
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="faq-section">
        <Container maxWidth="lg">
          <Box className="section-heading centered-heading">
            <Typography className="section-eyebrow">
              COMMON QUESTIONS
            </Typography>
            <Typography component="h2" className="section-title">
              Simple answers for you.
            </Typography>
            <Typography className="section-description">
              Clear answers about booking, doctors, language and safety.
            </Typography>
          </Box>

          <Box className="faq-list">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                className="faq-item"
                disableGutters
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  className="faq-question-wrap"
                >
                  <Typography className="faq-question">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="faq-answer-wrap">
                  <Typography className="faq-answer">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </section>
    </Box>
  );
}

export default Home;