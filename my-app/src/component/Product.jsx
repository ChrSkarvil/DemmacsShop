import React, {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { variables } from './../Variables'



const Product = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [stock, setStock] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }


    useEffect(() => {
        const getProduct = async () => {
         setLoading(true);
         const response = await fetch(`${variables.PRODUCT_API_URL}/search?productId=${id}`);
         setProduct(await response.json());
         setLoading(false);
        }
        const getStock = async () => {
            setLoading(true);
            try {
              const response = await fetch(`${variables.STOCKPRODUCT_API_URL}/search?productId=${id}`);
              
              if (response.status === 404) {
                // If the response status is 404 (Not Found), set stock to 0
                setStock(0);
              } else {
                const stockData = await response.json();
                // Calculate the total quantity from all stock records
                const totalQuantity = stockData.reduce((total, stockRecord) => total + stockRecord.quantity, 0);
                setStock(totalQuantity);
              }
            } catch (error) {
              console.error('Error fetching stock:', error);
            } finally {
              setLoading(false);
            }
          };
        getStock();
        getProduct();
    }, []);

    const Loading = () => {
        return(
            <>
             <div className='col-md-6'>
                <Skeleton height={400}/>
             </div>
             <div className='col-md-6' style={{lineHeight:2}}/>
                <Skeleton height={50} width={300} />
                <Skeleton height={75} />
                <Skeleton height={25} width={150} />
                <Skeleton height={50} />
                <Skeleton height={150} />
                <Skeleton height={50} width={100} />
                <Skeleton height={50} width={100} style={{marginLeft:6}}/>
            </>
        )
    }
    

    const ShowProduct = () => {
        return(
            <>
                <div className="col-md-6">  
                    <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} 
                    height="400px" width="350px"/>
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.categoryName}
                    </h4>
                    <h2 className="display-5">{product.productName}</h2>
                    <p className="lead fw-bolder">
                        Rating 5
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">
                        $ {product.productPrice}
                    </h3>
                    <p className="lead fw-bold">Stock: {stock}</p>
                    <p className="lead">{product.description}</p>
                    <button className='btn btn-outline-dark px-4 py-2'
                      onClick={() => {
                        if (stock > 0) {
                          addProduct(product);
                        } else {
                          alert('This product is out of stock.');
                        }
                      }}
                      disabled={stock <= 0} // Disable the button when stock is 0 or less
                      
                      //Rename the button to out of stock if there is no stock left.
                      >
                        {stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3
                    py-2">
                        Go to Cart
                    </NavLink>
                </div>
            </>
        )
    }

    

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading/> : <ShowProduct/>} 
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
}

export default Product;