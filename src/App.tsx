import { useState } from "react";
import ContentContainer from "./content-container";
import MainContainer from "./Main-Container";
import SideMenu from "./side-menu/Side-Menu";
import NavBar from "./nav-bar";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [hideSideMenu, setHideSideMenu] = useState<boolean>(true);

  return (
    <MainContainer>
      <div className="hidden lg:flex lg:w-82">
        <div className="fixed">
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
        <div className="grid min-w-0 flex-1 h-full w-full  ">
          <div className="row-start-1 col-start-1 h-300">Hello</div>
          <div className="row-start-1 col-start-1 bg-black/40 flex"></div>
        </div>
      </ContentContainer>
    </MainContainer>
  );
}

export default App;
