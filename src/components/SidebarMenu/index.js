import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RiBarChartFill } from "react-icons/ri";
import { FaCalendar } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdHomeRepairService } from "react-icons/md";

const SidebarMenu = ({ children }) => {

  return (
    <>
      <div className='flex h-screen '>
        <Sidebar width='300px' className='mt-12'>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? 'grey' : '#0098e5',
                    backgroundColor: active ? '#83d7ff' : undefined,
                  };
              },
            }}
          >
            <label className='text-slate-400 text-sm flex justify-start ms-8 mb-2 font-semibold'>General</label>
            <SubMenu defaultOpen label="Charts" icon={<RiBarChartFill />}>
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
            </SubMenu>
            <MenuItem active icon={<FaCalendar />}>
              Calendar (active)
            </MenuItem>
            <MenuItem disabled icon={<IoMdCart />}>
              E-commerce (disabled)
            </MenuItem>
            <MenuItem icon={<MdHomeRepairService />}> Examples</MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-full bg-gray-50'>
          {children}
        </main>
      </div>
    </>
  );
};

export default SidebarMenu;