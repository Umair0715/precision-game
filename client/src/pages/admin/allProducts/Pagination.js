import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/actions/productActions';

const Pagination = ({ productType , keyword , setAllProducts }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)

    return (
        <div className='flex items-center justify-between p-4'>
            <div className={`${products?.currentPage > 1 ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none'} flex items-center gap-2 text-primary flex-[0.25]`}
            onClick={() => dispatch(fetchProducts(products?.currentPage - 1, productType , keyword , setAllProducts))}>
                <i className="uil uil-arrow-left text-xl"></i>
                <div className='sm:flex hidden'>
                    <button className="btn-secondary py-2 px-8">PREVIOUS</button>
                </div>
            </div>
            <div className='flex-[0.5]'>
                <ul className='flex items-center justify-center gap-4 text-gray-100'>
                    {
                        [...Array(products?.pages).keys()].map((page ,i) => (
                            <li 
                            key={i}
                            className={`${page+1 === products?.currentPage ? 'py-2 px-4 bg-primary flex items-center justify-center text-black rounded-md cursor-pointer' : 'cursor-pointer'}`}
                            onClick={() => dispatch(fetchProducts(page+1 , productType , keyword , setAllProducts))}
                            >
                                {page + 1}
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
            {
                products?.pages && 
                <div className={`${products?.currentPage !== products?.pages ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none'} flex items-center gap-2 text-primary flex-[0.25]`}
                onClick={() => dispatch(fetchProducts(products?.currentPage + 1 , productType , keyword , setAllProducts))}>
                    <div className='sm:flex hidden'>
                        <button className="btn-secondary py-2 px-12">NEXT</button>
                    </div>
                    <i className="uil uil-arrow-right text-xl"></i>
                </div>
            }
        </div>
    )
}

export default Pagination