# Component Catalog & API Reference

This document provides a comprehensive reference for all reusable layout and UI components, containers, and dependency injection services available in this repository.

---

## Table of Contents
1. [Layout & Container Components](#1-layout--container-components)
   - [MainContainer](#maincontainer)
   - [ContentContainer](#contentcontainer)
2. [Navigation Components](#2-navigation-components)
   - [SideMenu System (SideMenu, SideMenuOptionWrapper, SideMenuOption)](#sidemenu-system)
   - [NavBar](#navbar)
3. [Form & Data Entry Components](#3-form--data-entry-components)
   - [CommonInputField](#commoninputfield)
   - [SearchBar & Lookup Field](#searchbar--lookup-field)
4. [Action & Overlay Components](#4-action--overlay-components)
   - [CommonButton](#commonbutton)
   - [CommonDialouge](#commondialouge)
5. [Animation Utilities](#5-animation-utilities)
   - [CommonAnimationWrapper](#commonanimationwrapper)
6. [Dependency Injection & Logic Layer](#6-dependency-injection--logic-layer)
   - [DI Container (`appinjector`)](#di-container-appinjector)
   - [Interfaces & Services](#interfaces--services)

---

## 1. Layout & Container Components

### MainContainer
- **Source File**: [`src/Main-Container.tsx`](file:///G:/common-components/common-layout-components/src/Main-Container.tsx)
- **Export**: Default [`MainContainer`](file:///G:/common-components/common-layout-components/src/Main-Container.tsx#L8-L14)
- **Role**: Top-level layout container wrapping the entire application view. Sets flex row alignment and base typography (`Poppins`).

#### Props
| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | Yes | Layout children (typically `SideMenu` and `ContentContainer`). |
| `onClick` | `() => void` | No | Optional click handler on the container root. |

---

### ContentContainer
- **Source File**: [`src/content-container.tsx`](file:///G:/common-components/common-layout-components/src/content-container.tsx)
- **Export**: Default [`ContentContainer`](file:///G:/common-components/common-layout-components/src/content-container.tsx#L9-L22)
- **Role**: Main view viewport wrapper. Houses the top navigation bar and dynamic page content. Handles responsive backdrop dimming when the mobile side menu is open.

#### Props
| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | Yes | Main body content including `NavBar` and page elements. |
| `dimTheLights` | `boolean` | Yes | When `true` on mobile, applies `bg-black/50` to dim background content while the drawer is open. |
| `onClick` | `() => void` | No | Click handler on the backdrop (used to close mobile drawer when clicking outside). |

#### Visual Styling
- Uses Tailwind CSS 4 gradient background: `bg-linear-to-b from-[#F8FAFC] to-[#EFF6FF]`.
- Forces minimum full viewport height (`min-h-screen`).

---

## 2. Navigation Components

### SideMenu System
- **Source Files**:
  - Root: [`src/side-menu/Side-Menu.tsx`](file:///G:/common-components/common-layout-components/src/side-menu/Side-Menu.tsx)
  - Wrapper: [`src/side-menu/Side-Menu-Option-Wrapper.tsx`](file:///G:/common-components/common-layout-components/src/side-menu/Side-Menu-Option-Wrapper.tsx)
  - Item: [`src/side-menu/Side-Menu-Option.tsx`](file:///G:/common-components/common-layout-components/src/side-menu/Side-Menu-Option.tsx)
  - Model: [`src/Models/CommonModels.ts`](file:///G:/common-components/common-layout-components/src/Models/CommonModels.ts)
- **Exports**: Default [`SideMenu`](file:///G:/common-components/common-layout-components/src/side-menu/Side-Menu.tsx#L11-L41)

#### Data Model: `CommonNavaigationLink`
```typescript
export interface CommonNavaigationLink {
  name: string;
  url: string;
  icon: string; // Boxicons CSS class, e.g. "bx bxs-home"
  subLinks?: { name: string; url: string; icon: string }[];
}
```

#### `SideMenu` Props
| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `links` | `CommonNavaigationLink[]` | Yes | Array of navigation links and nested children. |
| `hideSideMenu` | `boolean` | Yes | Controls drawer visibility. |
| `animated` | `boolean` | Yes | Enables slide-in animation from `x: -100%` (set to `true` for mobile, `false` for desktop). |

#### Features & Behavior
- **Animation**: Wrapped in `motion/react` `AnimatePresence` and `motion.div`. Slides between `-100%` and `0` with a 0.2s duration.
- **Brand Theming**: Deep royal purple `#1E104E` background with white logo banner (`/horizontalWhite.png`).
- **Route Detection**: Utilizes React Router `useMatch(link.url)` and `useMatch(`${link.url}/*`)` to detect active pages and auto-expand sublink trees.
- **Active State**: Inverts color styling to `bg-white text-[#1E104E]` when active; expands parent-child chevron indicator (`bx bx-chevron-down` vs `bx bx-chevron-right`).

---

### NavBar
- **Source File**: [`src/nav-bar.tsx`](file:///G:/common-components/common-layout-components/src/nav-bar.tsx)
- **Export**: Default [`NavBar`](file:///G:/common-components/common-layout-components/src/nav-bar.tsx#L8-L31)
- **Role**: Top horizontal navigation header. Provides mobile drawer toggle trigger and slots for left, center, and right header controls.

#### Props
| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `hideSideMenu` | `boolean` | Yes | Current mobile drawer toggle state. |
| `setHideSideMenu` | `(value: React.SetStateAction<boolean>) => void` | Yes | State setter to toggle mobile menu visibility. |
| `leftSection` | `React.ReactNode` | No | Optional element slot placed next to the hamburger toggle. |
| `middleSection` | `React.ReactNode` | No | Optional element slot centered in header. |
| `rightSection` | `React.ReactNode` | No | Optional element slot right-aligned (actions, profile avatar, notifications). |

#### Features
- **Hamburger Button**: Displays `bx bx-menu` on viewports below `lg:`. Automatically hidden on desktop (`lg:invisible`).
- **Click Propagation**: Triggers `e.stopPropagation()` when toggling side menu to prevent accidental container click handlers from immediately closing it.

---

## 3. Form & Data Entry Components

### CommonInputField
- **Source File**: [`src/common-input-field.tsx`](file:///G:/common-components/common-layout-components/src/common-input-field.tsx)
- **Export**: Default [`CommonInputField`](file:///G:/common-components/common-layout-components/src/common-input-field.tsx#L38-L159)
- **Role**: Universal polymorphic form input supporting standard text, textarea (`text-box`), numeric values, date pickers, and custom styled checkboxes with loading and locked states.

#### Props (Discriminated Union)
All inputs share base configuration:
| Base Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique HTML element ID matching label `htmlFor`. |
| `label` | `string` | Yes | Field text label. |
| `placeHolder` | `string` | No | Placeholder text. |
| `icon` | `string` | No | Trailing Boxicons class (e.g. `"bx bx-user"`). |
| `loading` | `boolean` | No | Shows rotating CSS spinner inside the input when `true`. |
| `locked` | `boolean` | No | Disables input with dimmed background (`bg-black/30`) and reveals unlock close button. |
| `unlock` | `() => void` | No | Callback invoked when user clicks the unlock close icon (`bx bx-x`). |

#### Type-Specific Variants
| `type` | `value` | `setValue` | Rendered Element |
| :--- | :--- | :--- | :--- |
| `"text"` | `string` | `Dispatch<SetStateAction<string>>` | HTML `<input type="text" />` |
| `"text-box"` | `string` | `Dispatch<SetStateAction<string>>` | HTML `<textarea rows={4} />` |
| `"number"` | `number` | `Dispatch<SetStateAction<number>>` | HTML `<input type="number" />` |
| `"date"` | `Date \| null` | `Dispatch<SetStateAction<Date \| null>>` | `react-datepicker` (`dd/MM/yyyy`, clearable) |
| `"check"` | `boolean` | `Dispatch<SetStateAction<boolean>>` | Accessible circular checkbox with SVG checkmark |

---

### SearchBar & Lookup Field
- **Source File**: [`src/search-bar.tsx`](file:///G:/common-components/common-layout-components/src/search-bar.tsx)
- **Export**: Default [`SearchBar`](file:///G:/common-components/common-layout-components/src/search-bar.tsx#L13-L88)
- **Role**: Serves dual duty as both an asynchronous live Search Bar and a Lookup Field with selection locking.

#### Props
| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | Yes | Label displayed above search input. |
| `searchFunction` | `(search: string) => Promise<{ name: string; id: string }[]>` | Yes | Async search query resolver returning items with `id` and `name`. |
| `choice` | `{ name: string; id: string } \| null` | Yes | The currently selected entity, or `null`. |
| `setChoice` | `Dispatch<SetStateAction<{ name: string; id: string } \| null>>` | Yes | State dispatcher to store or clear selected choice. |

#### Operational Workflow
1. **Debounce Logic**: Waits for input string length `value.length >= 3`, activates spinner (`setLoading(true)`), and initiates debounced execution after `1000ms`.
2. **Animation**: Uses [`CommonAnimationWrapper`](file:///G:/common-components/common-layout-components/src/common-animation-wrapper.tsx) with vertical scale (`scaleOnY={true}`) and opacity fade to display dropdown results.
3. **Lookup Lock Mode**: Once an item is clicked:
   - `choice` is set to `{ id, name }`.
   - The embedded [`CommonInputField`](file:///G:/common-components/common-layout-components/src/common-input-field.tsx) enters `locked={true}` mode.
   - Clicking the lock `bx bx-x` icon calls `unlock={() => setChoice(null)}` to reset the selection.

---

## 4. Action & Overlay Components

### CommonButton
- **Source File**: [`src/common-button.tsx`](file:///G:/common-components/common-layout-components/src/common-button.tsx)
- **Export**: Default [`CommonButton`](file:///G:/common-components/common-layout-components/src/common-button.tsx#L8-L29)
- **Role**: Standard button supporting multiple color themes, responsive sizing, and interactive hover inversions.

#### Props
| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"primary" \| "secondary" \| "dark" \| "light" \| "cancel"` | Yes | Visual theme styling. |
| `size` | `"full" \| "basic"` | Yes | Sizing mode (`"full"` for `w-full`, `"basic"` for `w-fit min-w-24`). |
| `children` | `React.ReactNode` | Yes | Button label or nested JSX content. |
| `onClick` | `() => void` | Yes | Click event callback. |

#### Theme Palette
- `primary`: Background `#1E104E`, white text. Inverts to white with `#1E104E` border on hover.
- `secondary`: Background `#450693`, white text. Inverts to white with `#450693` border on hover.
- `dark`: Background `black`, white text. Inverts to white with black border on hover.
- `cancel`: Background `bg-rose-600`, white text. Inverts to white with rose border on hover.
- `light`: Background `bg-white`, `#450693` text with border.

---

### CommonDialouge
- **Source File**: [`src/common-dialouge.tsx`](file:///G:/common-components/common-layout-components/src/common-dialouge.tsx)
- **Export**: Default [`CommonDialouge`](file:///G:/common-components/common-layout-components/src/common-dialouge.tsx#L9-L59)
- **Role**: Animated modal dialog overlay with backdrop dimming and responsive centering.

#### Props
| Prop | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `showDialouge` | `boolean` | Yes | — | Controls open/close visibility state. |
| `closeDialouge` | `() => void` | Yes | — | Callback invoked when user clicks the dialog close icon. |
| `sizeType` | `"small" \| "basic" \| "medium" \| "large"` | No | `"medium"` | Viewport-relative modal sizing. |

#### Size Dimension Presets
| Preset | Width | Margin Offset |
| :--- | :--- | :--- |
| `"small"` | `w-[15vw]` | `ml-[34vw]` |
| `"basic"` | `w-[20vw]` | `ml-[30vw]` |
| `"medium"` | `w-[35vw]` | `ml-[24vw]` |
| `"large"` | `w-[60vw]` | `ml-[14vw]` |

*Note: Includes responsive fallback `min-w-[55vw] md:min-w-[35vw] lg:min-w-0` on mobile screens.*

---

## 5. Animation Utilities

### CommonAnimationWrapper
- **Source File**: [`src/common-animation-wrapper.tsx`](file:///G:/common-components/common-layout-components/src/common-animation-wrapper.tsx)
- **Export**: Default [`CommonAnimationWrapper`](file:///G:/common-components/common-layout-components/src/common-animation-wrapper.tsx#L12-L48)
- **Role**: Reusable wrapper powered by `motion/react` (`motion.div` & `AnimatePresence`) for composable entrance and exit transitions.

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | (Required) | The element to animate. |
| `condition` | `boolean` | `true` | Visibility condition controlling mounting/unmounting animation. |
| `fade` | `boolean` | `true` | When true, animates opacity (`0 -> 1 -> 0`). |
| `scaleOnX` | `boolean` | `false` | When true, animates horizontal scale (`scaleX: 0 -> 1 -> 0`). |
| `scaleOnY` | `boolean` | `false` | When true, animates vertical scale (`scaleY: 0 -> 1 -> 0`). |
| `slideOnX` | `boolean` | `false` | When true, slides horizontally along X axis (`x: -100% -> 0 -> -100%`). |
| `slideOnY` | `boolean` | `false` | When true, slides vertically along Y axis (`y: -200% -> 0 -> -100%`). |

---

## 6. Dependency Injection & Logic Layer

### DI Container (`appinjector`)
- **Source File**: [`src/DI.ts`](file:///G:/common-components/common-layout-components/src/DI.ts)
- **Library**: `typed-inject`
- **Export**: Default singleton `appinjector`

#### Registered Tokens
1. `"ISendRequest"`: Resolves to class [`Axios`](file:///G:/common-components/common-layout-components/src/Logic/services/Axios.ts).
2. `"ITestRequest"`: Resolves to class [`TestRequest`](file:///G:/common-components/common-layout-components/src/Logic/services/testRequests.ts) with constructor injection of `"ISendRequest"`.

### Interfaces & Services
- **[`ISendRequest`](file:///G:/common-components/common-layout-components/src/Logic/interfaces/ISendRequests.ts)**:
  ```typescript
  export interface ISendRequest {
    sendRestAPIRequest<T>(
      requestType: "POST" | "PUT" | "GET" | "DELETE",
      url: string,
      body?: unknown,
    ): Promise<{ status: number; data: T }>;
  }
  ```
- **[`ITestingRequests`](file:///G:/common-components/common-layout-components/src/Logic/interfaces/ITestingRequests.ts)**:
  ```typescript
  export interface ITestingRequests {
    fetchUsers(name: string): Promise<{ id: string; name: string; email: string }[]>;
    fetchProducts(name: string): Promise<{ id: string; name: string; price: number }[]>;
  }
  ```
- **[`TestRequest`](file:///G:/common-components/common-layout-components/src/Logic/services/testRequests.ts)**:
  Implementation using `public static inject = ["ISendRequest"] as const;` constructor injection.
