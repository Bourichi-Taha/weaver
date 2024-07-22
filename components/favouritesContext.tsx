import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Category {
  id: number;
  images: string[];
  category: string;
  image: string;
}

interface FavoritesContextProps {
  favorites: Category[];
  addToFavorites: (item: Category) => void;
  removeFromFavorites: (item: Category) => void;
  isFavorite: (item: Category) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Category[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("@favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites: Category[]) => {
    try {
      await AsyncStorage.setItem("@favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  };

  const addToFavorites = (item: Category) => {
    const newFavorites = [...favorites, item];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFromFavorites = (item: Category) => {
    const newFavorites = favorites.filter((fav) => fav.id !== item.id);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (item: Category) => {
    return favorites.some((fav) => fav.id === item.id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
