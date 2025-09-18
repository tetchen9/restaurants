## The project - Restaurant Discovery App

A React-based restaurant discovery app that enables users to search and browse restaurants. Features real-time search capabilities, deal-based restaurant sorting, and a responsive user interface designed for efficient restaurant browsing.

### Key features include:

Debounced search input (500ms delay) to prevent excessive API calls.

Real-time restaurant filtering based on search queries: partial name and partial cuisine.

Optimized search state management using React Context.

<img width="394" height="520" alt="image" src="https://github.com/user-attachments/assets/52dadd71-b8eb-4cab-8bff-98dfa1299441" />


<img width="394" height="662" alt="image" src="https://github.com/user-attachments/assets/9bb70034-8f6b-4270-a933-5eb07ffb4972" />


Deal sorting:
Automatic sorting of restaurants by best available deals.

Discount percentage prioritization (highest discounts first).

Deal-specific information including availability and dining options.


<img width="394" height="661" alt="image" src="https://github.com/user-attachments/assets/e56b981a-fe9a-4963-892a-ee9f2ff573a7" />




### Performance optimization:

Memoized sorting operations to prevent unnecessary re-computations.

Debounced search input handling for improved API efficiency.

Context-based state management for optimal component re-rendering.


### User Experience:

Loading states and error handling throughout the application.

Responsive deal cards with clear discount information.

Intuitive search interface with real-time feedback, sceletons are shown for images while images are loading.


<img width="395" height="647" alt="image" src="https://github.com/user-attachments/assets/468e7e59-90c7-4cc7-836b-7d6ae387ebf6" />


<img width="396" height="261" alt="image" src="https://github.com/user-attachments/assets/9a6ba8f4-f200-48bc-b459-b3618be9ab4d" />



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

