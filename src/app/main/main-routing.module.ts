import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { DashboardResolverResolver } from "./dashboard/dashboard.service.ts/dashboard-resolver.resolver";
import { MainComponent } from "./main.component";

let mainRoutes: Routes = [
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    },
    {
        path: 'app',
        component: MainComponent, 
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: () => DashboardModule,
                canActivate: [AuthGuard],
                resolve: { data: DashboardResolverResolver}
                
            }
        ]
    }
]

@NgModule({
    imports: [
        
        RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class MainRoutingModule {}