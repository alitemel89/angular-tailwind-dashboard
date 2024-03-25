import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }


  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }
}

interface Contact {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
}
