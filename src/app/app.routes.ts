import { Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { WarehouseViewComponent } from './components/warehouse-view/warehouse-view.component'; 
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component'; 
import { SupplyDocumentListComponent } from './components/supply-document-list/supply-document-list.component'; 
import { AddSupplyDocumentComponent } from './components/add-supply-document/add-supply-document.component'; 

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', component: LoginComponentComponent },
    { path: 'warehouses', component: WarehouseViewComponent } ,
    { path: 'warehouses/add', component: AddWarehouseComponent } ,
    { path: 'supplydocument', component: SupplyDocumentListComponent } ,
    { path: 'supplydocument/add', component: AddSupplyDocumentComponent } 

];
