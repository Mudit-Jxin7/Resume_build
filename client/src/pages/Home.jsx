import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const username = location.state && location.state.username;
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    gmail: "",
    skills: "",
    experience1: "",
    experience2: "",
    qualifications1: "",
    qualifications2: "",
  });
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    // Convert formData to x-www-form-urlencoded format
    const formBody = Object.keys(formData)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
      )
      .join("&");

    const response = await fetch("http://localhost:4000/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
      credentials: "include",
    });
    await response.json();
    navigate("/resume", { state: { formData } });
  }

  function clearForm() {
    setFormData({
      name: "",
      role: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      gmail: "",
      skills: "",
      experience1: "",
      experience2: "",
      qualifications1: "",
      qualifications2: "",
    });
  }

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    navigate("/");
  }

  return (
    <>
      <div className="header">
        <h1>Welcome {username}</h1>
        <button className="btn2" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <div className="personal-section">
            <h2>Personal Information</h2>

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />

            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />

            <label htmlFor="linkedin">LinkedIn:</label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <label htmlFor="github">GitHub:</label>
            <input
              type="text"
              id="github"
              name="github"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />

            <label htmlFor="gmail">Gmail:</label>
            <input
              type="text"
              id="gmail"
              name="gmail"
              value={formData.gmail}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>

          <div className="professional-section">
            <h2>Professional Information</h2>
            <div className="section">
              <h3>Skills</h3>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              ></textarea>
            </div>

            <div className="section">
              <h3>Work Experience</h3>
              <textarea
                name="experience1"
                value={formData.experience1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></textarea>
              <textarea
                name="experience2"
                value={formData.experience2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="section">
              <h3>Academic Qualifications</h3>
              <textarea
                name="qualifications1"
                value={formData.qualifications1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              ></textarea>
              <textarea
                name="qualifications2"
                value={formData.qualifications2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              ></textarea>
              <button type="submit" className="btn">
                Submit
              </button>
              <button className="btn" onClick={clearForm}>
                Clear Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
