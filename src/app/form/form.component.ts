import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Person from '../person';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) { }
  displayedColumns: string[] = ['id', 'name', 'lastName', 'age'];
  dataSource: MatTableDataSource<unknown>;
  persons = new Array();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  }
  model = new Person(1077281272, 'WILL', 'MUNOZ', 30);
  submitted = false;

  onSubmit() {
    const contains = this._isContains(this.persons, this.model.id);
    if (!contains) {
      this.persons.push(this.model)
    } else {
      this.openSnackBar(`La persona con el id ${this.model.id} ya existe`, '')
    };
    this.dataSource = new MatTableDataSource(this.persons);

    this.submitted = true;
  }

  _isContains(json, value) {
    let contains = false;
    Object.keys(json).some(key => {
      contains = typeof json[key] === 'object' ? this._isContains(json[key], value) : json[key] === value;
      return contains;
    });
    return contains;
  }

  newPerson() {
    this.model = new Person(1, '', '', 1);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
