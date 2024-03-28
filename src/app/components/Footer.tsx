import "../App.css";

const AppFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>HealthAxisPlanner</h3>
            <p>
              A platform to streamline the appointment process between doctors
              and patients.
            </p>
          </div>
          <div className="footer-right">
            <h4>Contact Us</h4>
            <p>Email: info@healthaxisplanner.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 HealthAxisPlanner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
