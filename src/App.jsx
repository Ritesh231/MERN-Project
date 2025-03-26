import HomePage from './pages/HomePage/HomePage';
import SignUpGoogle from './component/SignUpGoogle';
import UserHomePage from './pages/UserHomePage/UserHomePage';
import SubscriptionPage from './pages/SubscriptionPage/SubScriptionPage';
import AfterSubscription from './pages/AfterSubscription/AfterSubscription';
import GooglePayPage from './pages/SubscriptionPage/GooglePayPage';
import NewSignUp from './pages/NewSignUp/NewSignUp';
import NewSignIn from './pages/NewSignInPage/NewSignIn';
import { Route,Routes } from 'react-router-dom';
import Darkmode from './component/Darkmode'
import { CssBaseline } from '@mui/material';
import SupportPage from './pages/SupportPage/SupportPage';
import Profile from "./pages/Profile/Profile";
import Profilee from "./component/Profilee";
import Pricing from './pages/Pricing/Price';
import NewPrice from './pages/NewSignUp/NewPrice/NewPrice';
import Payment1 from './pages/NewSignUp/Payment1/Payment1';
import Payment2 from './pages/NewSignUp/Payment1/Payment2';
import Payment3 from './pages/NewSignUp/Payment1/Payment3';
import UserHome2 from './pages/UserHomePage/UserHome';
import Forgotten from './component/Forgotten-password';
import ResetPassword from './pages/Reset-Password/ResetPassword'



function App(){

    return(
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/NewSignIn' element={<NewSignIn/>}/>
                <Route path='/NewSignUp' element={<NewSignUp/>}/>
                <Route path='/SignUpGoogle' element={<SignUpGoogle/>}/>
                <Route path='/UserHomePage' element={<UserHomePage/>}/>
                <Route path='/SubscriptionPage' element={<SubscriptionPage/>}/>
                <Route path='/AfterSubscription' element={<AfterSubscription/>}></Route>
                <Route path='/GooglePayPage' element={<GooglePayPage/>}></Route>
                <Route path='/SupportPage' element={<SupportPage/>}></Route>
                <Route path='/Profile' element={<Profile/>}></Route>
                <Route path='/Profilee' element={<Profilee/>}></Route>
                <Route path='/Pricing' element={<Pricing/>}></Route>
                <Route path='/UserHomePage/NewPrice' element={<NewPrice></NewPrice>}></Route>
                <Route path='/UserHomePage/NewPrice/Payment1' element={<Payment1></Payment1>}></Route>
                <Route path='/UserHomePage/NewPrice/Payment2' element={<Payment2></Payment2>}></Route>
                <Route path='/main' element={<UserHome2></UserHome2>}></Route>
                <Route path='/Forgotten' element={<Forgotten></Forgotten>}></Route>
                <Route path='/UserHomePage/NewPrice/Payment3' element={<Payment3></Payment3>}></Route>
                <Route path='/ResetPassword/:token' element={<ResetPassword></ResetPassword>}></Route>
            </Routes>     
    )
    
}
export default App;