import * as React from "react";
import { createRoot } from "react-dom/client";
import { Frontpage } from "./frontpage";


const container = document.getElementById('app');
const root = createRoot(container);

root.render(<Frontpage />);