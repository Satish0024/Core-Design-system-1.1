import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Color from "./pages/Color";
import ColorExtraction from "./pages/ColorExtraction";
import Common from "./pages/Common";
import Typography from "./pages/Typography";
import LayoutGrid from "./pages/LayoutGrid";
import Charts from "./pages/Charts";
import Questionnaire from "./pages/Questionnaire";
import LogoPage from "./pages/Logo";
import Actions from "./pages/Actions";
import Forms from "./pages/Forms";
import DataDisplay from "./pages/DataDisplay";
import DisclosurePage from "./pages/Disclosure";
import NavigationPage from "./pages/NavigationPage";
import Feedback from "./pages/Feedback";
import OverlaysPage from "./pages/OverlaysPage";
import Patterns from "./pages/Patterns";
import Screens from "./pages/Screens";
import Tokens from "./pages/Tokens";
import Themes from "./pages/Themes";
import Accessibility from "./pages/Accessibility";
import AnatomyPage from "./pages/AnatomyPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/foundations/color" element={<Color />} />
        <Route path="/foundations/color-extraction" element={<Navigate to="/color-extraction" replace />} />
        <Route path="/foundations/typography" element={<Typography />} />
        <Route path="/foundations/common" element={<Common />} />
        <Route path="/foundations/spacing" element={<Navigate to="/foundations/typography" replace />} />
        <Route path="/foundations/radius-elevation" element={<Navigate to="/foundations/typography" replace />} />
        <Route path="/foundations/responsive" element={<Navigate to="/foundations/typography" replace />} />
        <Route path="/foundations/motion" element={<Navigate to="/foundations/typography" replace />} />
        <Route path="/foundations/icons" element={<Navigate to="/foundations/typography" replace />} />
        <Route path="/foundations/layout-grid" element={<LayoutGrid />} />
        <Route path="/foundations/logo" element={<LogoPage />} />
        <Route path="/components/actions" element={<Actions />} />
        <Route path="/components/forms" element={<Forms />} />
        <Route path="/components/data-display" element={<DataDisplay />} />
        <Route path="/components/disclosure" element={<DisclosurePage />} />
        <Route path="/components/navigation" element={<NavigationPage />} />
        <Route path="/components/feedback" element={<Feedback />} />
        <Route path="/components/overlays" element={<OverlaysPage />} />
        <Route path="/components/charts" element={<Charts />} />
        <Route path="/components/questionnaire" element={<Questionnaire />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/screens" element={<Screens />} />
        <Route path="/tokens" element={<Tokens />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/color-extraction" element={<ColorExtraction />} />
        <Route path="/anatomy" element={<AnatomyPage />} />
      </Route>
    </Routes>
  );
}
