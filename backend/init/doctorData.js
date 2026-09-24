
const sampleDoctor = [
  {
    user: "6ab4b5e55601285a0672ab07",
    name: "Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Experienced general physician providing reliable care for common illnesses, routine health problems, and preventive healthcare.",
    specialty: "General Physician",
    hospital: "District Hospital Bhubaneswar",
    experience: 8,
    languages: ["Odia", "Hindi", "English"],
    isAvailableNow: true,
    availability: [
      { day: "Monday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Wednesday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "10:00 AM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab08",
    name: "Ananya Das",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Caring pediatrician focused on children's health, growth, development, and treatment of common childhood illnesses.",
    specialty: "Pediatrics",
    hospital: "Kalinga Hospital",
    experience: 6,
    languages: ["Odia", "English"],
    isAvailableNow: true,
    availability: [
      { day: "Tuesday", slots: ["10:00 AM", "11:00 AM", "12:00 PM"] },
      { day: "Thursday", slots: ["3:00 PM", "4:00 PM", "5:00 PM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab09",
    name: "Suresh Mohanty",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Experienced cardiologist providing consultation and guidance for heart-related conditions and cardiovascular health.",
    specialty: "Cardiology",
    hospital: "Apollo Hospitals Bhubaneswar",
    experience: 15,
    languages: ["Odia", "Hindi", "English"],
    isAvailableNow: false,
    availability: [
      { day: "Monday", slots: ["10:00 AM", "11:00 AM"] },
      { day: "Wednesday", slots: ["2:00 PM", "3:00 PM"] },
      { day: "Saturday", slots: ["9:00 AM", "10:00 AM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab0a",
    name: "Priyanka Rout",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Dermatologist helping patients with skin, hair, and common dermatological conditions through personalized care.",
    specialty: "Dermatology",
    hospital: "SUM Ultimate Medicare",
    experience: 7,
    languages: ["Odia", "English"],
    isAvailableNow: false,
    availability: [
      { day: "Monday", slots: ["11:00 AM", "12:00 PM"] },
      { day: "Friday", slots: ["3:00 PM", "4:00 PM", "5:00 PM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab0b",
    name: "Amit Sharma",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Orthopedic specialist experienced in evaluating and treating bone, joint, muscle, and mobility-related problems.",
    specialty: "Orthopedics",
    hospital: "AMRI Hospital Bhubaneswar",
    experience: 12,
    languages: ["Hindi", "English", "Odia"],
    isAvailableNow: true,
    availability: [
      { day: "Tuesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Thursday", slots: ["2:00 PM", "3:00 PM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab0c",
    name: "Meena Behera",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Gynecologist providing women's healthcare, routine consultations, reproductive health support, and preventive care.",
    specialty: "Gynecology",
    hospital: "Capital Hospital Bhubaneswar",
    experience: 10,
    languages: ["Odia", "Hindi", "English"],
    isAvailableNow: false,
    availability: [
      { day: "Monday", slots: ["9:00 AM", "10:00 AM"] },
      { day: "Wednesday", slots: ["11:00 AM", "12:00 PM"] },
      { day: "Friday", slots: ["3:00 PM", "4:00 PM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab0d",
    name: "Rohan Patel",
    image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Neurologist providing consultation for neurological conditions, headaches, nerve disorders, and related concerns.",
    specialty: "Neurology",
    hospital: "Care Hospitals Bhubaneswar",
    experience: 14,
    languages: ["Hindi", "English"],
    isAvailableNow: false,
    availability: [
      { day: "Tuesday", slots: ["10:00 AM", "11:00 AM"] },
      { day: "Saturday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab0e",
    name: "Sneha Mishra",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&h=800&q=80",
    description: "ENT specialist helping patients with ear, nose, throat, sinus, and common respiratory-related concerns.",
    specialty: "ENT",
    hospital: "Hi-Tech Medical College",
    experience: 5,
    languages: ["Hindi", "Odia", "English"],
    isAvailableNow: true,
    availability: [
      { day: "Monday", slots: ["10:00 AM", "11:00 AM"] },
      { day: "Thursday", slots: ["3:00 PM", "4:00 PM", "5:00 PM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab0f",
    name: "Vikash Nayak",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&h=800&q=80",
    description: "Ophthalmologist providing eye examinations, vision care, and consultation for common eye-related conditions.",
    specialty: "Ophthalmology",
    hospital: "LV Prasad Eye Institute",
    experience: 9,
    languages: ["Odia", "English"],
    isAvailableNow: false,
    availability: [
      { day: "Wednesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Friday", slots: ["2:00 PM", "3:00 PM"] }
    ]
  },

  {
    user: "6ab4b5e55601285a0672ab10",
    name: "Kiran Patnaik",
    image: "",
    description: "Dentist providing general dental care, oral health consultations, preventive treatment, and routine dental procedures.",
    specialty: "Dentistry",
    hospital: "Bhubaneswar Dental Hospital",
    experience: 11,
    languages: ["Odia", "Hindi", "English"],
    isAvailableNow: true,
    availability: [
      { day: "Tuesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Friday", slots: ["3:00 PM", "4:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "11:00 AM"] }
    ]
  }
];
module.exports = { data: sampleDoctor };