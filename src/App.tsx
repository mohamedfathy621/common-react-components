import { useState } from "react";
import ContentContainer from "./containers/content-container";
import MainContainer from "./containers/Main-Container";
import SideMenu from "./side-menu/Side-Menu";
import NavBar from "./nav-bar/nav-bar";
import "react-datepicker/dist/react-datepicker.css";
import CommonDialouge from "./common-components/common-dialouge";
import NotificationContainer from "./containers/notification-container";

function App() {
  const [hideSideMenu, setHideSideMenu] = useState<boolean>(true);
  const [showDialouge, setShowDialouge] = useState<boolean>(false);

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
        <NotificationContainer right={true} top={true}>
          <div className="w-50 h-30 border border-slate-300 bg-white rounded-xl"></div>
          <div className="w-50 h-30 border border-slate-300 bg-white rounded-xl"></div>
        </NotificationContainer>

        <NavBar
          hideSideMenu={hideSideMenu}
          setHideSideMenu={setHideSideMenu}
        ></NavBar>
        <div className="grid min-w-0 flex-1 h-full w-full  ">
          <div className="row-start-1 col-start-1 h-300 z-10 p-8"></div>
          <CommonDialouge
            showDialouge={showDialouge}
            closeDialouge={() => setShowDialouge(false)}
          ></CommonDialouge>
        </div>
      </ContentContainer>
    </MainContainer>
  );
}

export default App;
