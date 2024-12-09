import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from './interface/vehicle.interface';
import { VehicleService } from './service/vehicle.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[] = [];
  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource(this.vehicles);
  displayedColumns: string[] = ['placa', 'chassis', 'renavam', 'marca', 'modelo', 'ano']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: FormGroup = new FormGroup({});

  error?: string;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
  ){
    this.form = this.fb.group({
      plate: ['', Validators.required],
      chassis: ['', Validators.required],
      renavam: ['', Validators.required],

      name: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.populatedVehicles();
  }

  async populatedVehicles(){
    this.vehicles = await this.vehicleService.getVehicles();
    this.dataSource = new MatTableDataSource(this.vehicles);
    this.dataSource.paginator = this.paginator;
  }

  async createVehicle(){
    if (this.error) this.error = undefined;

    let vehicleForm = {...this.form.value, brand: {
      name: this.form.value.name,
      model: this.form.value.model,
      year: this.form.value.year,
    }};

    delete vehicleForm.name;
    delete vehicleForm.model;
    delete vehicleForm.year;

    try {
      await this.vehicleService.createVehicle(vehicleForm);
      this.form.reset();
    } catch (error: any) {
      setTimeout(() => {this.error = undefined}, 5000);
      switch (error?.error.internalCode) {
        case 'VEHICLE_ALREADY_EXISTS':
          this.error = 'Veículo já cadastrado';
          break;
        case "DTO_VALIDATION_ERROR":
          this.error = 'Erro ao validar dados do veículo';
          break;
        default:
          this.error = 'Erro ao cadastrar veículo';
          break;
      }
    }

    this.populatedVehicles();
  }

}
