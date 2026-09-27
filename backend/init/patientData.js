const mongoose = require("mongoose");

const samplePatients = [
  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d0"),
    name: "Rahul Kumar",
    age: 24,
    gender: "male",
    phone: "9876543210",

    location: {
      village: "Patia",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8182, 20.3548]
      }
    },

    language: "Odia",
    chronicDiseases: [],
    allergies: ["Dust"],

    emergencyContact: {
      name: "Ramesh Kumar",
      phone: "9876543211"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d1"),
    name: "Priya Das",
    age: 29,
    gender: "female",
    phone: "9876543212",

    location: {
      village: "Sahid Nagar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8347, 20.2961]
      }
    },

    language: "Odia",
    chronicDiseases: ["Asthma"],
    allergies: ["Pollen"],

    emergencyContact: {
      name: "Amit Das",
      phone: "9876543213"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d2"),
    name: "Suresh Behera",
    age: 46,
    gender: "male",
    phone: "9876543214",

    location: {
      village: "Jatni",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.7047, 20.1597]
      }
    },

    language: "Odia",
    chronicDiseases: ["Type 2 Diabetes"],
    allergies: [],

    emergencyContact: {
      name: "Mamata Behera",
      phone: "9876543215"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d3"),
    name: "Anjali Sharma",
    age: 35,
    gender: "female",
    phone: "9876543216",

    location: {
      village: "Nayapalli",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8036, 20.2961]
      }
    },

    language: "Hindi",
    chronicDiseases: ["Hypothyroidism"],
    allergies: ["Penicillin"],

    emergencyContact: {
      name: "Rajesh Sharma",
      phone: "9876543217"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d4"),
    name: "Manoj Nayak",
    age: 52,
    gender: "male",
    phone: "9876543218",

    location: {
      village: "Khandagiri",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.7726, 20.2574]
      }
    },

    language: "Odia",
    chronicDiseases: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Sulfa drugs"],

    emergencyContact: {
      name: "Sunita Nayak",
      phone: "9876543219"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d5"),
    name: "Sneha Patra",
    age: 21,
    gender: "female",
    phone: "9876543220",

    location: {
      village: "Rasulgarh",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8574, 20.3065]
      }
    },

    language: "Odia",
    chronicDiseases: [],
    allergies: [],

    emergencyContact: {
      name: "Bijay Patra",
      phone: "9876543221"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d6"),
    name: "Arjun Singh",
    age: 41,
    gender: "male",
    phone: "9876543222",

    location: {
      village: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8245, 20.2961]
      }
    },

    language: "Hindi",
    chronicDiseases: ["Hypertension"],
    allergies: ["Dust"],

    emergencyContact: {
      name: "Neha Singh",
      phone: "9876543223"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d7"),
    name: "Madhuri Mohanty",
    age: 58,
    gender: "female",
    phone: "9876543224",

    location: {
      village: "Old Town",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8333, 20.2376]
      }
    },

    language: "Odia",
    chronicDiseases: ["Osteoarthritis", "Hypertension"],
    allergies: ["Aspirin"],

    emergencyContact: {
      name: "Rakesh Mohanty",
      phone: "9876543225"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d8"),
    name: "Vikash Rout",
    age: 32,
    gender: "male",
    phone: "9876543226",

    location: {
      village: "Baramunda",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.7867, 20.2757]
      }
    },

    language: "Odia",
    chronicDiseases: [],
    allergies: ["Peanuts"],

    emergencyContact: {
      name: "Laxmi Rout",
      phone: "9876543227"
    },

    profileCompleted: true
  },

  {
    user: new mongoose.Types.ObjectId("6ab904ff36e72830c5c867d9"),
    name: "Pooja Mishra",
    age: 38,
    gender: "female",
    phone: "9876543228",

    location: {
      village: "Chandrasekharpur",
      district: "Khordha",
      state: "Odisha",
      coordinates: {
        type: "Point",
        coordinates: [85.8245, 20.3347]
      }
    },

    language: "Hindi",
    chronicDiseases: ["Migraine"],
    allergies: [],

    emergencyContact: {
      name: "Sanjay Mishra",
      phone: "9876543229"
    },

    profileCompleted: true
  }
];

module.exports = { data: samplePatients };