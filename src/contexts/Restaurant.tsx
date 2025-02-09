import { createContext, useState } from "react";

export const RestaurantContext = createContext<RestaurantContextType>(
  {} as RestaurantContextType
);

type RestaurantProps = {
  children: React.ReactNode;
};

type Restaurant = {
  name: string | undefined;
  address: string | undefined;
};

type RestaurantContextType = {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
};

function Restaurant({ children }: RestaurantProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  return (
    <>
      <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>
        {children}
      </RestaurantContext.Provider>
    </>
  );
}

export default Restaurant;
