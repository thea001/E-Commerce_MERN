import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { cartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";



const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const { token } = useAuth();
    const [cartItems, setCartItems] = useState<cartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");


  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart. Please try again");
      }

      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
                
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({product, quantity, unitPrice }:{product: any; quantity:number; unitPrice: number}) => ({
        productId: product._id, 
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
    })
);
      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount)
    };

    fetchCart();
  }, [token]);


    const addItemToCart = async (productId :string) => {
        try{
           
            // Log the productId and token
        console.log("Adding product with ID:", productId);
        console.log("User Token:", token);

            const response = await fetch (`${BASE_URL}/cart/items`,{
                method:"POST",
                headers: {
                    'content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({
                    productId,
                    quantity: 1,
                   
                }),
            });

  // Log the response status and body
  console.log("Response Status:", response.status);
  const responseData = await response.json();
  console.log("Response Data:", responseData);


  if (!response.ok) {
    setError(responseData.data);
    return;
}

/*
            if(!response.ok){
                setError('Failed to add to cart');
            }

            const cart = await response.json();

            if(!cart) {
                setError ("Failed to parse cart data")
            }
*/
            const cartItemsMapped = cart.items.map(
                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({product, quantity}:{product: any; quantity:number}) => ({
                productId: product._id, 
                title: product.title,
                image: product.image,
                quantity,
                unitPrice: product.unitPrice,
            })
        );

            setCartItems([...cartItemsMapped]);
            setTotalAmount(cart.totalAmount)
        } catch (error){
            console.error("Error adding to cart:", error);
            setError("Something went wrong while adding to cart.");
        };

    };




    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
          {children}
        </CartContext.Provider>
      );
};


export default CartProvider;