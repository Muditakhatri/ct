import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { SideBar } from "../components/SideBar";
import { useRecoilValueLoadable } from "recoil";
import { detailsSelector } from "../store/detailsAtom"; 

export const Dashboard = () => {
    const detailsLoadable = useRecoilValueLoadable(detailsSelector);

    useEffect(() => {
        if (detailsLoadable.state === 'hasValue') {
            console.log(detailsLoadable);
            console.log(detailsLoadable.contents);
        }
    }, [detailsLoadable]);

    if (detailsLoadable.state === 'loading') {
        return <div>Loading...</div>;
    }

    if (detailsLoadable.state === 'hasError') {
        return <div>Error loading data.</div>;
    }

    const data = detailsLoadable.contents || {};
    console.log(data);

    return (
        <div className="flex justify-center items-center bg-backgrounds text-text w-screen h-full">
            <Nav />
            <SideBar top='Dashboard' />
            <div className="w-full h-full pt-20 pb-4 pr-3 pl-14 grid grid-cols-3 gap-2">
                <div className="bg-background/50 shadow-md  shadow-text/50 rounded-lg p-2">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Total Orders:
                        <div className="flex justify-center items-center h-full text-7xl text-primary/80">
                            {data.orders.length || 0}
                        </div>
                    </div>
                </div>
                <div className="bg-background/50 rounded-lg  shadow-md shadow-text/50 p-2">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Admins:
                        <div className="max-h-full">
                            <div className='text-5xl w-full py-5 flex items-center justify-center text-primary/80'>
                                {data.users ? data.users.filter(user => user.role === 'Admin').length : 0}
                            </div>
                            <div className="h-full">
                                {data.users ? data.users.filter(user => user.role === 'Admin').map((admin, index) => (
                                    <div key={index} className='my-2 text-xl'>* {admin.userName}</div>
                                )) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-background/50 rounded-lg row-span-2 h-[480px] overflow-scroll no-scrool  p-2 shadow-md shadow-text/50">
                    <div className="text-xl flex flex-col w-full font-bold text-text/70">
                         Total Users:
                        <div className="text-5xl py-2  text-primary/80">
                            {data.users.length || 0}
                        </div>
                        Users & their Roles:
                        <div className="overflow-scroll no-scrool mt-5 ">
                        
                        
                            {data.users ? data.users.map((user,key) => <div className="flex justify-between" key={key}><div>{user.userName}</div> <div>{user.role}</div></div> ):''}
                        
                        </div>
                    </div>
                </div>
                <div className="bg-background/50 rounded-lg col-span-2 p-2 shadow-md shadow-text/50">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Reviews:
                        <div className="flex">
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/80">{data.reviews.length || 0}</div>
                                <div>Good</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/80">{data.reviews.length || 0}</div>
                                <div>Bad</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/80">{data.reviews.length || 0}</div>
                                <div>All</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-background/50 rounded-lg col-span-3 p-2 shadow-md shadow-text/50">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Products Details:
                        <div className="flex">
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/90">{data.products.length || 0}</div>
                                <div>Total Products</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/90">{data.products.reduce((total,product)=>total+parseInt(product.stock),0) || 0}</div>
                                <div>Inventory</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/90">{data.categories.length || 0}</div>
                                <div>Total Categories</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};