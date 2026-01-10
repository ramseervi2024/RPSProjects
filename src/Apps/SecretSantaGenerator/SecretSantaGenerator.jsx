import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native";
import { Gift, Shuffle } from "lucide-react-native";

const employees = [
  { name: "Hamish Murray", email: "hamish.murray@acme.com" },
  { name: "Layla Graham", email: "layla.graham@acme.com" },
  { name: "Matthew King", email: "matthew.king@acme.com" },
  { name: "Benjamin Collins", email: "benjamin.collins@acme.com" },
  { name: "Isabella Scott", email: "isabella.scott@acme.com" },
  { name: "Charlie Ross", email: "charlie.ross@acme.com" },
  { name: "Hamish Murray (Sr)", email: "hamish.murray.sr@acme.com" },
  { name: "Piper Stewart", email: "piper.stewart@acme.com" },
  { name: "Spencer Allen", email: "spencer.allen@acme.com" },
  { name: "Charlie Wright", email: "charlie.wright@acme.com" },
  { name: "Hamish Murray (Jr)", email: "hamish.murray.jr@acme.com" },
  { name: "Charlie Ross (Jr)", email: "charlie.ross.jr@acme.com" },
  { name: "Ethan Murray", email: "ethan.murray@acme.com" },
  { name: "Matthew King (Jr)", email: "matthew.king.jr@acme.com" },
  { name: "Mark Lawrence", email: "mark.lawrence@acme.com" }
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateAssignments(list) {
  let shuffled = shuffleArray(list);

  for (let i = 0; i < list.length; i++) {
    if (list[i].email === shuffled[i].email) {
      return generateAssignments(list);
    }
  }

  return list.map((emp, index) => ({
    ...emp,
    child: shuffled[index]
  }));
}

export default function SecretSantaGenerator() {
  const [assignments, setAssignments] = useState([]);

  const handleGenerate = () => {
    if (employees.length < 2) {
      Alert.alert("Error", "At least two employees required");
      return;
    }
    const result = generateAssignments(employees);
    setAssignments(result);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View style={{ padding: 16, flexDirection: "row", alignItems: "center" }}>
        <Gift size={28} color="#0f172a" />
        <Text style={{ fontSize: 22, fontWeight: "700", marginLeft: 10 }}>
          Secret Santa Generator
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleGenerate}
        style={{
          backgroundColor: "#0f172a",
          margin: 16,
          padding: 14,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Shuffle size={18} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 8 }}>
          Generate Assignments
        </Text>
      </TouchableOpacity>

      <ScrollView>
        {assignments.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#fff",
              marginHorizontal: 16,
              marginBottom: 12,
              padding: 14,
              borderRadius: 12,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 5
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              {item.name}
            </Text>
            <Text style={{ color: "#475569", marginBottom: 6 }}>
              {item.email}
            </Text>

            <Text style={{ fontSize: 13, color: "#64748b" }}>
              Secret Child
            </Text>
            <Text style={{ fontWeight: "600" }}>
              🎁 {item.child.name}
            </Text>
            <Text style={{ color: "#475569" }}>
              {item.child.email}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
