import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmailDetails } from 'src/app/model/email-details';
import { EmailSendService } from 'src/app/services/emailService.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public formContact: FormGroup;

  public dataset: EmailDetails = new EmailDetails(); 

  constructor(private serviceEmail: EmailSendService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.buildFrom();
  }
  private buildFrom() {
    this.formContact = new FormGroup({});
    this.formContact.addControl('inputFirstName', new FormControl('', [Validators.required]));
    this.formContact.addControl('inputLastName', new FormControl('', [Validators.required]));
    this.formContact.addControl('inputEmail', new FormControl('', [Validators.required]));
    this.formContact.addControl('inputPhone', new FormControl('', [Validators.required]));
    this.formContact.addControl('inputMessage', new FormControl('', [Validators.required]));


  }

  Mail() {

    this.dataset.firstName = this.formContact.controls.inputFirstName.value;
    this.dataset.lastName = this.formContact.controls.inputLastName.value;
    this.dataset.email = this.formContact.controls.inputEmail.value;
    this.dataset.phone = this.formContact.controls.inputPhone.value;
    this.dataset.message = this.formContact.controls.inputMessage.value;

    this.serviceEmail.getdetails(this.dataset).subscribe(data => {
      this.messageService.add({severity:'info', summary:'Exito!', detail:'Se ha Enviado el correo correctamente.'});
    });

  }
}

