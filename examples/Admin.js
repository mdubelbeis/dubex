class Admin {
  _firstName;
  _lastName;
  _email;

  constructor(firstName, lastName, email) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

	getEmail() {
		return this._email;
	}

	setEmail(email) {
		this._email = email;
	}

	getLastName() {
		return this._lastName;
	}

	setLastName(lastName) {
		this._lastName = lastName;
	}

	getFirstName() {
		return this._firstName;
	}

	setFirstName(firstName) {
		this._firstName = firstName;
	}
}
