import { useContext , createContext , useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

const ProductContextProvider = ({ children }) => {
    const [showProductDetailsPopup , setShowProductDetailsPopup] = useState(false);
    const [products , setProducts] = useState([]);
    const [selectedProduct , setSelectedProduct] = useState();
    const [pages , setPages] = useState(1);
    const [currentPage , setCurrentPage] = useState(1);
    const [productType , setProductType] = useState('');

    return (
        <ProductContext.Provider value={{
            showProductDetailsPopup , setShowProductDetailsPopup ,
            products , setProducts ,
            selectedProduct , setSelectedProduct ,
            pages , setPages , 
            currentPage , setCurrentPage , 
            productType , setProductType
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;