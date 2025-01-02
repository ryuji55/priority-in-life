import type { Meta, StoryObj } from "@storybook/react";
import { LoginPage } from "./index";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "Pages/LoginPage",
  component: LoginPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
