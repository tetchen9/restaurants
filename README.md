## The project - Restaurant Discovery App

A React-based restaurant discovery app that enables users to search and browse restaurants. Features real-time search capabilities, deal-based restaurant sorting, and a responsive user interface designed for efficient restaurant browsing.

### Key features include:

Real-time restaurant filtering based on search queries: partial name and partial cuisine. Debounced search input (500ms delay) to prevent excessive API calls.

Optimized search state management using React Context.

Search by multiple words, coma separated.

<br/>
<img width="395" height="759" alt="image" src="https://github.com/user-attachments/assets/a9adfc26-8252-42d1-a5eb-2090937fd23a" />

<br/><br/>


Deal sorting:
Automatic sorting of restaurants by best available deals.
Discount percentage prioritization (highest discounts first).
Deal-specific information including availability and dining options.

User-friendly URLs show the restaurant name with spaces replaced by '-', for example 
`/restaurants/gyoza-gyoza-melbourne-central`

<br/>
<img width="395" height="759" alt="image" src="https://github.com/user-attachments/assets/bda9ea0e-7283-45f9-a7fc-248dd08ff468" />

<br/><br/>



### Performance optimization:

Memoized sorting operations to prevent unnecessary re-computations.

Debounced search input handling for improved API efficiency.

Context-based state management for optimal component re-rendering.


### User Experience:

Intuitive search interface with real-time feedback, skeletons are shown for images while images are loading.

<br/><br/>
<img style="margin-bottom: '20px;'" width="395" height="647" alt="image" src="https://github.com/user-attachments/assets/468e7e59-90c7-4cc7-836b-7d6ae387ebf6" />
<br/><br/>

Loading states and error handling throughout the application.

<br/>
<img style="margin-bottom: '20px;'" width="396" height="261" alt="image" src="https://github.com/user-attachments/assets/9a6ba8f4-f200-48bc-b459-b3618be9ab4d" />
<br/><br/>

Responsive deal cards with clear discount information.

<br/>
<img width="965" height="664" alt="image" src="https://github.com/user-attachments/assets/d887ec69-d1f8-4eae-8b23-dabefa84dfec" />
<br/><br/>

Accessibility is incomplete, but I added navigation by tab to most components.

<br/>
<img width="393" height="663" alt="image" src="https://github.com/user-attachments/assets/b932b85f-ca68-4572-8a9f-188d5091e842" />
<br/>

### Architecture:
The application follows some React patterns with a focus and maintainability:

**Context API**: Centralized state management for restaurant data and search functionality

**Custom Hooks**: Abstracted data fetching logic with useFetchRestaurants

**TypeScript**: Full type safety across components and data structures

**Styled Components**: Modular styling architecture for consistent UI components

**Service Layer**: Dedicated sorting utilities for business logic separation

### Getting started

The required node.js and NPM versions are defined at the `package.json` file.
The project follows a typical process to run at your local:

1. Clone this repository
2. Install the dependencies with `npm install`
3. Start the app with `npm run dev`
4. Go to `http://localhost:5173/` 

### Available commands

- **`dev`: Start the local servers.**
  This starts both (1) the Vite app server and (2) the JSON mock server in parallel.
- **`test`: Start the test runner in watch mode.**
  You can update the tests and see the results immediately.
- **`lint`: Run a check for the project's health.**
  At the moment, it includes ESLint.

  
### Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Styled Component](https://styled-components.com/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com)
- [JSON Server](https://github.com/typicode/json-server)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)

