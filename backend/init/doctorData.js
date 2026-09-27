const sampleDoctor = [
  {
    user: "6ab9039713e8fe86e9a99864",
    name: "Dr. Ananya Sharma",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    specialty: "Cardiology",
    hospital: "Apollo Hospitals Bhubaneswar",
    experience: 12,
    description: "Experienced cardiologist specializing in heart disease prevention, diagnosis, and treatment.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "AIIMS Bhubaneswar",
        year: 2010
      },
      {
        degree: "MD Cardiology",
        institution: "AIIMS New Delhi",
        year: 2014
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8245, 20.2961]
      }
    },
    availability: [
      {
        day: "Monday",
        slots: ["10:00 AM", "11:00 AM", "4:00 PM"]
      },
      {
        day: "Wednesday",
        slots: ["10:00 AM", "11:00 AM", "4:00 PM"]
      },
      {
        day: "Friday",
        slots: ["10:00 AM", "11:00 AM"]
      }
    ],
    languages: ["English", "Hindi", "Odia"],
    isAvailableNow: true
  },

  {
    user: "6ab9039713e8fe86e9a99865",
    name: "Dr. Rahul Das",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    specialty: "General Medicine",
    hospital: "SUM Ultimate Medicare",
    experience: 9,
    description: "General physician providing comprehensive diagnosis and treatment for common and chronic illnesses.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "SCB Medical College",
        year: 2013
      },
      {
        degree: "MD General Medicine",
        institution: "VSS Institute of Medical Sciences",
        year: 2017
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.7838, 20.2444]
      }
    },
    availability: [
      {
        day: "Tuesday",
        slots: ["9:00 AM", "10:00 AM", "3:00 PM"]
      },
      {
        day: "Thursday",
        slots: ["9:00 AM", "10:00 AM", "3:00 PM"]
      },
      {
        day: "Saturday",
        slots: ["9:00 AM", "10:00 AM"]
      }
    ],
    languages: ["English", "Hindi", "Odia"],
    isAvailableNow: true
  },

  {
    user: "6ab9039713e8fe86e9a99866",
    name: "Dr. Priya Nair",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80",
    specialty: "Dermatology",
    hospital: "KIMS Hospital",
    experience: 8,
    description: "Dermatologist specializing in skin, hair, and nail disorders along with cosmetic dermatology.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "KIMS Bhubaneswar",
        year: 2014
      },
      {
        degree: "MD Dermatology",
        institution: "AIIMS New Delhi",
        year: 2018
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8024, 20.3058]
      }
    },
    availability: [
      {
        day: "Monday",
        slots: ["11:00 AM", "12:00 PM", "5:00 PM"]
      },
      {
        day: "Thursday",
        slots: ["11:00 AM", "12:00 PM", "5:00 PM"]
      }
    ],
    languages: ["English", "Hindi"],
    isAvailableNow: false
  },

  {
    user: "6ab9039713e8fe86e9a99867",
    name: "Dr. Sandeep Mohanty",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=500&q=80",
    specialty: "Orthopedics",
    hospital: "AMRI Hospitals Bhubaneswar",
    experience: 15,
    description: "Orthopedic specialist experienced in bone, joint, fracture, and musculoskeletal conditions.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "SCB Medical College",
        year: 2007
      },
      {
        degree: "MS Orthopedics",
        institution: "VSS Institute of Medical Sciences",
        year: 2011
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8071, 20.2965]
      }
    },
    availability: [
      {
        day: "Monday",
        slots: ["9:00 AM", "10:00 AM"]
      },
      {
        day: "Wednesday",
        slots: ["9:00 AM", "10:00 AM", "4:00 PM"]
      },
      {
        day: "Friday",
        slots: ["9:00 AM", "10:00 AM"]
      }
    ],
    languages: ["English", "Hindi", "Odia"],
    isAvailableNow: true
  },

  {
    user: "6ab9039713e8fe86e9a99868",
    name: "Dr. Neha Patel",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=500&q=80",
    specialty: "Pediatrics",
    hospital: "Care Hospitals Bhubaneswar",
    experience: 10,
    description: "Pediatrician providing medical care for infants, children, and adolescents.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "Gujarat Medical College",
        year: 2012
      },
      {
        degree: "MD Pediatrics",
        institution: "AIIMS New Delhi",
        year: 2016
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8246, 20.2938]
      }
    },
    availability: [
      {
        day: "Tuesday",
        slots: ["10:00 AM", "11:00 AM", "5:00 PM"]
      },
      {
        day: "Thursday",
        slots: ["10:00 AM", "11:00 AM", "5:00 PM"]
      },
      {
        day: "Saturday",
        slots: ["10:00 AM", "11:00 AM"]
      }
    ],
    languages: ["English", "Hindi"],
    isAvailableNow: false
  },

  {
    user: "6ab9039713e8fe86e9a99869",
    name: "Dr. Amit Kumar",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
    specialty: "Neurology",
    hospital: "Apollo Hospitals Bhubaneswar",
    experience: 14,
    description: "Neurologist specializing in neurological disorders, stroke management, and nervous system conditions.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "AIIMS Bhubaneswar",
        year: 2008
      },
      {
        degree: "DM Neurology",
        institution: "AIIMS New Delhi",
        year: 2012
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8245, 20.2961]
      }
    },
    availability: [
      {
        day: "Monday",
        slots: ["10:00 AM", "11:00 AM"]
      },
      {
        day: "Thursday",
        slots: ["10:00 AM", "11:00 AM", "4:00 PM"]
      }
    ],
    languages: ["English", "Hindi", "Odia"],
    isAvailableNow: true
  },

  {
    user: "6ab9039713e8fe86e9a9986a",
    name: "Dr. Sneha Mishra",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80",
    specialty: "Gynecology",
    hospital: "KIMS Hospital",
    experience: 11,
    description: "Gynecologist providing women's healthcare, reproductive health, and pregnancy-related care.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "SCB Medical College",
        year: 2011
      },
      {
        degree: "MS Gynecology",
        institution: "AIIMS New Delhi",
        year: 2015
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8024, 20.3058]
      }
    },
    availability: [
      {
        day: "Tuesday",
        slots: ["9:00 AM", "10:00 AM", "4:00 PM"]
      },
      {
        day: "Friday",
        slots: ["9:00 AM", "10:00 AM", "4:00 PM"]
      }
    ],
    languages: ["English", "Hindi", "Odia"],
    isAvailableNow: false
  },

  {
    user: "6ab9039713e8fe86e9a9986b",
    name: "Dr. Arjun Singh",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
    specialty: "Psychiatry",
    hospital: "SUM Ultimate Medicare",
    experience: 7,
    description: "Psychiatrist providing professional support for mental health and behavioral conditions.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "VSS Institute of Medical Sciences",
        year: 2015
      },
      {
        degree: "MD Psychiatry",
        institution: "NIMHANS",
        year: 2019
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.7838, 20.2444]
      }
    },
    availability: [
      {
        day: "Wednesday",
        slots: ["10:00 AM", "11:00 AM", "5:00 PM"]
      },
      {
        day: "Saturday",
        slots: ["10:00 AM", "11:00 AM", "5:00 PM"]
      }
    ],
    languages: ["English", "Hindi"],
    isAvailableNow: true
  },

  {
    user: "6ab9039713e8fe86e9a9986c",
    name: "Dr. Rakesh Behera",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=500&q=80",
    specialty: "ENT",
    hospital: "AMRI Hospitals Bhubaneswar",
    experience: 13,
    description: "ENT specialist treating ear, nose, throat, sinus, and related conditions.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "SCB Medical College",
        year: 2009
      },
      {
        degree: "MS ENT",
        institution: "AIIMS New Delhi",
        year: 2013
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8071, 20.2965]
      }
    },
    availability: [
      {
        day: "Monday",
        slots: ["10:00 AM", "12:00 PM"]
      },
      {
        day: "Wednesday",
        slots: ["10:00 AM", "12:00 PM", "4:00 PM"]
      },
      {
        day: "Saturday",
        slots: ["10:00 AM", "12:00 PM"]
      }
    ],
    languages: ["English", "Hindi", "Odia"],
    isAvailableNow: false
  },

  {
    user: "6ab9039713e8fe86e9a9986d",
    name: "Dr. Kavita Rao",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=80",
    specialty: "Endocrinology",
    hospital: "Apollo Hospitals Bhubaneswar",
    experience: 10,
    description: "Endocrinologist specializing in diabetes, thyroid disorders, and hormonal conditions.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "KIMS Bhubaneswar",
        year: 2012
      },
      {
        degree: "DM Endocrinology",
        institution: "AIIMS New Delhi",
        year: 2017
      }
    ],
    location: {
      city: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8245, 20.2961]
      }
    },
    availability: [
      {
        day: "Tuesday",
        slots: ["10:00 AM", "11:00 AM", "4:00 PM"]
      },
      {
        day: "Friday",
        slots: ["10:00 AM", "11:00 AM", "4:00 PM"]
      }
    ],
    languages: ["English", "Hindi"],
    isAvailableNow: true
  }
];

module.exports = { data: sampleDoctor };