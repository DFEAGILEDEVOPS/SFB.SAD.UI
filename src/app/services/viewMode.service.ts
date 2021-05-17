import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {

  mode: string;

  constructor() {
    this.mode = "dashboard";
  }

  setEditMode() {
    this.mode = "edit";
  }

  setDashboardMode() {
    this.mode = "dashboard";
  }

  isEditMode() {
    return this.mode === "edit";
  }
}
