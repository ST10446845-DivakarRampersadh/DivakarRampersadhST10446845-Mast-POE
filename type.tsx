// Define a single menu item in the cafe (Meta Platforms Inc., 2025)
export type ResItem = {
  Nameitem: string; // Item name (Meta Platforms Inc., 2025)
  description: string; // Brief description of the item (Meta Platforms Inc., 2025)
  category: string | null; // Category can be null if not specified (Meta Platforms Inc., 2025)
  Amount: number; // Price of the item (Meta Platforms Inc., 2025)
  intensity: string; // Strength or intensity of the beverage (React Native Documentation, 2025)
  image: string | null; // Image URL or null if none (Expo Documentation, 2025)
  ingredients: string[]; // List of ingredients (React Native Documentation, 2025)
};

// Define navigation routes and parameters (React Navigation Contributors, 2025)
export type RootStackParamList = {
  WelcomeScreen: undefined; // Initial welcome screen (React Navigation Contributors, 2025)
  HomeScreen: undefined; // Main home interface (React Navigation Contributors, 2025)
  ManageScreen: {
    items: ResItem[]; // List of items passed to manage (React Navigation Contributors, 2025)
    setItems: React.Dispatch<React.SetStateAction<ResItem[]>>; // Function to update items (React Documentation, 2025)
  };
};
