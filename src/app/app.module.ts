import { AuthIGuard } from './Auth/auth-i.guard';
import { AuthGuard } from './Auth/auth.guard';
import { LoginFormService } from './login-form/login-form.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SupportComponent } from './support/support.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ViewServicesComponent } from './view-services/view-services.component';
import { AddProjectInfoFormComponent } from './add-project-info-form/add-project-info-form.component';
import { StartupDetailsOverviewComponent } from './startup-details-overview/startup-details-overview.component';
import { StartupDetailsTeamComponent } from './startup-details-team/startup-details-team.component';
import { StartupDetailsProjectsComponent } from './startup-details-projects/startup-details-projects.component';
import { StartupDetailsPitchComponent } from './startup-details-pitch/startup-details-pitch.component';
import { AddMemberInfoFormComponent } from './add-member-info-form/add-member-info-form.component';
import { AddPitchFormComponent } from './add-pitch-form/add-pitch-form.component';
import { AddNewStartupFormComponent } from './add-new-startup-form/add-new-startup-form.component';
import { ExploreStartupsComponent } from './explore-startups/explore-startups.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { StartupDashboardComponent } from './startup-dashboard/startup-dashboard.component';
import { StartupDetailsComponent } from './startup-details/startup-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';
import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { InvestorDashboardComponent } from './investor-dashboard/investor-dashboard.component';
import { InvestorHomePageComponent } from './investor-home-page/investor-home-page.component';
import { ExploreStartupsInvestorComponent } from './explore-startups-investor/explore-startups-investor.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ChatdashboardComponent } from './chatdashboard/chatdashboard.component';
import { InvestorStartConvoComponent } from './investor-start-convo/investor-start-convo.component';
import { SignupRoleFormComponent } from './signup-role-form/signup-role-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminAllStartupsComponent } from './admin-all-startups/admin-all-startups.component';
import { AdminAllTicketsComponent } from './admin-all-tickets/admin-all-tickets.component';
import { AdminAllSolvedTicketsComponent } from './admin-all-solved-tickets/admin-all-solved-tickets.component';
import { ExploreEventsComponent } from './explore-events/explore-events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEventFormComponent } from './add-event-form/add-event-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment/payment.component';
import { AddPaymentMethodComponent } from './add-payment-method/add-payment-method.component';
import { ViewPaymentMethodsComponent } from './view-payment-methods/view-payment-methods.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';

const routes: Routes = [
  { path: 'home', component: StartupDetailsOverviewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    SignupFormComponent,
    LoginFormComponent,
    SupportComponent,
    SettingsComponent,
    ProfileInfoComponent,
    ViewServicesComponent,
    AddProjectInfoFormComponent,
    StartupDetailsOverviewComponent,
    StartupDetailsTeamComponent,
    StartupDetailsProjectsComponent,
    StartupDetailsPitchComponent,
    AddMemberInfoFormComponent,
    AddPitchFormComponent,
    AddNewStartupFormComponent,
    ExploreStartupsComponent,
    StartupDashboardComponent,
    StartupDetailsComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
    InvestorDashboardComponent,
    InvestorHomePageComponent,
    ExploreStartupsInvestorComponent,
    ProjectManagementComponent,
    ChatdashboardComponent,
    InvestorStartConvoComponent,
    SignupRoleFormComponent,
    AdminDashboardComponent,
    AdminHomePageComponent,
    AdminAllStartupsComponent,
    AdminAllTicketsComponent,
    AdminAllSolvedTicketsComponent,
    ExploreEventsComponent,
    EventDetailsComponent,
    AddEventFormComponent,
    PaymentComponent,
    AddPaymentMethodComponent,
    ViewPaymentMethodsComponent,
    ForgotPasswordComponent,
    ViewUserProfileComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ChartsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule
    
  ],
  providers: [
    LoginFormService,
    StartupDetailsComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    [AuthGuard],
    [AuthIGuard]
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
