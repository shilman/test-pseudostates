import React from 'react';
import { useGlobals } from '@storybook/preview-api';
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

const lightTheme = {
  colors: {
    primary: "hotpink",
    secondary: 'purple',
  },
};
const darkTheme = {
  colors: {
    primary: "black",
    secondary: "#666",
  },
};

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
    }),
    (story, { parameters }) => {
      const [globals, updateGlobals] = useGlobals();
      console.log({ globals, parameters });
      if(parameters.theme && parameters.theme !== globals.theme) {
        updateGlobals({ theme: parameters.theme });
      }
      return story();
    }
    // (story) => <ThemeProvider theme={lightTheme}>{story()}</ThemeProvider>,
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
