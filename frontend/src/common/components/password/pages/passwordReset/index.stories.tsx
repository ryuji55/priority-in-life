import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { PasswordResetPage } from "./index";

const meta = {
  title: "Pages/PasswordResetPage",
  component: PasswordResetPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PasswordResetPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
