import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path : '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children:
        [
            {path : 'members',component:MemberListComponent},
            {path:'members/:id',component:MemberDetailComponent},
            {path:'lists',component:ListsComponent},
            {path:'messages',component:MessagesComponent}
        ]
    },
    {path:'errors',component:TestErrorsComponent, pathMatch:'full'},
    {path:'not-found',component:NotFoundComponent, pathMatch:'full'},
    {path:'server-error',component:ServerErrorComponent, pathMatch:'full'},
    {path:'**',component:HomeComponent, pathMatch:'full'}
];
