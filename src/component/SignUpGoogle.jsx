import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from "react-router-dom";

function SignUpGoogle() {
  const [userr, setUser] = useState({});
  const location = useLocation(); 
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log("/",userObject);
    setUser(userObject);
    console.log("--",userr)

    document.getElementById("signinDiv").hidden = true;
    // Redirect to UserHomePage
    const goToUserHome = () => {
      navigate('/UserHomePage',{ state: {user:  userObject} });
    };
    goToUserHome(userObject);
  }

  function handleSignOut() {
    setUser({name: "signed out"});
    document.getElementById("signinDiv").hidden = false;
  }


  useEffect(() => {
    /* Global Google From index.html */
    google.accounts.id.initialize({
      client_id: "57700588816-adotfaoq3r96dvukkqejkic6l4jn5o11.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div>
      <div id="signinDiv"></div>
      {(location.pathname === "/UserHomePage" || Object.keys(userr).length !== 0) && (
        <div>
          <img src={userr.picture} alt="User"/>
          <h2>{userr.name}</h2>
        </div>
      )}

      {Object.keys(userr).length !== 0 && (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          {/* No need for a separate button, auto-redirect is added in handleCallbackResponse */}
        </>
      )}
    </div>
  );
}

export default SignUpGoogle;
