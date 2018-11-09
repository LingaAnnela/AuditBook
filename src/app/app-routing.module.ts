import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { DebitComponent } from './components/audit/debit/debit.component';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CreditComponent } from './components/audit/credit/credit.component';
import { AboutComponent } from './components/about/about.component';
import { ManageClientComponent } from './components/clients/manage-client/manage-client.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { BalanceComponent } from './components/audit/balance/balance.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/clients/client-details/client-details.component';
import {TransactionComponent} from './components/audit/transaction/transaction.component';
import {HistoryComponent} from './components/history/history.component';
import {ChitFundComponent} from './components/chit-fund/chit-fund.component';
import {ReminderComponent} from './components/reminder/reminder.component';
import {CalculatorComponent} from './components/calculator/calculator.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'clients/manage-client', component: ManageClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/add-client', component: AddClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'audit/debt', component: DebitComponent, canActivate: [AuthGuard] },
  { path: 'audit/credit', component: CreditComponent, canActivate: [AuthGuard] },
  { path: 'audit/balance', component: BalanceComponent, canActivate: [AuthGuard] },
  { path: 'audit/transaction', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'chit-fund', component: ChitFundComponent, canActivate: [AuthGuard] },
  { path: 'reminder', component: ReminderComponent, canActivate: [AuthGuard] },
  { path: 'calculator', component: CalculatorComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'auth/signup', component: SignupComponent},
  { path: 'about', component: AboutComponent }
] ;

@NgModule({
  imports : [ RouterModule.forRoot(appRoutes)],
  exports : [ RouterModule ],
  providers : [AuthGuard]
})
export class AppRoutingModule {

}
