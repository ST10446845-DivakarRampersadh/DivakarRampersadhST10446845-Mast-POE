import React, { useMemo, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { menuItem, Course, RootStackParamlist } from "../type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamlist, "Filter">;

const c = {
  bg: "#000000ff",
  card: "#000000ff",
  text: "#ffffffff",
  meta: "#ffffffff",
  input: "#ffffffff",
  border: "#000000ff",
};

export default function FilterScreen({ route }: Props) {
  const items: menuItem[] = route.params?.items || [];

  const [selected, setSelected] = useState<Course>("STARTER");

  // ✅ Filter the items
  const filteredItems = useMemo(
    () => items.filter((i) => i.category === selected),
    [items, selected]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ PICKER */}
      <View style={styles.pickerWrap}>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={selected}
            onValueChange={(v) => setSelected(v as Course)}
            mode="dropdown"
            dropdownIconColor="#526e21ff"
            style={styles.picker}
            itemStyle={{ height: 44 }}
          >
            <Picker.Item label="STARTER" value="STARTER" color="#000000ff" />
            <Picker.Item label="MAIN" value="MAIN" color="#000000ff" />
            <Picker.Item label="DESSERT" value="DESSERT" color="#000000ff" />
          </Picker>
        </View>
      </View>

      {/* ✅ HEADING */}
      <Text style={styles.heading}>
        {selected}s ({filteredItems.length})
      </Text>

      {/* ✅ LIST */}
      <FlatList
        data={filteredItems}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
              <Text style={styles.title}>{item.itemName}</Text>

              {/* ✅ INGREDIENT TAGS */}
              <View style={styles.chips}>
                {item.ingredients.map((g, idx) => (
                  <View key={idx} style={styles.chip}>
                    <Text style={styles.chipText}>{g}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg, padding: 16 },

  pickerWrap: { marginBottom: 12 },

  pickerBox: {
    backgroundColor: c.input,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.border,
    overflow: "hidden",
    height: 50,
    justifyContent: "center",
  },

  picker: { color: c.text, height: 50, width: "100%" },

  heading: {
    color: c.text,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },

  card: {
    backgroundColor: c.card,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    elevation: 3,
  },

  image: { width: "100%", height: 170 },

  body: { padding: 12 },

  title: { color: c.text, fontSize: 18, fontWeight: "800" },

  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },

  chip: {
    backgroundColor: c.input,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },

  chipText: { color: c.text, fontWeight: "700", fontSize: 12 },
});


 
