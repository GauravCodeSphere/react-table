import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const SidebarMenu = ({ children }) => {

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Sidebar />
        <main className='w-full bg-gray-10 p-4 md:ml-20 h-auto pt-20'>
          {children}
        </main>
      </div>
    </>
  );
};

export default SidebarMenu;