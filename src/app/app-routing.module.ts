import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs']);


const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  canLoad: [IntroGuard, AutoLoginGuard], // Check if we should show the introduction or forward to inside
  ...canActivate(redirectLoggedInToHome), // If authenticated, redirect to home
},
{
  path: 'intro',
  loadChildren: () => import('./pages/intro/intro.module').then((m) => m.IntroPageModule)
},
{
  path: 'tabs',
  loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  ...canActivate(redirectUnauthorizedToLogin), // If not authenticated, redirect to login

  // canLoad: [AuthGuard] // Secure all child pages
},
{
  path: 'admin-dash',
  loadChildren: () => import('./pages/admin-dash/admin-dash.module').then( m => m.AdminDashPageModule),
  ...canActivate(redirectUnauthorizedToLogin), // If not authenticated, redirect to login
},
{
  path: 'menu',
  loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
},
{
  path: 'modal',
  loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule),
  ...canActivate(redirectUnauthorizedToLogin), // If not authenticated, redirect to login
},
{
  path: 'modal/:id',
  loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule),
  ...canActivate(redirectUnauthorizedToLogin), // If not authenticated, redirect to login
},
// {
//   path: 'home',
//   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
// },
{
  path: '**',
  redirectTo: 'tabs',
  pathMatch: 'full'
}

];

  // {
  //   path: '',
  //   loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
  //   ...canActivate(redirectLoggedInToHome)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  //   ...canActivate(redirectUnauthorizedToLogin)

  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
	// 	...canActivate(redirectLoggedInToHome)
  // },
  // // {
  // //   path: 'tabs',
  // //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  // //   ...canActivate(redirectUnauthorizedToLogin)
  // // },
  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'intro',
  //   loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // }


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
