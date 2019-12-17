import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CampaignWizardComponent } from './campaign-wizard.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';









@NgModule({
    declarations: [CampaignWizardComponent],
    imports: [
        CommonModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDatepickerModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatProgressBarModule,
        MatInputModule,
        MatIconModule],
    exports: [CampaignWizardComponent],
    providers: [],
})
export class CampaignWizardModule { }