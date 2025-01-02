import React from "react";
import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "../src/store/store";

const preview: Preview = {
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
