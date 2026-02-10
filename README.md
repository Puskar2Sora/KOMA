<div align="center">
  <img src="https://capsule-render.vercel.app/render?type=soft&color=auto&height=200&section=header&text=KOMA&fontSize=90&animation=fadeIn" width="100%" />

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

<div align="center">
  <p>Developed with Life </p>
  <a href="https://github.com/Puskar2Sora/KOMA"><b>Back to Top ↑</b></a>
</div>
