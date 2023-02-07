import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-current-organization-details',
  templateUrl: './current-organization-details.component.html',
  styleUrls: ['./current-organization-details.component.scss']
})
export class CurrentOrganizationDetailsComponent {
  @Input() currentOrgDetailsForm!: FormGroup;

}
