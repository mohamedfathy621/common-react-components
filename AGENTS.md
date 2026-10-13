# AGENTS.md — AI Agent Integration & Usage Manual

> **Purpose**: This file provides all instructions, prop signatures, architectural rules, and code recipes needed for AI coding agents to immediately use, integrate, and extend components from this library across projects without rereading source files.

---

## 1. Technology Stack & Key Dependencies

| Concern | Library / Tool | Important Note |
| :--- | :--- | :--- |
| **Framework** | `react` 19.x, `react-dom` 19.x | Strict Mode compatible |
| **Styling** | `tailwindcss` 4.x (`@tailwindcss/vite`) | Brand colors: `#1E104E`, `#450693` |
| **Animation** | `motion` 14.x (`motion/react`) | **CRITICAL**: Import from `motion/react`, **NEVER** `framer-motion` |
| **Routing** | `react-router` 7.x | **CRITICAL**: Import from `react-router`, **NOT** `react-router-dom` |
| **Date Picker** | `react-datepicker` 9.x | Include `react-datepicker/dist/react-datepicker.css` |
| **Icons** | Boxicons 2.1.4 | CSS class syntax: `bx bx-<name>` or `bx bxs-<name>` |
| **Dependency Injection** | `typed-inject` 5.x | Constructor injection with `public static inject` |

---

## 2. Component Quick Reference

### 2.1. Layout Containers
- **[`MainContainer`](file:///G:/common-components/common-layout-components/src/Main-Container.tsx)**:
  - Import: `import MainContainer from "./Main-Container";`
  - Props: `{ children: React.ReactNode; onClick?: () => void }`
- **[`ContentContainer`](file:///G:/common-components/common-layout-components/src/content-container.tsx)**:
  - Import: `import ContentContainer from "./content-container";`
  - Props: `{ children: React.ReactNode; dimTheLights: boolean; onClick?: () => void }`
  - Behavior: Applies `bg-black/50` dimming layer on mobile screens when `dimTheLights` is `true`.

### 2.2. Navigation
- **[`SideMenu`](file:///G:/common-components/common-layout-components/src/side-menu/Side-Menu.tsx)**:
  - Import: `import SideMenu from "./side-menu/Side-Menu";`
  - Props:
    ```typescript
    interface SideMenuProps {
      hideSideMenu: boolean;
      links: CommonNavaigationLink[]; // from "./Models/CommonModels"
      animated: boolean; // true for mobile drawer, false for desktop
    }
    ```
  - Data Structure (`CommonNavaigationLink`):
    ```typescript
    {
      name: string;
      url: string;
      icon: string; // e.g. "bx bxs-home"
      subLinks?: { name: string; url: string; icon: string }[];
    }
    ```
  - Requirement: Must be inside a React Router provider (`BrowserRouter`) due to `useMatch` and `useNavigate`.

- **[`NavBar`](file:///G:/common-components/common-layout-components/src/nav-bar.tsx)**:
  - Import: `import NavBar from "./nav-bar";`
  - Props:
    ```typescript
    interface NavBarProps {
      hideSideMenu: boolean;
      setHideSideMenu: (value: React.SetStateAction<boolean>) => void;
      leftSection?: React.ReactNode;
      middleSection?: React.ReactNode;
      rightSection?: React.ReactNode;
    }
    ```

### 2.3. Form Inputs & Search
- **[`CommonInputField`](file:///G:/common-components/common-layout-components/src/common-input-field.tsx)**:
  - Import: `import CommonInputField from "./common-input-field";`
  - Discriminated Union Props:
    - Base: `label: string`, `id: string`, `placeHolder?: string`, `icon?: string`, `loading?: boolean`, `locked?: boolean`, `unlock?: () => void`
    - `"text"` | `"text-box"`: `value: string`, `setValue: Dispatch<SetStateAction<string>>`
    - `"number"`: `value: number`, `setValue: Dispatch<SetStateAction<number>>`
    - `"date"`: `value: Date | null`, `setValue: Dispatch<SetStateAction<Date | null>>`
    - `"check"`: `value: boolean`, `setValue: Dispatch<SetStateAction<boolean>>`

- **[`SearchBar`](file:///G:/common-components/common-layout-components/src/search-bar.tsx)** (Acts as **Search Bar** & **Lookup Field**):
  - Import: `import SearchBar from "./search-bar";`
  - Props:
    ```typescript
    interface SearchBarProps {
      label: string;
      searchFunction: (search: string) => Promise<{ name: string; id: string }[]>;
      choice: { name: string; id: string } | null;
      setChoice: Dispatch<SetStateAction<{ name: string; id: string } | null>>;
    }
    ```
  - Behavior: Internal debounce of 1000ms triggers when input string length >= 3. Setting `choice` locks the input until `unlock` is clicked.

### 2.4. Actions & Overlays
- **[`CommonButton`](file:///G:/common-components/common-layout-components/src/common-button.tsx)**:
  - Import: `import CommonButton from "./common-button";`
  - Props:
    ```typescript
    interface CommonButtonProps {
      type: "primary" | "secondary" | "dark" | "light" | "cancel";
      size: "full" | "basic";
      children: React.ReactNode;
      onClick: () => void;
    }
    ```

- **[`CommonDialouge`](file:///G:/common-components/common-layout-components/src/common-dialouge.tsx)**:
  - Import: `import CommonDialouge from "./common-dialouge";`
  - Props:
    ```typescript
    interface CommonDialougeProps {
      showDialouge: boolean;
      closeDialouge: () => void;
      sizeType?: "small" | "basic" | "medium" | "large"; // Default: "medium"
    }
    ```

- **[`CommonAnimationWrapper`](file:///G:/common-components/common-layout-components/src/common-animation-wrapper.tsx)**:
  - Import: `import CommonAnimationWrapper from "./common-animation-wrapper";`
  - Props:
    ```typescript
    interface CommonAnimationWrapper {
      children: React.ReactNode;
      condition?: boolean; // Default: true
      fade?: boolean;      // Default: true
      scaleOnX?: boolean;
      scaleOnY?: boolean;
      slideOnX?: boolean;
      slideOnY?: boolean;
    }
    ```

### 2.5. Dependency Injection (`typed-inject`)
- **Container**: `import DI from "./DI";`
- Resolving: `const service: ITestingRequests = DI.resolve("ITestRequest");`

---

## 3. Mandatory Implementation Recipes

### Recipe 1: Standard Application Layout Shell
```tsx
import { useState } from "react";
import MainContainer from "./Main-Container";
import ContentContainer from "./content-container";
import SideMenu from "./side-menu/Side-Menu";
import NavBar from "./nav-bar";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [hideSideMenu, setHideSideMenu] = useState<boolean>(true);

  return (
    <MainContainer>
      {/* Desktop Column */}
      <div className="hidden lg:flex lg:w-82">
        <div className="fixed">
          <SideMenu
            hideSideMenu={false}
            animated={false}
            links={[
              { url: "/dashboard", name: "Dashboard", icon: "bx bxs-dashboard" },
              {
                url: "/management",
                name: "Management",
                icon: "bx bx-grid-alt",
                subLinks: [{ url: "/management/users", name: "Users", icon: "bx bx-user" }],
              },
            ]}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="flex lg:hidden">
        <SideMenu
          hideSideMenu={hideSideMenu}
          animated={true}
          links={[
            { url: "/dashboard", name: "Dashboard", icon: "bx bxs-dashboard" },
            {
              url: "/management",
              name: "Management",
              icon: "bx bx-grid-alt",
              subLinks: [{ url: "/management/users", name: "Users", icon: "bx bx-user" }],
            },
          ]}
        />
      </div>

      {/* Content Area */}
      <ContentContainer
        dimTheLights={!hideSideMenu}
        onClick={() => setHideSideMenu(true)}
      >
        <NavBar hideSideMenu={hideSideMenu} setHideSideMenu={setHideSideMenu} />
        <div className="p-8">{children}</div>
      </ContentContainer>
    </MainContainer>
  );
}
```

---

### Recipe 2: Lookup Field with Debounced Search
```tsx
import { useCallback, useState } from "react";
import SearchBar from "./search-bar";
import DI from "./DI";
import type { ITestingRequests } from "./Logic/interfaces/ITestingRequests";

export function LookupFieldUsage() {
  const [choice, setChoice] = useState<{ id: string; name: string } | null>(null);
  const testRequest: ITestingRequests = DI.resolve("ITestRequest");

  const searchUsers = useCallback(
    async (term: string) => {
      const results = await testRequest.fetchUsers(term);
      return results.map((r) => ({ id: r.id, name: r.name }));
    },
    [testRequest]
  );

  return (
    <div className="w-72 relative">
      <SearchBar
        label="Select User"
        searchFunction={searchUsers}
        choice={choice}
        setChoice={setChoice}
      />
    </div>
  );
}
```

---

### Recipe 3: Modal Dialog Over Page Grid
```tsx
import { useState } from "react";
import CommonDialouge from "./common-dialouge";
import CommonButton from "./common-button";

export function ModalHost() {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid min-w-0 flex-1 h-full w-full">
      {/* Page Content */}
      <div className="row-start-1 col-start-1 p-8">
        <CommonButton type="primary" size="basic" onClick={() => setOpen(true)}>
          Open Modal
        </CommonButton>
      </div>

      {/* Dialog Overlay */}
      <CommonDialouge
        showDialouge={open}
        closeDialouge={() => setOpen(false)}
        sizeType="medium"
      />
    </div>
  );
}
```

---

### Recipe 4: Registering a New DI Service
1. Create interface in `src/Logic/interfaces/IMyService.ts`:
   ```typescript
   export interface IMyService {
     getData(): Promise<string[]>;
   }
   ```
2. Implement class in `src/Logic/services/MyService.ts`:
   ```typescript
   import type { ISendRequest } from "../interfaces/ISendRequests";
   import type { IMyService } from "../interfaces/IMyService";

   export class MyService implements IMyService {
     public static inject = ["ISendRequest"] as const;
     constructor(private api: ISendRequest) {}

     async getData() {
       const res = await this.api.sendRestAPIRequest<string[]>("GET", "http://localhost:3000/data");
       return res.data;
     }
   }
   ```
3. Register into `src/DI.ts`:
   ```typescript
   import { MyService } from "./Logic/services/MyService";

   // inside constructor:
   this.Injector = createInjector()
     .provideClass("ISendRequest", Axios)
     .provideClass("ITestRequest", TestRequest)
     .provideClass("IMyService", MyService);
   ```

---

## 4. Agent Rules & Invariants (Must Follow)

1. **NEVER import from `framer-motion`**:
   Use `import { motion, AnimatePresence } from "motion/react";`.
2. **NEVER import from `react-router-dom`**:
   Use `import { useNavigate, useMatch, BrowserRouter } from "react-router";`.
3. **Lookup & Search Bar are identical**:
   Component 6 (Lookup) and Component 7 (Search Bar) are both implemented via [`src/search-bar.tsx`](file:///G:/common-components/common-layout-components/src/search-bar.tsx). Do not create a separate lookup component; use `SearchBar` with `choice` and `setChoice`.
4. **Always provide matching state types for `CommonInputField`**:
   - `type="text"` or `type="text-box"` -> `string`
   - `type="number"` -> `number`
   - `type="date"` -> `Date | null`
   - `type="check"` -> `boolean`
5. **Always wrap `SideMenu` inside router context**:
   `SideMenuOption` calls `useMatch()` and `useNavigate()`, which will throw an error if mounted outside `<BrowserRouter>`.
6. **Dual SideMenu layout requirement**:
   Always mount desktop menu with `hidden lg:flex` and `animated={false}`, alongside mobile menu with `flex lg:hidden` and `animated={true}`.
