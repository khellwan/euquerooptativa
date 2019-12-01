/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'inicio',
    icon: '/img/icon/inicio.png',
    label: 'Início',
    to: '/inicio'
  },
  {
    id: 'perfil',
    icon: '/img/icon/perfil.png',
    label: 'Perfil',
    to: '/perfil'
  },
  {
    id: 'optativas',
    icon: '/img/icon/optativas.png',
    label: 'Optativas',
    to: '/optativas'
  }
];

export const ProfileOptions = [
  {
    label: 'Perfil',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
