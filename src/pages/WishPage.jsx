import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import WishPageComponent from "../components/WishPageComponent";
import { useEffect, useState } from "react";
import { wishListState, getWList, wList } from "../store/wList";
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { products } from "../store/products";
import { themeState } from "../store/atoms";

const WishPage = () => {
    const navigate = useNavigate();
    const [wishList, setWishList] = useRecoilState(wishListState);
    const prod = useRecoilValueLoadable(products);
    const theme = useRecoilValue(themeState);
    const list = useRecoilValueLoadable(getWList);
    const slist = useRecoilValueLoadable(wList);

    const [n, setN] = useState({});
    const [load, setLoad] = useState(true);
    let loadInterval;

    useEffect(() => {
        document.body.classList = theme;
        if(wList.state==='hasValue'){
            console.log(wList);
        }
    }, [theme,wList]);

    useEffect(() => {
        if (list.state === 'hasValue') {
            setN(list.contents.qry[0]);
            setWishList(list.contents.qry[0].product_id); 
        }
    }, [list,load]);

    useEffect(() => {
        loadInterval = setInterval(() => {
            setLoad(false);
        
        }, 300);
        return () => {
            clearInterval(loadInterval);
        };
    }, []);

    if (list.state === 'loading' || prod.state === 'loading' || load) {
        return (
            <div className="bg-background text-text text-6xl w-screen h-screen flex justify-center items-center">
                <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
        );
    }

    if (prod.state === 'hasError' || list.state === 'hasError') {
        return <div>Error loading products</div>;
    }

    if (prod.state === 'hasValue' && list.state === 'hasValue' && !load) {
        return (
            <div className="bg-background rounded-md w-full min-h-screen h-full">
                <div 
                    onClick={() => navigate('/')} 
                    className='border-text/50 w-12 flex justify-center relative top-12 left-12 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold'
                >
                    <FaArrowLeft />
                </div>
                <div className='flex w-full justify-center text-4xl font-extrabold font-serif text-primary'>
                    WishList
                </div>
                <div className="px-12 py-14 min-h-1/2 overflow-y-scroll no-scrool">
                    {prod.contents.data.map((item, i) => {
                        const isWishlisted = wishList.product_id?.includes(item._id);
                        return isWishlisted ? (
                            <WishPageComponent 
                                key={i} 
                                title={item.name} 
                                description={item.description} 
                                price={item.price}
                                image={item.images}
                            />
                        ) : null;
                    })}
                </div>
            </div>
        );
    }

    return null; 
};

export default WishPage;
