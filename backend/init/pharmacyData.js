const samplePharmacyData = 
   [
    {
      user: "6ab9050036e72830c5c867e4",
      name: "Apollo Pharmacy Patia",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800",
      location: {
        village: "Patia",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.8182, 20.3548]
        }
      },
      contactPhone: "9876543201",
      medicineStock: [
        { medicineName: "Paracetamol 500mg", quantity: 120 },
        { medicineName: "Cetirizine 10mg", quantity: 80 },
        { medicineName: "Omeprazole 20mg", quantity: 65 },
        { medicineName: "Azithromycin 500mg", quantity: 40 }
      ],
      isOpenNow: true
    },

    {
      user: "6ab9050036e72830c5c867e5",
      name: "MediCare Pharmacy",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
      location: {
        village: "Sahid Nagar",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.8347, 20.2961]
        }
      },
      contactPhone: "9876543202",
      medicineStock: [
        { medicineName: "Paracetamol 650mg", quantity: 150 },
        { medicineName: "Ibuprofen 400mg", quantity: 70 },
        { medicineName: "Pantoprazole 40mg", quantity: 90 },
        { medicineName: "ORS Sachet", quantity: 200 }
      ],
      isOpenNow: true
    },

    {
      user: "6ab9050036e72830c5c867e6",
      name: "HealthPlus Pharmacy",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      location: {
        village: "Jatni",
        city: "Jatni",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.7047, 20.1597]
        }
      },
      contactPhone: "9876543203",
      medicineStock: [
        { medicineName: "Metformin 500mg", quantity: 100 },
        { medicineName: "Amlodipine 5mg", quantity: 85 },
        { medicineName: "Paracetamol 500mg", quantity: 130 },
        { medicineName: "Atorvastatin 10mg", quantity: 60 }
      ],
      isOpenNow: false
    },

    {
      user: "6ab9050036e72830c5c867e7",
      name: "Wellness Care Pharmacy",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
      location: {
        village: "Nayapalli",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.8036, 20.2961]
        }
      },
      contactPhone: "9876543204",
      medicineStock: [
        { medicineName: "Levothyroxine 50mcg", quantity: 75 },
        { medicineName: "Calcium Tablets", quantity: 100 },
        { medicineName: "Vitamin D3", quantity: 90 },
        { medicineName: "Paracetamol 650mg", quantity: 110 }
      ],
      isOpenNow: true
    },

    {
      user: "6ab9050036e72830c5c867e8",
      name: "Khandagiri Medical Store",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800",
      location: {
        village: "Khandagiri",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.7726, 20.2574]
        }
      },
      contactPhone: "9876543205",
      medicineStock: [
        { medicineName: "Losartan 50mg", quantity: 70 },
        { medicineName: "Metformin 500mg", quantity: 90 },
        { medicineName: "Glimepiride 2mg", quantity: 55 },
        { medicineName: "Paracetamol 500mg", quantity: 140 }
      ],
      isOpenNow: true
    },

    {
      user: "6ab9050036e72830c5c867e9",
      name: "Rasulgarh Health Pharmacy",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800",
      location: {
        village: "Rasulgarh",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.8574, 20.3065]
        }
      },
      contactPhone: "9876543206",
      medicineStock: [
        { medicineName: "Cetirizine 10mg", quantity: 95 },
        { medicineName: "Montelukast 10mg", quantity: 60 },
        { medicineName: "Azithromycin 500mg", quantity: 35 },
        { medicineName: "ORS Sachet", quantity: 160 }
      ],
      isOpenNow: false
    },

    {
      user: "6ab9050036e72830c5c867ea",
      name: "CityMed Pharmacy",
      image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800",
      location: {
        village: "Saheed Nagar",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.8245, 20.2961]
        }
      },
      contactPhone: "9876543207",
      medicineStock: [
        { medicineName: "Pantoprazole 40mg", quantity: 100 },
        { medicineName: "Domperidone 10mg", quantity: 65 },
        { medicineName: "Paracetamol 650mg", quantity: 125 },
        { medicineName: "Amoxicillin 500mg", quantity: 45 }
      ],
      isOpenNow: true
    },

    {
      user: "6ab9050036e72830c5c867eb",
      name: "Old Town Medical Centre",
      image: "https://images.unsplash.com/photo-1580281657527-47f249e8f6df?w=800",
      location: {
        village: "Old Town",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.8333, 20.2376]
        }
      },
      contactPhone: "9876543208",
      medicineStock: [
        { medicineName: "Aspirin 75mg", quantity: 80 },
        { medicineName: "Atorvastatin 20mg", quantity: 65 },
        { medicineName: "Amlodipine 5mg", quantity: 90 },
        { medicineName: "Telmisartan 40mg", quantity: 70 }
      ],
      isOpenNow: true
    },

    {
      user: "6ab9050036e72830c5c867ec",
      name: "Baramunda Care Pharmacy",
      image: "https://images.unsplash.com/photo-1580281658628-7f7c0c1f5b65?w=800",
      location: {
        village: "Baramunda",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.7867, 20.2757]
        }
      },
      contactPhone: "9876543209",
      medicineStock: [
        { medicineName: "Sumatriptan 50mg", quantity: 35 },
        { medicineName: "Paracetamol 500mg", quantity: 130 },
        { medicineName: "Cetirizine 10mg", quantity: 75 },
        { medicineName: "Pantoprazole 40mg", quantity: 85 }
      ],
      isOpenNow: false
    },

    {
      user: "6ab9050036e72830c5c867ed",
      name: "Chandrasekharpur Wellness Pharmacy",
      image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800",
      location: {
        village: "Chandrasekharpur",
        city: "Bhubaneswar",
        district: "Khordha",
        state: "Odisha",
        coordinates: {
          type: "Point",
          coordinates: [85.8245, 20.3347]
        }
      },
      contactPhone: "9876543210",
      medicineStock: [
        { medicineName: "Paracetamol 650mg", quantity: 145 },
        { medicineName: "Ibuprofen 400mg", quantity: 80 },
        { medicineName: "Omeprazole 20mg", quantity: 75 },
        { medicineName: "Vitamin B12", quantity: 60 }
      ],
      isOpenNow: true
    }
  ];

module.exports = { data: samplePharmacyData };