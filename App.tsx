// App.tsx

/*CODE ATTRIBUTION*/
/*TITLE: IIE PIXD112 Module Reference Manual 2025*/
/*AUTHOR: The Independent Institute of Education (Pty) Ltd*/
/*DATE: 07/11/2025*/
/*VERSION: 1.0*/
/*AVAILABLE: https://advtechonline.sharepoint.com */

/*CODE ATTRIBUTION*/
/*TITLE: React Native – Official Documentation*/
/*AUTHOR: Meta Platforms, Inc.*/
/*DATE: 07/11/2025*/
/*VERSION: 0.76*/
/*AVAILABLE: https://reactnative.dev/docs/getting-started */

/*CODE ATTRIBUTION*/
/*TITLE: Expo Documentation – React Native Framework*/
/*AUTHOR: Expo Documentation Team*/
/*DATE: 07/11/2025*/
/*VERSION: 50.0*/
/*AVAILABLE: https://docs.expo.dev */

/*CODE ATTRIBUTION*/
/*TITLE: React Navigation – NavigationContainer*/
/*AUTHOR: React Navigation Contributors*/
/*DATE: 07/11/2025*/
/*VERSION: 6.1*/
/*AVAILABLE: https://reactnavigation.org/docs/navigation-container */

/*CODE ATTRIBUTION*/
/*TITLE: KeyboardAvoidingView – React Native Documentation*/
/*AUTHOR: Meta Platforms, Inc.*/
/*DATE: 07/11/2025*/
/*VERSION: 0.76*/
/*AVAILABLE: https://reactnative.dev/docs/keyboardavoidingview */

/*CODE ATTRIBUTION*/
/*TITLE: React Native Picker – Community Documentation*/
/*AUTHOR: React Native Picker Maintainers*/
/*DATE: 07/11/2025*/
/*VERSION: 2.6*/
/*AVAILABLE: https://github.com/react-native-picker/picker */

/*CODE ATTRIBUTION*/
/*TITLE: React Native Alert API*/
/*AUTHOR: Meta Platforms, Inc.*/
/*DATE: 07/11/2025*/
/*VERSION: 0.76*/
/*AVAILABLE: https://reactnative.dev/docs/alert */

/*CODE ATTRIBUTION*/
/*TITLE: FlatList – React Native Component Documentation*/
/*AUTHOR: Meta Platforms, Inc.*/
/*DATE: 07/11/2025*/
/*VERSION: 0.76*/
/*AVAILABLE: https://reactnative.dev/docs/flatlist */

/*CODE ATTRIBUTION*/
/*TITLE: MDN Web Docs – JavaScript Array Methods*/
/*AUTHOR: Mozilla Developer Network (MDN)*/
/*DATE: 07/11/2025*/
/*VERSION: N/A*/
/*AVAILABLE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array */

/*CODE ATTRIBUTION*/
/*TITLE: W3Schools – JavaScript Syntax Reference*/
/*AUTHOR: W3Schools.com*/
/*DATE: 07/11/2025*/
/*VERSION: N/A*/
/*AVAILABLE: https://www.w3schools.com/js/js_syntax.asp */


import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, // Used to display menu items efficiently (Meta Platforms Inc., 2025)
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert, // Used for simple confirmation messages (Meta Platforms Inc., 2025)
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView, // Helps manage keyboard overlap (Meta Platforms Inc., 2025)
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Handles screen transitions (React Navigation Contributors, 2025)
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker'; // Dropdown selection for categories (React Native Picker Maintainers, 2025)
import { RootStackParamList, ResItem } from './type';

/**
 * Predefined default cafe items (Mozilla Developer Network, 2025)
 */
const predefinedItems: ResItem[] = [
  {
    Nameitem: 'Coffee',
    description: 'Rich and aromatic brewed coffee.',
    category: 'Beverage',
    Amount: 30,
    intensity: 'Balanced',
    image:
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    ingredients: ['Ground coffee beans', 'Water', 'Milk.'],
  },
  {
    Nameitem: 'Butternut soup',
    description: 'Rich and warm butternut soup.',
    category: 'Starter',
    Amount: 85,
    intensity: 'Strong',
    image:
      'https://images.pexels.com/photos/13788765/pexels-photo-13788765.jpeg',
    ingredients: ['Butternut, spices, with a splash of a vinegar reduction.'],
  },
  {
    Nameitem: 'Braised Duck',
    description: 'Slow braised tender duck with a side of steamed potatoes.',
    category: 'Mains',
    Amount: 100,
    intensity: 'Strong',
    image:
      'https://images.pexels.com/photos/16975185/pexels-photo-16975185.jpeg',
    ingredients: ['Duck', 'Steamed potatoes', 'Spices.'],
  },
  {
    Nameitem: 'Mixed berry cheesecake',
    description: 'Rich and creamy cheesecake.',
    category: 'Dessert',
    Amount: 75,
    intensity: 'Strong',
    image:
      'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg',
    ingredients: ['Cream cheese', 'Whole milk', 'Graham crackers', 'Butter.'],
  },
];

/**
 * Screen for adding a new menu item
 * Uses controlled components with React Hooks (React Native Docs, 2025)
 */
function ManageMenuScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ManageScreen'>
) {
  const [Nameitem, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('Beverage');
  const [Amount, setAmount] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = () => {
    // Basic input validation (W3Schools, 2025)
    if (Nameitem && description && category && Amount) {
      const AmountValue = parseFloat(Amount);

      if (AmountValue > 0) {
        // Calculates intensity dynamically (MDN, 2025)
        const intensity =
          AmountValue < 45 ? 'Mild' : AmountValue < 65 ? 'Balanced' : 'Strong';

        const newItem: ResItem = {
          Nameitem,
          description,
          category,
          Amount: AmountValue,
          intensity,
          image,
          ingredients: ingredients.split(',').map((i) => i.trim()),
        };

        props.route.params.setItems([
          ...props.route.params.items,
          newItem,
        ]);

        props.navigation.goBack(); // Navigates back after save (React Navigation Contributors, 2025)
      } else {
        Alert.alert('Invalid Price', 'Price must be greater than 0.');
      }
    } else {
      Alert.alert('Missing Fields', 'Please fill out all fields before saving.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add a New Dish.</Text>

          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={Nameitem}
            onChangeText={setItemName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Category Picker (React Native Picker Maintainers, 2025) */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                mode="dropdown"
                dropdownIconColor="#bba005ff"
                style={styles.pickerStyle}
                itemStyle={{ height: 50 }}
              >
                <Picker.Item label="Select a Category" value="" color="#999" />
                <Picker.Item label="Beverage" value="Beverage" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Mains" value="Mains" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 50)"
            keyboardType="numeric"
            value={Amount}
            onChangeText={setAmount}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : null}

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/**
 * Home screen displaying menu list
 * FlatList improves rendering efficiency (Meta Platforms Inc., 2025)
 */
function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
) {
  const [items, setItems] = useState<ResItem[]>(predefinedItems);

  const removeItem = (index: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => setItems(items.filter((_, i) => i !== index)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Le Jardin Christoffel</Text>

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image || '' }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.Nameitem}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardMeta}>
                {item.category} · R{item.Amount} · {item.intensity}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          props.navigation.navigate('ManageScreen', { items, setItems })
        }
      >
        <Text style={styles.addText}>Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/**
 * Welcome screen using layered UI elements and image backgrounds (Expo Docs, 2025)
 */
function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>) {
  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg',
        }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>Welcome to Le Jardin Christoffel</Text>
        <Text style={styles.welcomeText}>
          Experience the best French countryside food in SA.
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.startText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Stack Navigation Setup (React Navigation Contributors, 2025)
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ManageScreen" component={ManageMenuScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


/**
 * Styles for the app
 */
const styles = StyleSheet.create({
  welcomeContainer: { flex: 1, backgroundColor: '#000000' },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    color: '#bba005ff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#325e2eff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startText: { color: '#dfd506ff', fontWeight: 'bold', fontSize: 18 },

  container: { flex: 1, backgroundColor: '#000000', padding: 15 },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffffff',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: { width: '100%', height: 220 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#4b2e2b' },
  cardDesc: { color: '#5d4037', fontSize: 14, marginVertical: 5 },
  cardMeta: { color: '#8d6e63', fontSize: 13 },
  removeButton: {
    backgroundColor: '#562f0357',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  removeText: { color: '#fff', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#ffffffff',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
  },
  addText: { color: '#000000ff', fontSize: 18, fontWeight: 'bold' },

  formContainer: { backgroundColor: '#000000ff', padding: 20 },
  formHeader: {
    fontSize: 24,
    color: '#ffffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#8d6e63',
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
  },
  pickerWrapper: { marginVertical: 10 },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffffff',
    marginBottom: 6,
    marginLeft: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#8d6e63',
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pickerStyle: {
    height: 50,
    width: '100%',
    color: '#ffffffff',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  saveButton: {
    backgroundColor: '#000000ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#ffffffff', fontWeight: 'bold' },
});
