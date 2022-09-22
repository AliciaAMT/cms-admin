// import { Injectable } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
// import { doc, docData, Firestore } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class RolesService {

//   constructor(
//     private auth: Auth,
//     private firestore: Firestore
//   ) { }

//   getUserProfile() {
//     const user = this.auth.currentUser;
//     const userDocRef = doc(this.firestore, `users/${user.uid}`);
//     return docData(userDocRef, { idField: 'id' });
//   }

//   getRole() {
//     const role = this.getUserProfile().role;
//   }

// }
