import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  getContacts() {
    // Generate dummy contacts
    return [
      { id: 1, name: 'Neil Sims', email: 'neil.sims@flowbite.com', position: 'React Developer', status: 'Online' },
      { id: 2, name: 'Bonnie Green', email: 'bonnie@flowbite.com', position: 'Designer', status: 'Online' },
      { id: 3, name: 'Jese Leos', email: 'jese@flowbite.com', position: 'Vue JS Developer', status: 'Online' },
      { id: 4, name: 'Thomas Lean', email: 'thomes@flowbite.com', position: 'UI/UX Engineer', status: 'Online' },
      { id: 5, name: 'Leslie Livingston', email: 'leslie@flowbite.com', position: 'SEO Specialist', status: 'Offline' }
    ];
}
}
