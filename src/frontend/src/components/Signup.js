// import { render } from "@testing-library/react";
import React from "react";
import "../assets/css/signup.css";
import signupImg from "../assets/img/signup.svg";

const emailRegex = RegExp(
	/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&*\d]{8,}$/);

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			email: null,
			contact: null,
			password: null,
			confPassword: null,
			formErrors: {
				name: "",
				email: "",
				contact: "",
				password: "",
				confPassword: "",
			},
		};
	}

	formValid = ({ formErrors, contact, ...rest }) => {
		let valid = true;

		// validate form errors being empty
		Object.values(formErrors).forEach((val) => {
			if (val.length > 0) {
				valid = false;
			}
		});

		// validate null form
		Object.keys(rest).forEach((val) => {
			// console.log(val);
			if (this.state[val] === null) {
				valid = false;
				this.setState((prevState) => ({
					formErrors: {
						...prevState.formErrors,
						[val]: "Please fill this form samjhe",
					},
				}));
				console.log(this.state.formErrors);
			}
			// console.log(this.state);
		});

		return valid;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		// console.log("no reload again");
		if (this.formValid(this.state)) {
			console.log(`
        --SUBMITTING--
      `);
		} else {
			console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
		}
	};

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case "name":
				formErrors.name =
					value.length < 5 ? "minimum 5 characaters required" : "";
				break;
			case "email":
				formErrors.email = emailRegex.test(value)
					? ""
					: "invalid email address";
				break;
			case "contact":
				formErrors.contact =
					value.length > 0 && value.length !== 10
						? "10 characaters required"
						: "";
				break;
			case "password":
				formErrors.password = passwordRegex.test(value)
					? ""
					: "invalid password";
				break;
			case "confPassword":
				formErrors.confPassword =
					this.state.password === value
						? ""
						: "Passwords do not match";
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value });
	};

	showPassword = (event) => {
		// console.log(event.target.previousSibling);
		event.target.previousSibling.type === "password"
			? (event.target.previousSibling.type = "text")
			: (event.target.previousSibling.type = "password");

		event.target.classList.value =
			event.target.classList.value === "far fa-eye show-eye"
				? "fas fa-eye-slash show-eye"
				: "far fa-eye show-eye";
	};

	render() {
		const formErrors = this.state.formErrors;

		return (
			<div className="signup-container">
				<div className="signup">
					<div className="signup-form-container">
						<form
							onSubmit={this.handleSubmit}
							className="signup-form">
							<h1 className="form-title">Sign Up</h1>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.name.length > 0
											? "form-group error"
											: "form-group"
									}
									type="text"
									name="name"
									placeholder="Full Name*"
									onChange={this.handleChange}
									autoFocus
								/>

								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										At least 5 characaters
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.email.length > 0
											? "form-group error"
											: "form-group"
									}
									name="email"
									id="email"
									placeholder="Email*"
									onChange={this.handleChange}
								/>
								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										don't forget @
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.contact.length > 0
											? "form-group error"
											: "form-group"
									}
									type="number"
									name="contact"
									placeholder="Contact Number"
									onChange={this.handleChange}
								/>
								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										without 0 or +91
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.password.length > 0
											? "form-group error"
											: "form-group"
									}
									type="password"
									name="password"
									placeholder="Password*"
									onChange={this.handleChange}
								/>
								<i
									className="far fa-eye show-eye"
									onClick={this.showPassword}></i>
								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										Minimum eight characters, at least one
										letter and one number, allowed special
										characaters !@#$%^&*, space not allowed
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.confPassword.length > 0
											? "form-group error"
											: "form-group"
									}
									type="password"
									name="confPassword"
									placeholder="Confirm password*"
									onChange={this.handleChange}
								/>
								<i
									className="far fa-eye show-eye"
									onClick={this.showPassword}></i>
							</div>
							<label
								htmlFor="agree-terms"
								className="form-group agree">
								<input
									type="checkbox"
									name="agree-terms"
									id="agree-terms"
									required
								/>
								I agree to Terms and Conditions
							</label>
							<input
								type="submit"
								name="submit-btn"
								id="submit-btn"
								className="form-group submit-btn"
								value="Signup"
							/>
						</form>
					</div>
					<div className="signup-img-container">
						<img
							className="signup-img"
							src={signupImg}
							alt="Advolet signup"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
