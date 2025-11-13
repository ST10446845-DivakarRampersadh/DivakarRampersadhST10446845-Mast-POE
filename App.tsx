import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { menuItem , Course, RootStackParamlist } from "./type";
import WelcomeScreen from "./Screens/WelcomeScreen";
import AddItemScreen from "./Screens/AddItemScreen";
import FilterScreen from "./Screens/FilterScreen";
import HomeScreen from "./Screens/HomeScreen";

const stack= createNativeStackNavigator<RootStackParamlist>();

const predefined :menuItem[]=[
  {
  id : "1",
  itemName: "Butternut soup",
    description:
      "Rich and warm butternut soup.",
    category: "Starter",
    price: 120,
    intensity: "Balanced",
    image:
      "https://images.pexels.com/photos/13788765/pexels-photo-13788765.jpeg", // butternut soup image 
    ingredients: ["Butternut, spices, with a splash of a vinger reduction."]
  },
  {
    //MAIN MEAL
    id: "2",
  itemName: "Braised Duck",
    description:
      "Slow braised thender duck with a side of steams potatos .",
    category: "Mains",
    price: 195,
    intensity: "Bold",
    image:
      "https://images.pexels.com/photos/16975185/pexels-photo-16975185.jpeg", // image of braised duck
    ingredients: ["Duck ', 'Steamed potatos', 'spices."]
  },

  {//DESSERT
    id: "3",
    itemName: "Mixed berry cheesecake",
    description:
      "Rich and creamy cheesecake.",
    category: "Dessert",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg", // image of Cheesecake
    ingredients: ["Cream cheese, Whole Milk, Gram crackers, Butter."]
  }
];

export default function App(){
  const [items,setitems] =useState <menuItem[]> (predefined);

  const addItem= (items:menuItem) => setitems (prev => [...prev,items]);
  const RemoveItem =(id:string) => setitems (prev => prev.filter(i => i.id !==id));
  
  const avg =(course:Course) => {
    const list =items.filter(i=> i.category ===course);

    if(!list.length) return "0.00" ;
    const total =list.reduce ((s,i) => s + i.price,0);
    return (total /list.length).toFixed(2);

  };
  return (
    <NavigationContainer>
      <stack.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:"#1b1513"},
        headerTintColor :"#e5ff7dd7",
        headerTitleStyle: {fontWeight: "800"}

      }}>


        <stack.Screen 
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown:false}}
        />

        <stack.Screen
        name="HomeScreen"
        options={{title: "Welcome to Le Jardin Christoffel"}}>
          {props=> (
            <HomeScreen
            {...props}
            items={items}
            removeItem={RemoveItem}
            averages={{
              STARTER:avg("STARTER"),
              MAIN:avg("MAIN"),
              DESSERT:avg("DESSERT")
            }}
            />
          )}
        </stack.Screen>
       <stack.Screen
        name="AddItemScreen" options={{title: "add New Item"}}>
        {props=> <AddItemScreen{...props}addItem={addItem}/>}
 </stack.Screen>
<stack.Screen
name="Filter"
component={FilterScreen}
options={{title: "Filter Menu"}}
/>
</stack.Navigator>
      

      

    </NavigationContainer>
  );
}