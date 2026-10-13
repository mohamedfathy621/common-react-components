import { useCallback, useState } from "react";
import ContentContainer from "./content-container";
import MainContainer from "./Main-Container";
import SideMenu from "./side-menu/Side-Menu";
import NavBar from "./nav-bar";
import "react-datepicker/dist/react-datepicker.css";
import CommonDialouge from "./common-dialouge";
import type { ITestingRequests } from "./Logic/interfaces/ITestingRequests";
import DI from "./DI";
import SearchBar from "./search-bar";

function App() {
  const sendTestRequest: ITestingRequests = DI.resolve("ITestRequest");
  const [hideSideMenu, setHideSideMenu] = useState<boolean>(true);
  const [showDialouge, setShowDialouge] = useState<boolean>(false);
  const [searchChoice, setSearchChoice] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const loadUsers = useCallback(
    async (search: string): Promise<{ name: string; id: string }[]> => {
      const response = await sendTestRequest.fetchUsers(search);
      return response;
    },
    [sendTestRequest],
  );

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
          <div className="row-start-1 col-start-1 h-300 z-10 p-8">
            <div className="flex flex-col w-1/5 relative">
              <SearchBar
                searchFunction={loadUsers}
                choice={searchChoice}
                setChoice={setSearchChoice}
                label="Test Search"
              ></SearchBar>
            </div>
          </div>
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
