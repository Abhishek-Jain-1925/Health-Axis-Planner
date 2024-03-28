import "../App.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          HealthAxisPlanner is a platform designed to streamline the appointment
          process between doctors and patients. It aims to provide a convenient
          and efficient way for patients to schedule appointments with their
          healthcare providers.
        </p>
        <ul className="">
          <li>
            <strong>Our platform offers features such as:</strong>
          </li>
          <li>- Easy appointment scheduling</li>
          <li>- Secure patient-doctor communication</li>
          <li>- Access to medical records</li>
          <li>- And much more...</li>
        </ul>
        <p>
          Whether you're a patient seeking medical care or a doctor managing
          appointments, HealthAxisPlanner is here to simplify the process and
          improve the overall healthcare experience.
        </p>
        <br></br>
        <h2>We are Here for serve you the best!</h2>
      </div>
    </div>
  );
};

export default AboutPage;
