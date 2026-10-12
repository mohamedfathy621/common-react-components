import { useState } from "react";
import ContentContainer from "./content-container";
import MainContainer from "./Main-Container";
import SideMenu from "./side-menu/Side-Menu";
import NavBar from "./nav-bar";

function App() {
  const [hideSideMenu, setHideSideMenu] = useState(true);
  return (
    <MainContainer>
      <div className="hidden lg:flex">
        <SideMenu
          hideSideMenu={false}
          animated={false}
          links={[
            {
              url: "/Home",
              name: "Home",
              icon: "bx bxs-home",
              subLinks: [
                { url: "/Home/Hotel", name: "Hotel", icon: "bx bx-home-alt" },
              ],
            },
          ]}
        ></SideMenu>
      </div>
      <div className="flex lg:hidden">
        <SideMenu
          animated={true}
          hideSideMenu={hideSideMenu}
          links={[
            {
              url: "/Home",
              name: "Home",
              icon: "bx bxs-home",
              subLinks: [
                { url: "/Home/Hotel", name: "Hotel", icon: "bx bx-home-alt" },
              ],
            },
          ]}
        ></SideMenu>
      </div>

      <ContentContainer
        dimTheLights={!hideSideMenu}
        onClick={() => {
          setHideSideMenu(true);
        }}
      >
        <NavBar
          hideSideMenu={hideSideMenu}
          setHideSideMenu={setHideSideMenu}
        ></NavBar>
      </ContentContainer>
    </MainContainer>
  );
}

export default App;
