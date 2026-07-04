import type { Preview } from '@storybook/nextjs-vite';

// TypeScript may complain about side-effect imports of CSS files in this Storybook context.
// Ignore the next line's type error so the global styles are still loaded for stories.
// @ts-ignore
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;