// Top navigation configuration for Docsendara.
// This file defines the buttons that appear in the top navigation bar.
//
// How to use:
// - Add, edit, or remove button objects in the navButtons array below.
// - Each button can link to an external site, open in a new tab, or trigger special actions.
// - Supports dynamic GitHub edit links using goToEditPage.
//
// Button object fields:
//   label: (string) Text displayed on the button.
//   icon: (React component) Icon shown next to the label.
//   href: (string, optional) URL to open when clicked. Use with target.
//   target: (string, optional) Use '_blank' to open in a new tab.
//   goToEditPage: (boolean, optional) If true, generates a dynamic GitHub edit link for the current doc page.
//
// Example: See the navButtons array below for usage patterns.

import { AlertCircle, PencilIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const navButtons = [
  {
    // Button linking to the project's GitHub repository
    label: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/t-a-g-o/docsendara',
    target: '_blank',
  },
  {
    // Button for reporting documentation issues (links to GitHub Issues)
    label: 'Report Issue',
    icon: AlertCircle,
    href: 'https://github.com/t-a-g-o/docsendara/issues/new?labels=documentation&template=doc_issue.md',
    target: '_blank',
  },
  {
    // Button to allow users to quickly edit the current page on GitHub
    label: 'Edit Page',
    icon: PencilIcon,
    // When goToEditPage is true, the app will generate a GitHub edit link for the current doc page
    goToEditPage: true,
  },
];

export default navButtons;
