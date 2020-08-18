import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders landing page", () => {
  const { getByText } = render(<App />);
  const linkDaftarSekarang = getByText(/Daftar Sekarang/);
  expect(linkDaftarSekarang).toBeInTheDocument();
});
