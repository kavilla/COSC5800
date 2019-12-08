export default class ParticipatorModel {

  constructor(
    email,
    password,
    firstname,
    minit,
    lastname,
    phone,
    affiliation,
    isAuthor,
    isReviewer) {
      this.email = email;
      this.password = password;
      this.firstname = firstname;
      this.minit = minit;
      this.lastname = lastname;
      this.phone = phone;
      this.affiliation = affiliation;
      this.isAuthor = isAuthor;
      this.isReviewer = isReviewer;
  }

}
