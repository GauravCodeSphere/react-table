import Footer from "../components/footer"
import Header from "../components/header"

const Layout = ({ children}) => {


    return (
        <div>
            <header>
                <Header />
            </header>

            <main>
                {children}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
