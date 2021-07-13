import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { server } from "./mockServer";

describe("renders learn react link", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  beforeEach(() => {
    server.resetHandlers();
    render(<App />);
  });

  it("Enter password and show success message", async () => {
    userEvent.type(screen.getByLabelText("username"), "user");

    userEvent.type(screen.getByLabelText("password"), "password");
    userEvent.click(
      screen.getByRole("button", {
        name: "Submit"
      })
    );
    expect(await screen.findByText("Password changed successfully")).toBeInTheDocument();
    screen.debug();
  });

  it("Enter password and show error message", async () => {
    userEvent.type(screen.getByLabelText("username"), "user");
    userEvent.type(screen.getByLabelText("password"), "pwd");
    userEvent.click(
      screen.getByRole("button", {
        name: "Submit"
      })
    );
    expect(await screen.findByText("Error in changing password")).toBeInTheDocument();
    screen.debug();
  });
});
