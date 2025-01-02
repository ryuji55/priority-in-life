import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { PasswordForgotPage } from "./index";

const meta = {
  title: "Pages/PasswordForgotPage",
  component: PasswordForgotPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PasswordForgotPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
