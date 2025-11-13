import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { menuItem, Course, RootStackParamlist } from "./type";
import WelcomeScreen from "./Screens/WelcomeScreen";
import AddItemScreen from "./Screens/AddItemScreen";
import FilterScreen from "./Screens/FilterScreen";
import HomeScreen from "./Screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamlist>();

// ✅ Predefined menu items
const predefined: menuItem[] = [
  {
    id: "1",
    itemName: "Butternut Soup",
    description: "Rich and warm butternut soup.",
    category: "STARTER",
    price: 120,
    intensity: "Balanced",
    image:
      "https://images.pexels.com/photos/13788765/pexels-photo-13788765.jpeg",
    ingredients: ["Butternut", "Spices", "Vinegar reduction"],
  },
  {
    id: "2",
    itemName: "Braised Duck",
    description: "Slow-braised tender duck with a side of steamed potatoes.",
    category: "MAIN",
    price: 195,
    intensity: "Bold",
    image:
      "https://images.pexels.com/photos/16975185/pexels-photo-16975185.jpeg",
    ingredients: ["Duck", "Steamed potatoes", "Spices"],
  },
  {
    id: "3",
    itemName: "Mixed Berry Cheesecake",
    description: "Rich and creamy cheesecake with mixed berries.",
    category: "DESSERT",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg",
    ingredients: ["Cream cheese", "Whole milk", "Graham crackers", "Butter"],
  },
];

export default function App() {
  const [items, setItems] = useState<menuItem[]>(predefined);

  // ✅ Add item function
  const addItem = (item: menuItem) => {
    setItems((prev) => [...prev, item]);
  };

  // ✅ Remove item function
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ✅ Average price by course
  const avg = (course: Course) => {
    const list = items.filter((i) => i.category === course);
    if (!list.length) return "0.00";
    const total = list.reduce((sum, i) => sum + i.price, 0);
    return (total / list.length).toFixed(2);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1b1513" },
          headerTintColor: "#e5ff7dd7",
          headerTitleStyle: { fontWeight: "800" },
        }}
      >
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeScreen"
          options={{ title: "Welcome to Le Jardin Christoffel" }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              items={items}
              removeItem={removeItem}
              averages={{
                STARTER: avg("STARTER"),
                MAIN: avg("MAIN"),
                DESSERT: avg("DESSERT"),
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="AddItemScreen"
          options={{ title: "Add New Item" }}
        >
          {(props) => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>

        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ title: "Filter Menu" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
