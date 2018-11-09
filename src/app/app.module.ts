import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ManageClientComponent } from './components/clients/manage-client/manage-client.component';
import { CreditComponent } from './components/audit/credit/credit.component';
import { DebitComponent } from './components/audit/debit/debit.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { BalanceComponent } from './components/audit/balance/balance.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';

import { AuthService } from './components/auth/auth.service';
import { ClientService } from './components/clients/client.service';
import { HttpClientModule } from '@angular/common/http';
import {FirebaseService} from './services/firebase.service';
import {HttpModule} from '@angular/http';
import { ClientDetailsComponent } from './components/clients/client-details/client-details.component';
import { TransactionComponent } from './components/audit/transaction/transaction.component';
import { HistoryComponent } from './components/history/history.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ChitFundComponent } from './components/chit-fund/chit-fund.component';
import {TransactionDetailsComponent} from './components/clients/client-details/transaction-details/transaction-details.component';
import {AuditService} from './components/audit/audit.service';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AuditDashboardComponent } from './audit-dashboard/audit-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ClientsComponent,
    ManageClientComponent,
    CreditComponent,
    DebitComponent,
    TopnavComponent,
    SidenavComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    BalanceComponent,
    AddClientComponent,
    EditClientComponent,
    ClientDetailsComponent,
    TransactionComponent,
    HistoryComponent,
    ReminderComponent,
    ChitFundComponent,
    TransactionDetailsComponent,
    CalculatorComponent,
    AuditDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'audit-book'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    ClientService,
    FirebaseService,
    AuditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
