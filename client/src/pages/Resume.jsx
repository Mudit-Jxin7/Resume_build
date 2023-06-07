import "./Resume.css";
import { useLocation, Link } from "react-router-dom";

const Resume = () => {
  const location = useLocation();
  const { formData } = location.state;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume">
      <div className="resume-header">
        <h1>{formData.name}</h1>
        <p>{formData.role}</p>
      </div>

      <div className="resume-contact">
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Phone:</strong> (123) {formData.phone}
        </p>
        <p>
          <strong>Email:</strong> <Link>{formData.gmail}</Link>
        </p>
        <p>
          <strong>Github:</strong>
          <Link>{formData.github}</Link>
        </p>
        <p>
          <strong>LinkedIn:</strong> <Link>{formData.linkedin}</Link>
        </p>
      </div>

      <div className="resume-section">
        <h2>Skills</h2>
        <ul>
          {formData.skills.split("\n").map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="resume-section">
        <h2>Academic Qualifications</h2>
        <ul>
          <li>
            {formData.qualifications1.split("\n").map((skill, index) => (
              <p key={index} className="para">
                {skill}
              </p>
            ))}
          </li>
          <li>
            {formData.qualifications2.split("\n").map((skill, index) => (
              <p key={index} className="para">
                {skill}
              </p>
            ))}
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Work Experience</h2>
        <ul>
          <li>
            {formData.experience1.split("\n").map((skill, index) => (
              <p key={index} className="para">
                {skill}
              </p>
            ))}
          </li>
          <li>
            {formData.experience2.split("\n").map((skill, index) => (
              <p key={index} className="para">
                {skill}
              </p>
            ))}
          </li>
        </ul>
      </div>
      <div className="download-button">
        <button onClick={handlePrint}>Download Resume</button>
      </div>
    </div>
  );
};

export default Resume;
