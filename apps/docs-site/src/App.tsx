import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Color from "./pages/Color";
import Typography from "./pages/Typography";
import Spacing from "./pages/Spacing";
import RadiusElevation from "./pages/RadiusElevation";
import Motion from "./pages/Motion";
import Actions from "./pages/Actions";
import Forms from "./pages/Forms";
import DataDisplay from "./pages/DataDisplay";
import DisclosurePage from "./pages/Disclosure";
import NavigationPage from "./pages/NavigationPage";
import Feedback from "./pages/Feedback";
import OverlaysPage from "./pages/OverlaysPage";
import Patterns from "./pages/Patterns";
import Themes from "./pages/Themes";
import Accessibility from "./pages/Accessibility";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/foundations/color" element={<Color />} />
        <Route path="/foundations/typography" element={<Typography />} />
        <Route path="/foundations/spacing" element={<Spacing />} />
        <Route path="/foundations/radius-elevation" element={<RadiusElevation />} />
        <Route path="/foundations/motion" element={<Motion />} />
        <Route path="/components/actions" element={<Actions />} />
        <Route path="/components/forms" element={<Forms />} />
        <Route path="/components/data-display" element={<DataDisplay />} />
        <Route path="/components/disclosure" element={<DisclosurePage />} />
        <Route path="/components/navigation" element={<NavigationPage />} />
        <Route path="/components/feedback" element={<Feedback />} />
        <Route path="/components/overlays" element={<OverlaysPage />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/accessibility" element={<Accessibility />} />
      </Route>
    </Routes>
  );
}
