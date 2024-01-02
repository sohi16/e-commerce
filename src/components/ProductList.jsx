import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';

const ProductCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    margin-bottom: 8px;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  img {
    width: 100%;
    height: 200px; /* Set the height of the image */
    object-fit: cover; /* Adjust the image to cover the whole container */
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

const SearchFilterContainer = styled.div`
  margin-top:40px;  
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  input[type='text'],
  input[type='number'] {
    padding: 8px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  label {
    margin-right: 10px;
    font-size: 14px;
  }
  button{
    padding:8px 16px;
    max-width:150px;
    background-color: #1e90ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
  }
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const AddToCartButton = styled.button`
  margin-top: auto;
  padding: 6px 12px;
  max-width:100px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const ProductList = () => {
  const { addToCart, cartCount } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (response.ok) {
          const data = await response.json();
          if (data && data.products && Array.isArray(data.products)) {
            setProducts(data.products); // Set products in state
          } else {
            console.error('No products array found in the response:', data);
          }
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products when search term or price range changes
    const filteredProducts = products.filter((product) => {
      if (!product) {
        return false; // Skip if product is undefined
      }

      const productName = product.title ? product.title.toLowerCase() : '';
      return (
        productName.includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });
    setFilteredProducts(filteredProducts);
  }, [products, searchTerm, minPrice, maxPrice]);
  
  const clearPriceFilter = () => {
    setMaxPrice(1000);
    setMinPrice(0);
  };

  return (
    <div>
      <SearchFilterContainer>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label>Filter by Price:</label>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
        />
        <button onClick={clearPriceFilter}>Clear Price Filter</button>
      </SearchFilterContainer>
      <ProductCardsWrapper>
        {filteredProducts.map((product) => (
          <ProductCard key={product._id}>

            <ProductInfo>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <AddToCartButton onClick={() => addToCart(product)}>Add to Cart</AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductCardsWrapper>
    </div>
  );
};

export default ProductList;
