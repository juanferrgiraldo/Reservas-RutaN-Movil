import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { MultiRoomService } from '../../services/multi-room.service';
import { Booking } from '../booking.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-multi-room',
  templateUrl: './multi-room.page.html',
  styleUrls: ['./multi-room.page.scss'],
})
export class MultiRoomPage implements OnInit {
  datesArray = new Array();
  showDatesArray = new Array();
  roomInfo = {
    id: '',
    nomenclature: '',
    capacity: 0
  };

  bookingForm: FormGroup;

  booking: Booking = {
    responsableId: '',
    responsable: '',
    organization: '',
    responsableEmail: '',
    responsablePhone: '',
    eventName: '',
    purpose: '',
    assistants: 0,
    resources: [],
    aditional: [],
    placeKind: 'multipleroom',
    placeId: '',
    initdate: null,
    finishdate: null,
    dates: null,
    distribution: ''
  };
  /**Variables para los checkbox y errores */
  videoBeam = false;
  internet = false;
  pointing = false;
  catering = false;
  sound = false;
  televisor = false;
  microphone = false;
  skype = false;
  /**Servicios adicionales */
  logistic = false;
  register = false;
  stewardess = false;
  translator = false;
  errorMessage = '';
  listOptions = [
    { id: 1, name: 'Distribución de mesa redonda' },
    { id: 2, name: 'Distribución plenaria' },
    { id: 3, name: 'Distribución con pasillo central' },
    { id: 4, name: 'Distribución en U' },
  ];
  isValidDate: Boolean = true;

  constructor(
    private multiRoomService: MultiRoomService,
    private bookingService: BookingService,
    private router: Router, private formBuilder: FormBuilder
  ) {
    /**Se coloca aqui y no en el ngOnInit para evitar que salgan errores */
    if (this.multiRoomService.getTransferComponent() === null ||
      this.multiRoomService.getTransferComponent() === undefined) {
      this.router.navigate(['/mapa/torrea']);
      return;
    }
    this.roomInfo = this.multiRoomService.getTransferComponent();
    this.booking.placeId = this.roomInfo.id;
    this.bookingForm = this.formBuilder.group({
      responsableId: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      responsable: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required),
      responsableEmail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      responsablePhone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(7), Validators.pattern('[0-9]+')])),
      eventName: new FormControl('', Validators.required),
      purpose: new FormControl('', Validators.required),
      assistants: new FormControl(0, Validators.compose([Validators.min(1), Validators.max(this.roomInfo.capacity)])),
      selectDist: new FormControl(0, Validators.compose([Validators.max(5), Validators.min(1)]))
    });
  }


  ngOnInit() {
    this.bookingForm.controls['responsableId'].valueChanges.pipe(debounceTime(1000))
      .subscribe(id => {
        if (id !== '') {
          this.loadResponsableData(id);
        }
      });
  }

  onSubmit() {
    const aditional = this.addServices();
    const resource = this.addResources();
    this.booking.resources = resource;
    this.booking.aditional = aditional;
    this.booking.dates = this.datesArray;
    const isValidInformation = this.completeData();
    if (isValidInformation) {
      this.organizeData();
      this.bookingService.createBooking(this.booking).subscribe(result => {
        if (result.message === 'La reserva ha sido creada con éxito') {
          this.clearData();
        }
      }, error => {
        console.log(error.message);
        alert('Error ' + <any>error.message);
      });
    } else {
      alert('Por favor complete los campos faltantes y/o verifique la información');
      return;
    }
  }

  goToHome() {
    this.router.navigate(['/mapa']);
  }

  private formatDate(date: Date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' +
      date.getFullYear() + ', ' + date.getHours() + ':0' + date.getMinutes();
  }

  /**Metodo para agregar fechas al array para mandar al back */
  addDate() {
    if (!(this.booking.initdate === undefined || this.booking.initdate == null ||
      this.booking.finishdate === undefined || this.booking.finishdate == null)) {
      this.isValidDate = true;
    }

    const initialDate = new Date(this.booking.initdate).getTime();
    const finalDate = new Date(this.booking.finishdate).getTime();
    const datenow = new Date().getTime();

    if (initialDate > finalDate) this.isValidDate = false;
    if (initialDate === finalDate) this.isValidDate = false;
    if (initialDate < datenow || finalDate < datenow) this.isValidDate = false;

    this.datesArray.forEach(value => {
      if (finalDate < new Date(value.initdate).getTime()
      || initialDate > new Date(value.finishdate).getTime() && this.isValidDate) {
        this.isValidDate = true;
      } else {
        this.isValidDate = false;
      }
    });

    if (this.isValidDate) {
      const data = {
        'initdate': this.booking.initdate,
        'finishdate': this.booking.finishdate
      };
      const showData = {
        'initdate': this.formatDate(new Date(this.booking.initdate)),
        'finishdate': this.formatDate(new Date(this.booking.finishdate))
      };

      this.bookingService.validateDate(data, this.booking.placeId)
        .subscribe(val => {
          if (val) {
            this.datesArray.push(data);
            this.showDatesArray.push(showData);
          } else {
            this.isValidDate = false;
          }
        });
      this.booking.initdate = null;
      this.booking.finishdate = null;
    }
  }

  removeDate(index) {
    this.datesArray.splice(index, 1);
    this.showDatesArray.splice(index, 1);
  }

  /**Metodo que agrega los servicios adiciionales que se seleccionan en el formulario */
  addServices() {
    const services = new Array<string>();
    if (this.logistic) {
      services.push('Operador logistico');
    }
    if (this.register) {
      services.push('Punto de registro');
    }
    if (this.stewardess) {
      services.push('Azafata');
    }
    if (this.translator) {
      services.push('Traductor');
    }
    return services;
  }


  /**Metodo que agrega los recursos que se seleccionen en el formulario */
  addResources() {
    const resources = new Array<string>();
    if (this.videoBeam) {
      resources.push('Video Beam');
    }
    if (this.internet) {
      resources.push('Internet');
    }
    if (this.pointing) {
      resources.push('Señalador');
    }
    if (this.catering) {
      resources.push('Catering(Cocineta)');
    }
    if (this.sound) {
      resources.push('Sonido');
    }
    if (this.televisor) {
      resources.push('Televisor');
    }
    if (this.microphone) {
      resources.push('Microfono');
    }
    if (this.skype) {
      resources.push('Conferencia en Skype');
    }
    return resources;
  }

  /**Metodo para buscar y mostrar la información de una persona responsable de la reserva,
   * esto se hace usando la identificación
   */
  loadResponsableData(responsableId) {
    this.bookingService.findResponsableInfo(responsableId).subscribe(result => {
      const data = result.message;
      if (data.length !== 0) {
        this.bookingForm.controls['responsable'].setValue(data.responsable);
        this.bookingForm.controls['responsablePhone'].setValue(data.responsablePhone);
        this.bookingForm.controls['responsableEmail'].setValue(data.responsableEmail);
        this.bookingForm.controls['organization'].setValue(data.organization);
      } else {
        this.bookingForm.controls['responsable'].setValue('');
        this.bookingForm.controls['responsablePhone'].setValue('');
        this.bookingForm.controls['responsableEmail'].setValue('');
        this.bookingForm.controls['organization'].setValue('');
      }
    });
  }

  /**Valida y completa todos los campos del formulario */
  completeData() {
    this.booking.responsable = this.bookingForm.controls['responsable'].value;
    this.booking.responsableId = this.bookingForm.controls['responsableId'].value;
    this.booking.responsableEmail = this.bookingForm.controls['responsableEmail'].value;
    this.booking.responsablePhone = this.bookingForm.controls['responsablePhone'].value;
    this.booking.eventName = this.bookingForm.controls['eventName'].value;
    this.booking.assistants = this.bookingForm.controls['assistants'].value;
    this.booking.purpose = this.bookingForm.controls['purpose'].value;
    this.booking.organization = this.bookingForm.controls['organization'].value;
    const numberDistribution = this.bookingForm.controls['selectDist'].value;

    if (numberDistribution === 0 || numberDistribution == null) {
      return false;
    } else {
      const position = numberDistribution - 1;
      this.booking.distribution = this.listOptions[position].name;
    }
    return true;

  }

  /**Pone organiza el contenido del json para evitar conflictos al enviar los datos.
   * ejemplo: poner todo en minusculas
   */
  organizeData() {
    this.booking.responsable = this.booking.responsable.toLocaleLowerCase();
    this.booking.responsableEmail = this.booking.responsableEmail.toLocaleLowerCase();
  }

  /**Limpia los campos de texto para evitar errores al salir o entrar en el servicio */
  clearData() {
    this.datesArray = new Array();
    this.showDatesArray = new Array();
    this.bookingForm.reset();
    this.booking.responsableId = '';
    this.booking.responsable = '';
    this.booking.organization = '';
    this.booking.responsableEmail = '';
    this.booking.responsablePhone = '';
    this.booking.eventName = '';
    this.booking.purpose = '';
    this.booking.assistants = 0;
    this.booking.resources = [];
    this.booking.aditional = [];
    this.booking.placeKind = 'multipleroom';
    this.booking.initdate = null;
    this.booking.finishdate = null;
    this.roomInfo.capacity = 0;
    this.videoBeam = false;
    this.internet = false;
    this.pointing = false;
    this.catering = false;
    this.sound = false;
    this.televisor = false;
    this.microphone = false;
    this.skype = false;
    this.logistic = false;
    this.register = false;
    this.stewardess = false;
    this.translator = false;
    this.errorMessage = '';
  }
}
