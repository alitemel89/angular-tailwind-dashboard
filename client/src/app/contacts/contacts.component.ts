// contacts.component.ts

import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  ngAfterViewInit(): void {
    // Call initFlowbite after the view has been initialized
    initFlowbite();
  }

  openEditModal(contactId: number) {
    // Find the contact by ID
    this.selectedContact =
      this.contacts.find((contact) => contact.id === contactId) || null;
  }
}

interface Contact {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
}
