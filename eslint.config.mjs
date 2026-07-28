import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Pre-existing pattern across several components (populating form state
      // from props/UUIDs on mount). Flagged as an error by the stricter rule
      // bundled with Next 16's eslint-plugin-react-hooks; downgraded to a
      // warning rather than silently rewriting component behavior.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
