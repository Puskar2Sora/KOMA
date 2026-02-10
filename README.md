<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=60&pause=500&color=785j8j5&center=true&vCenter=true&width=500&height=100&lines=KOMA;GPS-FIRST;PRECISION" alt="KOMA Header" />
  <h3>🏠 Key Optimized Managed Accommodation</h3>
  <p><i>"Transforming Urban Complexity into Managed Simplicity."</i></p>

  <p>
    <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge&logo=vercel" />
    <img src="https://img.shields.io/badge/Backend-Render-E33332?style=for-the-badge&logo=render" />
    <img src="https://img.shields.io/badge/Security-Google_OAuth-4285F4?style=for-the-badge&logo=google" />
    <img src="https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb" />
  </p>

  <a href="https://koma-zeta.vercel.app"><strong> Explore the Live App »</strong></a>
  <br />
</div>

<hr />
## 🌟 The Vision
The current rental market is a maze of vague descriptions and "hidden" locations. **KOMA** is a **GPS-First Discovery platform** built to solve the last-mile problem in urban relocation. By shifting the focus from text to coordinates, we ensure 100% location accuracy.

<table width="100%">
  <tr>
    <td width="50%">
      <h3>🚫 The Problem</h3>
      <ul>
        <li>Vague "landmark-based" addresses</li>
        <li>High broker commissions/middlemen</li>
        <li>Insecure login processes</li>
        <li>Outdated, non-responsive UI</li>
      </ul>
    </td>
    <td width="50%">
      <h3>✅ The KOMA Solution</h3>
      <ul>
        <li><b>Leaflet.js</b> Precise GPS Pinning</li>
        <li>Direct Owner-to-Tenant bridge</li>
        <li><b>Google OAuth 2.0</b> secure sessions</li>
        <li>Cloud-native MERN architecture</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Technical Architecture
KOMA operates on a modern, decoupled 3-tier architecture to ensure maximum uptime and lightning-fast geospatial queries.

<div align="center">
  <br />
  
  <div align="center">
  <h3>🛠️ KOMA: Full-Stack Connectivity Flow</h3>
  <br />

  <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
    <tr>
      <td align="center">
        <div style="border: 2px solid #000; padding: 15px; border-radius: 10px; background: #fafafa; width: 180px;">
          <b>User Client</b><br/>
          <small>React.js + Leaflet</small>
        </div>
      </td>
    </tr>
    <tr>
      <td align="center"><div style="width: 2px; height: 30px; background: #333;"></div></td>
    </tr>
    <tr>
      <td align="center">
        <div style="border: 2px solid #4285F4; padding: 15px; border-radius: 10px; background: #e8f0fe; width: 180px;">
          <b>Auth Gateway</b><br/>
          <small>Google OAuth 2.0</small>
        </div>
      </td>
    </tr>
    <tr>
      <td align="center"><div style="width: 2px; height: 30px; background: #333;"></div></td>
    </tr>
    <tr>
      <td align="center">
        <div style="border: 2px solid #339933; padding: 15px; border-radius: 10px; background: #e6ffed; width: 180px;">
          <b>Logic Engine</b><br/>
          <small>Node.js & Express</small>
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center"><div style="width: 2px; height: 20px; background: #333;"></div></td>
          </tr>
          <tr>
            <td><div style="width: 200px; height: 2px; background: #333;"></div></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center">
        <table border="0" cellspacing="0" cellpadding="0" width="400">
          <tr>
            <td align="center" width="50%"><div style="width: 2px; height: 20px; background: #333;"></div></td>
            <td align="center" width="50%"><div style="width: 2px; height: 20px; background: #333;"></div></td>
          </tr>
          <tr>
            <td align="center">
              <div style="border: 2px solid #47A248; padding: 10px; border-radius: 10px; background: #f6ffed; width: 150px;">
                <b>Cloud DB</b><br/>
                <small>MongoDB Atlas</small>
              </div>
            </td>
            <td align="center">
              <div style="border: 2px solid #199903; padding: 10px; border-radius: 10px; background: #fcfffa; width: 150px;">
                <b>Geo Engine</b><br/>
                <small>2dsphere Indexing</small>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <br />
  <p><i>This diagram illustrates the secure, bi-directional data flow from the user's GPS pin to our cloud-hosted persistence layer.</i></p>
</div>
  <br />

  <br />
</div>

### **Core Systems:**
* **Identity Provider:** Managed sessions via Google Identity Services.
* **Geospatial Engine:** **MongoDB 2dsphere indexing** for real-time proximity calculations.
* **Persistent Logic:** Node.js/Express API deployed on **Render** with 24/7 uptime via automated cron-jobs.

---

## 🚀 Key Features & UI

<table width="100%">
  <tr>
    <td><b>Interactive Maps</b></td>
    <td>Live GPS pinning with neighborhood context via Leaflet.js.</td>
  </tr>
  <tr>
    <td><b>Secure Auth</b></td>
    <td>Enterprise-grade Google Login integration.</td>
  </tr>
  <tr>
    <td><b>Direct Inquiry</b></td>
    <td>Structured communication channel directly with property owners.</td>
  </tr>
  <tr>
    <td><b>Performance</b></td>
    <td>Optimized data fetching and cloud-native deployment.</td>
  </tr>
</table>

---

## 📦 Tech Stack
<div align="center">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,vercel,git,js,html,css" />
</div>
<br></br>

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js, Framer Motion | High-performance, aesthetic UI |
| **Maps** | Leaflet.js | Geospatial rendering & Pinning |
| **Backend** | Node.js, Express.js | REST API & Business Logic |
| **Database** | MongoDB Atlas | Cloud document storage & indexing |
| **Auth** | Passport.js, JWT | Secure identity management |

---

## 🛤️ Roadmap
- [x] **Phase 1**: Core MERN setup & Map Integration
- [x] **Phase 2**: Google OAuth & Cloud Deployment
- [ ] **Phase 3**: Aadhaar-based User Verification
- [ ] **Phase 4**: 3D Property Walkthroughs

---

## 👥 The Team
**Puskar Nath** – *Full-Stack Architect*
**Arpan Sadhak** - *Frontend*
- **Focus:** MERN stack, Cloud Deployment, & Auth Security.

---
<hr />

<div align="center">
  <h2>⚙️ Backend Architecture & Core Logic</h2>
  <p>The KOMA backend is a high-performance, secure REST API built for 100% uptime and precision geospatial delivery.</p>
</div>

<table width="100%">
  <tr style="background-color: #f8f9fa;">
    <th width="33%">🔐 Identity & Security</th>
    <th width="33%">🛰️ Geospatial Engine</th>
    <th width="33%">☁️ Cloud Infrastructure</th>
  </tr>
  
  <tr>
    <td valign="top">
      <ul>
        <li><b>Passport.js Strategy</b>: Seamlessly integrated with <b>Google OAuth 2.0</b> for managed identity.</li>
        <li><b>JWT Sessions</b>: Secure, stateless authentication using <b>JsonWebTokens</b> for persistent logins.</li>
        <li><b>Middleware</b>: Custom <code>authMiddleware</code> to protect private listing and profile routes.</li>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><b>2dsphere Indexing</b>: Utilizes MongoDB's high-performance coordinate indexing for O(1) location lookups.</li>
        <li><b>Leaflet Integration</b>: Backend serves GeoJSON-ready data for real-time map pin rendering.</li>
        <li><b>Precision Querying</b>: Custom filtering logic ensures users find property within exact GPS radii.</li>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><b>Environment Management</b>: Fully decoupled <code>.env</code> setup for local vs. production parity.</li>
        <li><b>Render Deployment</b>: Hosted on <b>Render Web Services</b> with automated CI/CD from GitHub.</li>
        <li><b>Uptime Monitoring</b>: Active 10-minute heartbeat via <b>cron-job.org</b> to eliminate cold starts.</li>
      </ul>
    </td>
  </tr>
</table>

<br />

<div align="center">
  <h3>🚀 Key Backend Endpoints</h3>
  <table border="1" cellpadding="10" style="border-collapse: collapse; width: 80%; text-align: left;">
    <tr style="background-color: #000; color: #fff;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Functionality</th>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/api/auth/google</code></td>
      <td>Initializes secure Google Identity handshake.</td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/api/rooms</code></td>
      <td>Fetches all property listings with GPS coordinates.</td>
    </tr>
    <tr>
      <td><code>POST</code></td>
      <td><code>/api/auth/register</code></td>
      <td>Handles secure user signup via custom controller logic.</td>
    </tr>
    <tr>
      <td><code>PUT</code></td>
      <td><code>/api/auth/profile-photo</code></td>
      <td>Manages binary file uploads for user profiles.</td>
    </tr>
  </table>
</div>

<br />

<div align="center">
  <p><i>"A backend built not just for the hackathon, but for production-scale urban housing discovery."</i></p>
  <img src="https://img.shields.io/badge/Maintained%3F-Yes-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/PRs-Welcome-blue?style=flat-square" />
</div>

<div align="center">
  <table border="0">
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/PLATFORM-KOMA-black?style=for-the-badge" height="35" />
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/STATUS-LIVE-brightgreen?style=for-the-badge" height="35" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        <p><i>Building the future of urban discovery with MERN & GPS Precision.</i></p>
      </td>
    </tr>
  </table>
</div>
<div align="center">
  <p>Developed with Life </p>
  <a href="https://github.com/Puskar2Sora/KOMA"><b>Back to Top ↑</b></a>
</div>
