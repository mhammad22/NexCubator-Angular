import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEventFormComponent } from './add-event-form/add-event-form.component';
import { ExploreEventsComponent } from './explore-events/explore-events.component';
import { AdminAllTicketsComponent } from './admin-all-tickets/admin-all-tickets.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ExploreStartupsInvestorComponent } from './explore-startups-investor/explore-startups-investor.component';
import { AuthIGuard } from './Auth/auth-i.guard';
import { InvestorHomePageComponent } from './investor-home-page/investor-home-page.component';
import { InvestorDashboardComponent } from './investor-dashboard/investor-dashboard.component';
import { AuthGuard } from './Auth/auth.guard';
import { StartupDetailsComponent } from './startup-details/startup-details.component';
import { StartupDashboardComponent } from './startup-dashboard/startup-dashboard.component';
import { SupportComponent } from './support/support.component';
import { StartupDetailsTeamComponent } from './startup-details-team/startup-details-team.component';
import { StartupDetailsProjectsComponent } from './startup-details-projects/startup-details-projects.component';
import { StartupDetailsPitchComponent } from './startup-details-pitch/startup-details-pitch.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ExploreStartupsComponent } from './explore-startups/explore-startups.component';
import { AddProjectInfoFormComponent } from './add-project-info-form/add-project-info-form.component';
import { AddPitchFormComponent } from './add-pitch-form/add-pitch-form.component';
import { AddNewStartupFormComponent } from './add-new-startup-form/add-new-startup-form.component';
import { AddMemberInfoFormComponent } from './add-member-info-form/add-member-info-form.component';
import { ViewServicesComponent } from './view-services/view-services.component';
import { StartupDetailsOverviewComponent } from './startup-details-overview/startup-details-overview.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatdashboardComponent } from './chatdashboard/chatdashboard.component';
import { InvestorStartConvoComponent } from './investor-start-convo/investor-start-convo.component';
import { SignupRoleFormComponent } from './signup-role-form/signup-role-form.component';
import { AuthAGuard } from './Auth/auth-a.guard';
import { AdminAllStartupsComponent } from './admin-all-startups/admin-all-startups.component';
import { AdminAllSolvedTicketsComponent } from './admin-all-solved-tickets/admin-all-solved-tickets.component';
import { PaymentComponent } from './payment/payment.component';
import { AddPaymentMethodComponent } from './add-payment-method/add-payment-method.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-form',
    pathMatch: 'full',
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    data: {
      title: 'login',
    },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'forgot',
    },
  },
  {
    path: 'investor-navbar',
    canActivate: [AuthIGuard],
    component: InvestorDashboardComponent,
    children: [
      {
        path: '',
        component: InvestorHomePageComponent,
      },
      {
        path: 'explore-startups-investor',
        component: ExploreStartupsInvestorComponent,
      },
      {
        path: 'chat',
        component: ChatdashboardComponent,
      },
      {
        path: 'convo/:clientid',
        component: InvestorStartConvoComponent,
      },
      {
        path: 'support',
        component: SupportComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'add-payment',
        component: AddPaymentMethodComponent,
      },
    ],
  },
  {
    path: 'main-navbar',
    canActivate: [AuthGuard],
    component: MainNavbarComponent,
    data: {
      title: 'Dashboard',
    },
    children: [
      {
        path: 'view-user-profile',
        component: ViewUserProfileComponent,
      },
      {
        path: 'add-new-startup-form',
        component: AddNewStartupFormComponent,
      },
      {
        path: 'event-details/:id',
        component: EventDetailsComponent
      },
      {
        path: 'edit-event/:id',
        component: AddEventFormComponent
      },
      {
        path: 'edit-startup/:id',
        component: AddNewStartupFormComponent,
      },
      {
        path: 'edit-member/:id/:mid',
        component: AddMemberInfoFormComponent,
      },
      {
        path: 'edit-project/:id/:mid',
        component: AddProjectInfoFormComponent,
      },
      {
        path: 'edit-pitch/:id',
        component: AddPitchFormComponent,
      },
      {
        path: 'project-management',
        component: ProjectManagementComponent,
      },
      {
        path: '',
        component: StartupDashboardComponent,
      },
      {
        path: 'explore-startups',
        component: ExploreStartupsComponent,
      },
      {
        path: 'startupdetail/:clientid',
        component: StartupDetailsComponent,
      },
      {
        path: 'project/:clientid',
        component: AddProjectInfoFormComponent,
      },
      {
        path: 'pitch/:clientid',
        component: AddPitchFormComponent,
      },
      {
        path: 'TeamMember/:clientid',
        component: AddMemberInfoFormComponent,
      },
      {
        path: 'view-services',
        component: ViewServicesComponent,
      },
      {
        path: 'support',
        component: SupportComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'chat',
        component: ChatdashboardComponent,
      },
      {
        path: 'explore-events',
        component: ExploreEventsComponent,
      },
      {
        path: 'addevent',
        component: AddEventFormComponent,
      },
      {
        path: 'event-details',
        component: EventDetailsComponent,
      },
      {
        path: 'add-payment',
        component: AddPaymentMethodComponent,
      },
    ],
  },
  {
    path: 'signup-form',
    component: SignupFormComponent,
    data: {
      title: 'Sign up',
    },
  },
  {
    path: 'signup-role-form',
    component: SignupRoleFormComponent,
    data: {
      title: 'Sign Up Role',
    },
  },
  {
    path: 'admin-navbar',
    canActivate: [AuthAGuard],
    component: AdminDashboardComponent,
    data: {
      title: 'Admin Dashboard',
    },
    children: [
      {
        path: '',
        component: AdminHomePageComponent,
      },
      {
        path: 'all-startups-admin',
        component: AdminAllStartupsComponent,
      },
      {
        path: 'startupdetail/:clientid',
        component: StartupDetailsComponent,
      },
      {
        path: 'tickets',
        component: AdminAllTicketsComponent,
      },
      {
        path: 'solved-tickets',
        component: AdminAllSolvedTicketsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
