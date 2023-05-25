<mat-form-field appearance="outline">
<mat-label>Field Name</mat-label>
<input type="text" matInput formControlName="name" />
</mat-form-field>

<mat-form-field appearance="outline">
<mat-label>Form Display Name</mat-label>
<input type="text" matInput formControlName="displayName" />
</mat-form-field>

<mat-form-field appearance="outline">
<mat-label>Field Type</mat-label>
<mat-select formControlName="type">
  <mat-option value="input">Input</mat-option>
  <mat-option value="password">Password</mat-option>
  <mat-option value="date">Date</mat-option>
</mat-select>
</mat-form-field>

<mat-form-field appearance="outline">
<mat-label>Field Datatype</mat-label>
<input type="text" matInput formControlName="dataType" />
</mat-form-field>

<mat-form-field appearance="outline">
<mat-label>Is required</mat-label>
<mat-select
  matInput
  formControlName="required"
  [value]="false"
>
  <mat-option [value]="true">Yes</mat-option>
  <mat-option [value]="false">No</mat-option>
</mat-select>
</mat-form-field>

<mat-form-field appearance="outline">
<mat-label>Value</mat-label>
<input type="text" matInput formControlName="value" />
</mat-form-field>

<mat-form-field appearance="outline">
<mat-label>Display order</mat-label>
<input
  type="number"
  matInput
  formControlName="displayOrder"
/>
</mat-form-field>
<!-- 
<div>
<mat-icon (click)="addField()" class="display-hover"
  >add_circle_outline</mat-icon
>
</div> -->