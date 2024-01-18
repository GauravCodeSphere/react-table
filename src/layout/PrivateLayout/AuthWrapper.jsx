// import { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import axios from 'axios';
// import Loader from '../../components/loader';
// import { useSession } from '../../context/SessionContext';
// import Layout from '../Layout';
// import { userUrl } from '../../config';

// const AuthWrapper = () => {
//   const [auth, setAuth] = useState({ loading: true, token: false });
//   const { setIsAuthenticated } = useSession();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${userUrl}/validate-token`, {
//         withCredentials: true,
//       });

//       const isValid = response.data.isValid;
//       localStorage.setItem("login", isValid)

//       setIsAuthenticated(isValid)
//       setAuth({ loading: false, token: isValid });
//     } catch (error) {
//       localStorage.setItem("login", false)
//       setAuth({ loading: false, token: false });
//       console.error('Error fetching data:', error.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);



//   if (auth.loading) {
//     return <Loader />;
//   }

//   return auth.token ?
//     <Layout>
//       {/* {children} */}
//       <Outlet />
//     </Layout>
//     : <Navigate to="/account/login" />;
// };

// export default AuthWrapper;
