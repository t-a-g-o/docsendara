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



const navButtons = [
//   Navigation buttons should look like this:
//  {
//    label: 'GitHub',
//    icon: <FaGithub />,
//    href: 'https://github.com/t-a-g-o/docsendara',
//    target: '_blank',
//  }
];

export default navButtons;
