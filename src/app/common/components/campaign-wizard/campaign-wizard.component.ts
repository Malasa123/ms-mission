import { Component, OnInit, ElementRef, ViewChild, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICampaign } from '../../interfaces/campaign.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'ms-campaign-wizard',
  templateUrl: './campaign-wizard.component.html',
  styleUrls: ['./campaign-wizard.component.scss']
})
export class CampaignWizardComponent implements OnInit, OnChanges {

  readonly FIRST_STEP = 0;
  readonly LAST_STEP = 2;

  @Input() isLinear = false;
  @Input() loading: boolean = false;
  @Output() onSave = new EventEmitter<ICampaign>();
  @Input() campaign: ICampaign = {
    dateRange: {
      end: '',
      start: '',
    }
  };


  toggleLoading() {
    this.loading = !this.loading;
  }


  form: FormGroup;


  constructor(private _formBuilder: FormBuilder) {
    this.filteredDevices = this.deviceCtrl.valueChanges.pipe(
      startWith(null),
      map((device: string | null) => device ? this._filter(device) : this.avaliableDevices.slice()));
  }


  ngOnInit() {
    this.setForm();
  }

  submit() {
    const { name, bid, dailyBudget, startDate, endDate } = this.form.value;
    let campaignToSave: ICampaign = {
      name, bid, dailyBudget,
      dateRange: {
        end: endDate,
        start: startDate
      }
    }
    this.onSave.emit(campaignToSave);
  }


  setForm() {
    this.form = this._formBuilder.group({
      name: [this.campaign.name, Validators.required],
      bid: [this.campaign.bid, Validators.required],
      dailyBudget: [this.campaign.dailyBudget, Validators.required],
      startDate: [this.campaign.dateRange ? this.campaign.dateRange.start : '', Validators.required],
      endDate: [this.campaign.dateRange ? this.campaign.dateRange.end : '', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const { campaign } = changes;
    if (campaign) {
      this.setForm();
    }

  }

  get campainDetails() {
    return this.form.value;
  }











  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  deviceCtrl = new FormControl();
  filteredDevices: Observable<string[]>;
  devices: string[] = ['Mobile'];
  @Input() avaliableDevices: Array<string> = ['Mobile', 'Tablet', 'Desktop'];

  @ViewChild('deviceInput', { static: false }) deviceInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  add(event: MatChipInputEvent): void {
    // Add device only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our device
      if ((value || '').trim()) {
        this.devices.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.deviceCtrl.setValue(null);
    }
  }

  remove(device: string): void {
    const index = this.devices.indexOf(device);

    if (index >= 0) {
      this.devices.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.devices.push(event.option.viewValue);
    this.deviceInput.nativeElement.value = '';
    this.deviceCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.avaliableDevices.filter(device => device.toLowerCase().indexOf(filterValue) === 0);
  }



}
