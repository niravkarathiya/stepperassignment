import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss']
})
export class ProfessionalDetailsComponent {
  @Input() proffesionalDetailsForm!: FormGroup;
  fileName = '';

  years = ['0 year', '1 year', '2 year','3 year','4 year','5 year','6 year','7 year']
  months = ['0 Months','1 Months','2 Months','3 Months','4 Months','5 Months','6 Months','7 Months','8 Months', '9 Months', '10 Months', '11 Months','12 Months'];
  skillsList = ['Angular', 'Android', 'React', 'NodeJS'];

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
    }
  }
}
