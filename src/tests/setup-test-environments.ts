import '@testing-library/jest-dom/vitest';

// @ts-expect-error - This is a global variable that is set by the React testing library
globalThis.IS_REACT_ACT_ENVIRONMENT = true;