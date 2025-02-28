import "./App.css";
import Navbarmain from "./Components/Navbar/Navbarmain";
import { useEffect, useState } from "react";
import Allroutes from "./Routes/Allroutes";
import Footer from "./Components/Footer";
import LoginModal from "./SignUpLogin/Login";
import SignupModal from "./SignUpLogin/Signup";

function App() {
  const [activeModal, setActiveModal] = useState(null); // Only one modal state
  const [loggedInVendor, setLoggedInVendor] = useState(null);

  useEffect(() => {
    document.title = "LIME ROAD";
  
    const storedVendor = localStorage.getItem("vendor");
    if (storedVendor) {
      setLoggedInVendor(storedVendor);
    }
  }, []);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar (Include buttons to open Login & Signup) */}
      <Navbarmain onOpenLogin={() => setActiveModal("login")} />

      {/* Main content area (Routes) */}
      <div style={{ flex: 1 }}>
      <Allroutes loggedInVendor={loggedInVendor} />
        
      </div>

      {/* Footer */}
      <Footer />

      {/* Conditional Rendering for One Modal at a Time */}
      {activeModal === "login" && (
        <LoginModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onOpenSignup={() => setActiveModal("signup")}
        />
      )}

      {activeModal === "signup" && (
        <SignupModal isOpen={true} onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}

export default App;
