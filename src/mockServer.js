import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  // capture "POST /greeting" requests
  rest.post("http://localhost:3001/changePassword", (req, res, ctx) => {
    // respond using a mocked JSON body
    const { password } = req.body;

    if (password === "pwd") {
      return res(ctx.status(401), ctx.json({ message: "This password is same as previous one" }));
    }

    return res(ctx.status(200), ctx.json({ message: "Password changed" }));
  })
);

export { server };
