# Usage Examples & Prop Guide

This document contains copy-pasteable, production-ready TypeScript React examples demonstrating how to use every component and configure their props.

---

## Table of Contents
1. [Full Application Layout Scaffold](#1-full-application-layout-scaffold)
2. [Form Input Fields (All Variants)](#2-form-input-fields-all-variants)
3. [Buttons (All Themes & Sizes)](#3-buttons-all-themes--sizes)
4. [Dialog / Modal Windows](#4-dialog--modal-windows)
5. [Async Search Bar & Lookup Field](#5-async-search-bar--lookup-field)
6. [Composable Animation Wrapper](#6-composable-animation-wrapper)
7. [Extending & Consuming Dependency Injection](#7-extending--consuming-dependency-injection)

---

## 1. Full Application Layout Scaffold

This example demonstrates how to wire [`MainContainer`](file:///G:/common-components/common-layout-components/src/Main-Container.tsx), [`SideMenu`](file:///G:/common-components/common-layout-components/src/side-menu/Side-Menu.tsx), [`NavBar`](file:///G:/common-components/common-layout-components/src/nav-bar.tsx), and [`ContentContainer`](file:///G:/common-components/common-layout-components/src/content-container.tsx) together with responsive mobile drawer support and route matching.

```tsx
import React, { useState } from "react";
import MainContainer from "./Main-Container";
import ContentContainer from "./content-container";
import SideMenu from "./side-menu/Side-Menu";
import NavBar from "./nav-bar";
import type { CommonNavaigationLink } from "./Models/CommonModels";

const navigationLinks: CommonNavaigationLink[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "bx bxs-dashboard",
  },
  {
    name: "Inventory",
    url: "/inventory",
    icon: "bx bx-package",
    subLinks: [
      { name: "Products", url: "/inventory/products", icon: "bx bx-list-ul" },
      { name: "Categories", url: "/inventory/categories", icon: "bx bx-category" },
    ],
  },
  {
    name: "Settings",
    url: "/settings",
    icon: "bx bx-cog",
  },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [hideSideMenu, setHideSideMenu] = useState<boolean>(true);

  return (
    <MainContainer>
      {/* 1. Desktop Persistent SideMenu */}
      <div className="hidden lg:flex lg:w-82">
        <div className="fixed">
          <SideMenu
            hideSideMenu={false}
            animated={false}
            links={navigationLinks}
          />
        </div>
      </div>

      {/* 2. Mobile Animated Drawer SideMenu */}
      <div className="flex lg:hidden">
        <SideMenu
          hideSideMenu={hideSideMenu}
          animated={true}
          links={navigationLinks}
        />
      </div>

      {/* 3. Main Content Container with Backdrop Dimmer */}
      <ContentContainer
        dimTheLights={!hideSideMenu}
        onClick={() => setHideSideMenu(true)}
      >
        <NavBar
          hideSideMenu={hideSideMenu}
          setHideSideMenu={setHideSideMenu}
          leftSection={<h1 className="font-bold text-lg my-auto">My Admin Portal</h1>}
          rightSection={
            <div className="ml-auto flex items-center gap-3">
              <i className="bx bx-bell text-xl cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-[#1E104E] text-white flex items-center justify-center text-sm font-semibold">
                JD
              </div>
            </div>
          }
        />
        <div className="p-8">{children}</div>
      </ContentContainer>
    </MainContainer>
  );
}
```

---

## 2. Form Input Fields (All Variants)

Demonstrates every polymorphic variant of [`CommonInputField`](file:///G:/common-components/common-layout-components/src/common-input-field.tsx) including regular text, textarea, number, date picker, checkbox, loading, and locked states.

```tsx
import React, { useState } from "react";
import CommonInputField from "./common-input-field";

export function FormExample() {
  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [age, setAge] = useState<number>(25);
  const [birthDate, setBirthDate] = useState<Date | null>(new Date());
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [lockedField, setLockedField] = useState<string>("Pre-filled Locked Value");
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-6 max-w-md bg-white p-6 rounded-2xl border border-gray-200">
      {/* Text Input with Icon */}
      <CommonInputField
        type="text"
        id="full-name"
        label="Full Name"
        placeHolder="e.g. John Doe"
        icon="bx bx-user"
        value={fullName}
        setValue={setFullName}
      />

      {/* Multi-line Text Area (text-box) */}
      <CommonInputField
        type="text-box"
        id="bio"
        label="Biography"
        placeHolder="Tell us about yourself..."
        value={bio}
        setValue={setBio}
      />

      {/* Number Input */}
      <CommonInputField
        type="number"
        id="age"
        label="Age"
        placeHolder="Enter your age"
        value={age}
        setValue={setAge}
      />

      {/* Date Picker */}
      <CommonInputField
        type="date"
        id="dob"
        label="Date of Birth"
        placeHolder="Select date"
        value={birthDate}
        setValue={setBirthDate}
      />

      {/* Checkbox */}
      <CommonInputField
        type="check"
        id="remember-me"
        label="Remember Me"
        value={rememberMe}
        setValue={setRememberMe}
      />

      {/* Input in Loading State */}
      <CommonInputField
        type="text"
        id="loading-field"
        label="Loading Input"
        placeHolder="Fetching data..."
        loading={isLoading}
        value=""
        setValue={() => {}}
      />

      {/* Input in Locked State with Unlock Action */}
      <CommonInputField
        type="text"
        id="locked-field"
        label="Locked Field"
        value={lockedField}
        setValue={setLockedField}
        locked={isLocked}
        unlock={() => setIsLocked(false)}
      />
    </div>
  );
}
```

---

## 3. Buttons (All Themes & Sizes)

Demonstrates all styling themes and sizes available in [`CommonButton`](file:///G:/common-components/common-layout-components/src/common-button.tsx).

```tsx
import React from "react";
import CommonButton from "./common-button";

export function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-4 max-w-lg p-6 bg-white rounded-xl">
      <h2 className="text-lg font-bold">Standard Size Buttons</h2>
      <div className="flex flex-wrap gap-3">
        <CommonButton type="primary" size="basic" onClick={() => alert("Primary clicked")}>
          Primary
        </CommonButton>

        <CommonButton type="secondary" size="basic" onClick={() => alert("Secondary clicked")}>
          Secondary
        </CommonButton>

        <CommonButton type="dark" size="basic" onClick={() => alert("Dark clicked")}>
          Dark
        </CommonButton>

        <CommonButton type="light" size="basic" onClick={() => alert("Light clicked")}>
          Light
        </CommonButton>

        <CommonButton type="cancel" size="basic" onClick={() => alert("Cancel clicked")}>
          Cancel
        </CommonButton>
      </div>

      <h2 className="text-lg font-bold mt-4">Full Width Button</h2>
      <CommonButton type="primary" size="full" onClick={() => alert("Submitted!")}>
        Submit Application (Full Width)
      </CommonButton>
    </div>
  );
}
```

---

## 4. Dialog / Modal Windows

Demonstrates launching [`CommonDialouge`](file:///G:/common-components/common-layout-components/src/common-dialouge.tsx) with size presets and the layered grid overlay pattern.

```tsx
import React, { useState } from "react";
import CommonDialouge from "./common-dialouge";
import CommonButton from "./common-button";

export function ModalExample() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [size, setSize] = useState<"small" | "basic" | "medium" | "large">("medium");

  return (
    <div className="grid min-w-0 flex-1 h-full w-full">
      {/* 1. Underlying Page Layer */}
      <div className="row-start-1 col-start-1 p-8 flex flex-col gap-4">
        <h1 className="text-xl font-bold">Dialog Trigger Gallery</h1>
        <div className="flex gap-3">
          <CommonButton
            type="primary"
            size="basic"
            onClick={() => { setSize("small"); setIsOpen(true); }}
          >
            Open Small Dialog
          </CommonButton>

          <CommonButton
            type="secondary"
            size="basic"
            onClick={() => { setSize("medium"); setIsOpen(true); }}
          >
            Open Medium Dialog
          </CommonButton>

          <CommonButton
            type="dark"
            size="basic"
            onClick={() => { setSize("large"); setIsOpen(true); }}
          >
            Open Large Dialog
          </CommonButton>
        </div>
      </div>

      {/* 2. Dialog Modal Overlay Layer */}
      <CommonDialouge
        showDialouge={isOpen}
        closeDialouge={() => setIsOpen(false)}
        sizeType={size}
      />
    </div>
  );
}
```

---

## 5. Async Search Bar & Lookup Field

Demonstrates integrating [`SearchBar`](file:///G:/common-components/common-layout-components/src/search-bar.tsx) with the dependency injection service to search for users, display live debounced results, and lock selection.

```tsx
import React, { useCallback, useState } from "react";
import SearchBar from "./search-bar";
import DI from "./DI";
import type { ITestingRequests } from "./Logic/interfaces/ITestingRequests";

export function UserLookupExample() {
  // Resolve service through typed-inject DI
  const testRequest: ITestingRequests = DI.resolve("ITestRequest");

  // Selected state for the lookup field
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);

  // Search function callback passed to SearchBar
  const handleUserSearch = useCallback(
    async (searchTerm: string): Promise<{ id: string; name: string }[]> => {
      const users = await testRequest.fetchUsers(searchTerm);
      return users.map((u) => ({ id: u.id, name: `${u.name} (${u.email})` }));
    },
    [testRequest]
  );

  return (
    <div className="w-80 flex flex-col gap-4 relative">
      <SearchBar
        label="Lookup Customer"
        searchFunction={handleUserSearch}
        choice={selectedUser}
        setChoice={setSelectedUser}
      />

      {selectedUser && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-sm">
          Selected User ID: <strong>{selectedUser.id}</strong> — Name: <strong>{selectedUser.name}</strong>
        </div>
      )}
    </div>
  );
}
```

---

## 6. Composable Animation Wrapper

Demonstrates combining fade, scaling, and sliding transitions using [`CommonAnimationWrapper`](file:///G:/common-components/common-layout-components/src/common-animation-wrapper.tsx).

```tsx
import React, { useState } from "react";
import CommonAnimationWrapper from "./common-animation-wrapper";
import CommonButton from "./common-button";

export function AnimationShowcase() {
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-4">
        <CommonButton
          type="primary"
          size="basic"
          onClick={() => setShowNotification((prev) => !prev)}
        >
          Toggle Dropdown Banner
        </CommonButton>

        <CommonButton
          type="secondary"
          size="basic"
          onClick={() => setShowDrawer((prev) => !prev)}
        >
          Toggle Slide Panel
        </CommonButton>
      </div>

      {/* 1. Dropdown Expand: Vertical Scale + Fade */}
      <CommonAnimationWrapper condition={showNotification} fade={true} scaleOnY={true}>
        <div className="p-4 bg-indigo-100 border border-indigo-300 rounded-xl text-indigo-900">
          <strong>Notification:</strong> This banner scales along the Y-axis while fading in/out.
        </div>
      </CommonAnimationWrapper>

      {/* 2. Slide Drawer: Horizontal Slide + Fade */}
      <CommonAnimationWrapper condition={showDrawer} fade={true} slideOnX={true}>
        <div className="p-4 bg-amber-100 border border-amber-300 rounded-xl text-amber-900">
          <strong>Flyout Panel:</strong> This panel slides horizontally from the left.
        </div>
      </CommonAnimationWrapper>
    </div>
  );
}
```

---

## 7. Extending & Consuming Dependency Injection

### Step 1: Define Interface
Create [`src/Logic/interfaces/IProductService.ts`](file:///G:/common-components/common-layout-components/src/Logic/interfaces/ISendRequests.ts):
```typescript
export interface IProductService {
  getProducts(): Promise<{ id: string; name: string; price: number }[]>;
}
```

### Step 2: Implement Class with Constructor Injection
Create `src/Logic/services/ProductService.ts`:
```typescript
import type { ISendRequest } from "../interfaces/ISendRequests";
import type { IProductService } from "../interfaces/IProductService";

export class ProductService implements IProductService {
  public static inject = ["ISendRequest"] as const;

  constructor(private client: ISendRequest) {}

  async getProducts() {
    const res = await this.client.sendRestAPIRequest<{ id: string; name: string; price: number }[]>(
      "GET",
      "http://localhost:3000/products"
    );
    return res.data;
  }
}
```

### Step 3: Register in `src/DI.ts`
```typescript
import { createInjector } from "typed-inject";
import Axios from "./Logic/services/Axios";
import { TestRequest } from "./Logic/services/testRequests";
import { ProductService } from "./Logic/services/ProductService";

class DIcontainer {
  public Injector;

  constructor() {
    this.Injector = createInjector()
      .provideClass("ISendRequest", Axios)
      .provideClass("ITestRequest", TestRequest)
      .provideClass("IProductService", ProductService);
  }
}

const appinjector = new DIcontainer().Injector;
export default appinjector;
```

### Step 4: Resolve in React Component
```tsx
import React, { useEffect, useState } from "react";
import DI from "./DI";
import type { IProductService } from "./Logic/interfaces/IProductService";

export function ProductsList() {
  const [products, setProducts] = useState<{ id: string; name: string; price: number }[]>([]);

  useEffect(() => {
    const service: IProductService = DI.resolve("IProductService");
    service.getProducts().then(setProducts);
  }, []);

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} - ${p.price}</li>
      ))}
    </ul>
  );
}
```
