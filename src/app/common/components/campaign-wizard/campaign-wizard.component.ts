import { Component, OnInit, ElementRef, ViewChild, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICampaign } from '../../interfaces/campaign.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { CustomValidators } from '../../utils/validators';

@Component({
  selector: 'ms-campaign-wizard',
  templateUrl: './campaign-wizard.component.html',
  styleUrls: ['./campaign-wizard.component.scss']
})
export class CampaignWizardComponent implements OnInit, OnChanges {

  @Input() avaliableDevices: Array<string> = ['Mobile', 'Tablet', 'Desktop'];
  @ViewChild('deviceInput', { static: false }) deviceInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @Input() isLinear = false;
  @Input() loading: boolean = false;
  @Output() onSave = new EventEmitter<ICampaign>();
  @Input() campaign: ICampaign = {};
  @Input() title: string = 'Create Campaign';

  form: FormGroup;

  // autocomplete
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  deviceCtrl = new FormControl();
  devices: string[] = [];
  readonly FIRST_STEP = 0;
  readonly SECOND_STEP = 1;
  readonly LAST_STEP = 2;
  private isSelected = (device) => this.devices.indexOf(device) === -1;





  constructor(private _formBuilder: FormBuilder) {
  }

  get filterDevices(){
    let filteredDevices = this.avaliableDevices.slice().filter(this.isSelected);
    return filteredDevices;
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
      },
      devices: this.devices ? this.devices : []
    }
    this.onSave.emit(campaignToSave);
  }


  setForm() {
    this.form = this._formBuilder.group({
      name: [this.campaign.name, Validators.required],
      bid: [this.campaign.bid, [Validators.required, CustomValidators.mustBeLessThan('dailyBudget', 10)]],
      dailyBudget: [this.campaign.dailyBudget, [Validators.required, CustomValidators.mustBeGreaterThan('bid', 10)]],
      startDate: [this.campaign.dateRange ? new Date(this.campaign.dateRange.start) : '', [Validators.required, CustomValidators.isTimeBefore('endDate')]],
      endDate: [this.campaign.dateRange ? new Date(this.campaign.dateRange.end) : '', [Validators.required, CustomValidators.isTimeAfter('startDate')]]
    });
  }

  get summeryDevices(): string {
    return this.anyDevices ? this.devices.join(', ') : 'N/A';
  }

  get anyDevices(): boolean {
    return (this.devices && this.devices.length !== 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { campaign } = changes;
    if (campaign) {
      this.setForm();
      this.devices = this.campaign.devices ? this.campaign.devices.slice() : [];
    }
  }

  get campainDetails() {
    return this.form.value;
  }

  add(event: MatChipInputEvent): void {
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





}



