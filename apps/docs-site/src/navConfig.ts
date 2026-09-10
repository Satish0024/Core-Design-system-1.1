export type NavLink = { to: string; label: string };
export type NavSection = { title: string; links: NavLink[] };

function componentLink(anchor: string, label: string): NavLink {
  return { to: `/components#${anchor}`, label };
}

export const componentSections: NavSection[] = [
  {
    title: "Actions",
    links: [
      componentLink("button", "Buttons"),
      componentLink("icon-button", "Icon Button"),
      componentLink("link", "Link"),
    ],
  },
  {
    title: "Forms",
    links: [
      componentLink("input", "Input"),
      componentLink("textarea", "Textarea"),
      componentLink("select", "Select"),
      componentLink("checkbox-radio", "Checkbox / Radio"),
      componentLink("switch", "Switch"),
      componentLink("toggle", "Toggle / Toggle Group"),
      componentLink("input-group", "Input Group"),
      componentLink("input-otp", "Input OTP"),
      componentLink("slider", "Slider"),
      componentLink("combobox", "Combobox"),
      componentLink("date-picker", "Date Picker"),
      componentLink("calendar", "Calendar"),
      componentLink("attachment", "Attachment"),
      componentLink("input-icon", "Input (with icon)"),
      componentLink("payment-bank-fields", "Payment & Bank Fields"),
    ],
  },
  {
    title: "Data Display",
    links: [
      componentLink("quick-links", "Quick links"),
      componentLink("badge", "Badge"),
      componentLink("data-table", "Data Table"),
      componentLink("table", "Table"),
      componentLink("item", "Item"),
      componentLink("description-list", "Description List"),
      componentLink("avatar", "Avatar"),
      componentLink("progress", "Progress"),
    ],
  },
  {
    title: "Charts",
    links: [
      componentLink("line-chart", "Line Chart"),
    ],
  },
  {
    title: "Disclosure",
    links: [
      componentLink("collapsible", "Collapsible"),
      componentLink("accordion", "Accordion"),
      componentLink("separator", "Separator"),
      componentLink("skeleton", "Skeleton"),
    ],
  },
  {
    title: "Navigation",
    links: [
      componentLink("navigation-menu", "Navigation Menu"),
      componentLink("sidebar", "Sidebar"),
      componentLink("tabs", "Tabs"),
      componentLink("breadcrumb", "Breadcrumb"),
      componentLink("stepper", "Stepper"),
      componentLink("pagination", "Pagination"),
    ],
  },
  {
    title: "Feedback",
    links: [
      componentLink("alert", "Alert"),
      componentLink("toast", "Toast"),
      componentLink("toast-manager", "Toast Manager"),
      componentLink("empty", "Empty"),
      componentLink("spinner", "Spinner"),
    ],
  },
  {
    title: "Overlays",
    links: [
      componentLink("modal", "Modal"),
      componentLink("confirm-dialog", "Confirmation Dialog"),
      componentLink("drawer", "Drawer"),
      componentLink("slideover", "Slideover"),
      componentLink("dropdown-menu", "Dropdown Menu"),
      componentLink("tooltip", "Tooltip"),
      componentLink("hover-card", "Hover Card"),
    ],
  },
];

export const componentLinks = componentSections.flatMap((section) => section.links);

export const totalComponentCount = componentLinks.length;

const componentAnchorSectionIds = new Map<string, string>();
componentLinks.forEach((link, index) => {
  const anchor = link.to.split("#")[1];
  if (anchor) {
    componentAnchorSectionIds.set(anchor, String(index + 1).padStart(2, "0"));
  }
});

/** Global section number (01–52) for a component anchor on the unified /components page. */
export function sectionIdForAnchor(anchorId: string): string | null {
  return componentAnchorSectionIds.get(anchorId) ?? null;
}

/** Render order for the unified /components page (category title → page module). */
export const componentPageOrder = componentSections.map((section) => section.title);
