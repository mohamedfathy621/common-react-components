import ContentContainer from "./content-container";
import MainContainer from "./Main-Container";
import SideMenu from "./side-menu/Side-Menu";

function App() {
  return (
    <MainContainer>
      <SideMenu
        hideSideMenu={true}
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
      <ContentContainer>
        <h1 className="text-4xl"> Hello World</h1>
      </ContentContainer>
    </MainContainer>
  );
}

export default App;
