import React, { useEffect } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import ProductTable from '../components/Table';
import { useActions } from '../store/actions';

const Home = () => {

    const { fetchProducts } = useActions()

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div>
            <SidebarMenu>
                <ProductTable />
            </SidebarMenu>
        </div>
    );
}

export default Home;
