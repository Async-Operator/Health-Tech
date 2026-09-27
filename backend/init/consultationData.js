const sampleConsultationData = [
    {
      patient: "6ab904ff36e72830c5c867d0",
      doctor: "6ab904ff36e72830c5c867da",
      date: "2026-09-28",
      slot: "10:00 AM",
      status: "confirmed",
      symptoms: "Fever, headache and body weakness",

      aiSuggestion: {
        possibleCondition: "Viral fever",
        urgencyLevel: "low",
        confidence: 0.82
      },

      prescription: {
        notes: "Take adequate rest and drink plenty of fluids.",
        medicines: [
          {
            name: "Paracetamol 500mg",
            dosage: "1 tablet after food",
            duration: "3 days"
          }
        ]
      },

      followUpNeeded: false
    },

    {
      patient: "6ab904ff36e72830c5c867d1",
      doctor: "6ab904ff36e72830c5c867db",
      date: "2026-09-28",
      slot: "11:00 AM",
      status: "pending",
      symptoms: "Cough, sneezing and throat irritation",

      aiSuggestion: {
        possibleCondition: "Upper respiratory tract infection",
        urgencyLevel: "low",
        confidence: 0.76
      },

      prescription: {
        notes: "Avoid dust and stay hydrated.",
        medicines: [
          {
            name: "Cetirizine 10mg",
            dosage: "1 tablet at night",
            duration: "5 days"
          }
        ]
      },

      followUpNeeded: false
    },

    {
      patient: "6ab904ff36e72830c5c867d2",
      doctor: "6ab904ff36e72830c5c867dc",
      date: "2026-09-29",
      slot: "09:30 AM",
      status: "confirmed",
      symptoms: "Increased thirst, frequent urination and tiredness",

      aiSuggestion: {
        possibleCondition: "Possible uncontrolled blood glucose",
        urgencyLevel: "medium",
        confidence: 0.88
      },

      prescription: {
        notes: "Check blood glucose and maintain regular meals.",
        medicines: [
          {
            name: "Metformin 500mg",
            dosage: "As previously prescribed",
            duration: "30 days"
          }
        ]
      },

      followUpNeeded: true
    },

    {
      patient: "6ab904ff36e72830c5c867d3",
      doctor: "6ab904ff36e72830c5c867dd",
      date: "2026-09-29",
      slot: "10:30 AM",
      status: "completed",
      symptoms: "Fatigue, cold intolerance and weight gain",

      aiSuggestion: {
        possibleCondition: "Possible hypothyroidism",
        urgencyLevel: "medium",
        confidence: 0.84
      },

      prescription: {
        notes: "Thyroid function test recommended.",
        medicines: [
          {
            name: "Levothyroxine 50mcg",
            dosage: "As directed by doctor",
            duration: "30 days"
          }
        ]
      },

      followUpNeeded: true
    },

    {
      patient: "6ab904ff36e72830c5c867d4",
      doctor: "6ab904ff36e72830c5c867de",
      date: "2026-09-30",
      slot: "02:00 PM",
      status: "confirmed",
      symptoms: "Headache and dizziness",

      aiSuggestion: {
        possibleCondition: "Possible blood pressure variation",
        urgencyLevel: "medium",
        confidence: 0.79
      },

      prescription: {
        notes: "Monitor blood pressure regularly.",
        medicines: [
          {
            name: "Amlodipine 5mg",
            dosage: "As prescribed",
            duration: "30 days"
          }
        ]
      },

      followUpNeeded: true
    },

    {
      patient: "6ab904ff36e72830c5c867d5",
      doctor: "6ab904ff36e72830c5c867df",
      date: "2026-10-01",
      slot: "11:30 AM",
      status: "pending",
      symptoms: "Runny nose, sneezing and mild fever",

      aiSuggestion: {
        possibleCondition: "Allergic rhinitis",
        urgencyLevel: "low",
        confidence: 0.81
      },

      prescription: {
        notes: "Avoid known allergens.",
        medicines: [
          {
            name: "Cetirizine 10mg",
            dosage: "1 tablet at night",
            duration: "5 days"
          }
        ]
      },

      followUpNeeded: false
    },

    {
      patient: "6ab904ff36e72830c5c867d6",
      doctor: "6ab904ff36e72830c5c867e0",
      date: "2026-10-01",
      slot: "03:00 PM",
      status: "completed",
      symptoms: "Joint pain and stiffness, especially in the morning",

      aiSuggestion: {
        possibleCondition: "Possible osteoarthritis",
        urgencyLevel: "medium",
        confidence: 0.86
      },

      prescription: {
        notes: "Gentle exercise and physiotherapy may be helpful.",
        medicines: [
          {
            name: "Paracetamol 650mg",
            dosage: "1 tablet when required",
            duration: "5 days"
          }
        ]
      },

      followUpNeeded: true
    },

    {
      patient: "6ab904ff36e72830c5c867d7",
      doctor: "6ab904ff36e72830c5c867e1",
      date: "2026-10-02",
      slot: "10:00 AM",
      status: "confirmed",
      symptoms: "Recurring headache with sensitivity to light",

      aiSuggestion: {
        possibleCondition: "Migraine",
        urgencyLevel: "medium",
        confidence: 0.91
      },

      prescription: {
        notes: "Rest in a quiet and dark environment during headache episodes.",
        medicines: [
          {
            name: "Sumatriptan 50mg",
            dosage: "As directed by doctor",
            duration: "As needed"
          }
        ]
      },

      followUpNeeded: true
    },

    {
      patient: "6ab904ff36e72830c5c867d8",
      doctor: "6ab904ff36e72830c5c867e2",
      date: "2026-10-02",
      slot: "01:00 PM",
      status: "cancelled",
      symptoms: "Stomach discomfort and acidity",

      aiSuggestion: {
        possibleCondition: "Acid reflux",
        urgencyLevel: "low",
        confidence: 0.83
      },

      prescription: {
        notes: "Avoid spicy and oily food.",
        medicines: [
          {
            name: "Pantoprazole 40mg",
            dosage: "1 tablet before breakfast",
            duration: "7 days"
          }
        ]
      },

      followUpNeeded: false
    },

    {
      patient: "6ab904ff36e72830c5c867d9",
      doctor: "6ab904ff36e72830c5c867e3",
      date: "2026-10-03",
      slot: "04:00 PM",
      status: "pending",
      symptoms: "High blood pressure and occasional dizziness",

      aiSuggestion: {
        possibleCondition: "Possible hypertension",
        urgencyLevel: "high",
        confidence: 0.89
      },

      prescription: {
        notes: "Monitor blood pressure and consult the doctor if symptoms worsen.",
        medicines: [
          {
            name: "Telmisartan 40mg",
            dosage: "As prescribed",
            duration: "30 days"
          }
        ]
      },

      followUpNeeded: true
    }
  ];

module.exports = {data: sampleConsultationData};