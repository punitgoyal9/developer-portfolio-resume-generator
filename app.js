document.addEventListener('DOMContentLoaded', () => {
  // Static Form Inputs
  const inputName = document.getElementById('inputName');
  const inputEmail = document.getElementById('inputEmail');
  const inputGithub = document.getElementById('inputGithub');
  const inputAbout = document.getElementById('inputAbout');
  const inputLanguages = document.getElementById('inputLanguages');
  const inputTech = document.getElementById('inputTech');
  const inputInterests = document.getElementById('inputInterests');
  const themeSelect = document.getElementById('themeSelect');

  // Preview Elements
  const previewCard = document.getElementById('resumePreview');
  const previewName = document.getElementById('previewName');
  const previewEmail = document.getElementById('previewEmail');
  const previewGithub = document.getElementById('previewGithub');
  const previewAbout = document.getElementById('previewAbout');
  const previewLanguages = document.getElementById('previewLanguages');
  const previewTech = document.getElementById('previewTech');
  const previewEducation = document.getElementById('previewEducation');
  const previewExperience = document.getElementById('previewExperience');
  const previewProjects = document.getElementById('previewProjects');
  const previewInterests = document.getElementById('previewInterests');

  // Dynamic Lists Containers
  const educationList = document.getElementById('educationList');
  const experienceList = document.getElementById('experienceList');
  const projectList = document.getElementById('projectList');
  const addEduBtn = document.getElementById('addEduBtn');
  const addExpBtn = document.getElementById('addExpBtn');
  const addProjBtn = document.getElementById('addProjBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');

  // Helper for real-time text binding
  function bindInput(input, element, fallbackText) {
    input.addEventListener('input', () => {
      element.textContent = input.value.trim() || fallbackText;
    });
  }

  // Bind Personal Details & Static Fields
  bindInput(inputName, previewName, 'First Last');
  bindInput(inputEmail, previewEmail, 'name@email.com');
  bindInput(inputGithub, previewGithub, 'github.com/name');
  bindInput(inputAbout, previewAbout, 'After a rewarding experience, I decided to focus on software development and building scalable applications.');
  bindInput(inputLanguages, previewLanguages, 'Rust, JavaScript, TypeScript, Python, C++');
  bindInput(inputTech, previewTech, 'React, Node.js, Docker, Git, PostgreSQL, AWS');
  bindInput(inputInterests, previewInterests, 'Rock Climbing, Open Source Contribution, Distance Running');

  // Dynamic Theme Switching
  themeSelect.addEventListener('change', (e) => {
    previewCard.className = `preview-card theme-${e.target.value}`;
  });

  // ================= 1. DYNAMIC EDUCATION MANAGEMENT =================
  let eduCount = 0;

  function createEduItem() {
    eduCount++;
    const id = `edu-${eduCount}`;

    const eduDiv = document.createElement('div');
    eduDiv.className = 'edu-item';
    eduDiv.dataset.id = id;
    eduDiv.innerHTML = `
      <div class="form-group">
        <label>Degree & Institution</label>
        <input type="text" class="edu-title-input" placeholder="e.g. 42 Paris – Master in Information Technology" />
      </div>
      <div class="form-group">
        <label>Duration / Year</label>
        <input type="text" class="edu-duration-input" placeholder="e.g. Expected 2026" />
      </div>
      <div class="form-group">
        <label>Key Highlights (Newlines for bullet points)</label>
        <textarea class="edu-desc-input" rows="2" placeholder="Successfully completed curriculum in top 5%...\nSelected as a tutor for piscine..."></textarea>
      </div>
      <button type="button" class="btn btn-danger remove-edu-btn">Remove Education</button>
    `;

    const previewEduDiv = document.createElement('div');
    previewEduDiv.className = 'edu-preview-item';
    previewEduDiv.dataset.id = id;
    previewEduDiv.innerHTML = `
      <div class="exp-header-row">
        <h4 class="preview-edu-title">42 Paris – Master in Information Technology</h4>
        <span class="edu-duration preview-edu-duration">Expected 2026</span>
      </div>
      <ul class="edu-bullets preview-edu-desc">
        <li>Successfully completed curriculum as one of the top students.</li>
      </ul>
    `;

    educationList.appendChild(eduDiv);
    previewEducation.appendChild(previewEduDiv);

    const titleInput = eduDiv.querySelector('.edu-title-input');
    const durationInput = eduDiv.querySelector('.edu-duration-input');
    const descInput = eduDiv.querySelector('.edu-desc-input');
    const removeBtn = eduDiv.querySelector('.remove-edu-btn');

    titleInput.addEventListener('input', () => {
      previewEduDiv.querySelector('.preview-edu-title').textContent = titleInput.value.trim() || 'Degree & Institution';
    });

    durationInput.addEventListener('input', () => {
      previewEduDiv.querySelector('.preview-edu-duration').textContent = durationInput.value.trim() || 'Expected Year';
    });

    descInput.addEventListener('input', () => {
      const lines = descInput.value.split('\n').filter(line => line.trim() !== '');
      const bulletsList = previewEduDiv.querySelector('.preview-edu-desc');
      bulletsList.innerHTML = '';

      if (lines.length === 0) {
        bulletsList.innerHTML = '<li>Academic achievement or key course details...</li>';
        return;
      }

      lines.forEach(line => {
        const li = document.createElement('li');
        li.textContent = line.trim();
        bulletsList.appendChild(li);
      });
    });

    removeBtn.addEventListener('click', () => {
      eduDiv.remove();
      previewEduDiv.remove();
    });
  }

  // ================= 2. DYNAMIC EXPERIENCE MANAGEMENT =================
  let expCount = 0;

  function createExpItem() {
    expCount++;
    const id = `exp-${expCount}`;

    const expDiv = document.createElement('div');
    expDiv.className = 'exp-item';
    expDiv.dataset.id = id;
    expDiv.innerHTML = `
      <div class="form-group">
        <label>Company Name & Role (In Bracket)</label>
        <input type="text" class="exp-title-input" placeholder="e.g. Start-up (Software Engineer Intern)" />
      </div>
      <div class="form-group">
        <label>Years / Duration</label>
        <input type="text" class="exp-duration-input" placeholder="e.g. Nov 2024 – May 2025" />
      </div>
      <div class="form-group">
        <label>Description (Newlines for bullet points)</label>
        <textarea class="exp-desc-input" rows="3" placeholder="Contributed to continuous evolution...\nDeveloped password change feature..."></textarea>
      </div>
      <button type="button" class="btn btn-danger remove-exp-btn">Remove Experience</button>
    `;

    const previewExpDiv = document.createElement('div');
    previewExpDiv.className = 'exp-preview-item';
    previewExpDiv.dataset.id = id;
    previewExpDiv.innerHTML = `
      <div class="exp-header-row">
        <h4 class="preview-exp-title">Start-up (Software Engineer Intern)</h4>
        <span class="exp-duration preview-exp-duration">Nov 2024 – May 2025</span>
      </div>
      <ul class="exp-bullets preview-exp-desc">
        <li>Contributed to continuous evolution of application features.</li>
      </ul>
    `;

    experienceList.appendChild(expDiv);
    previewExperience.appendChild(previewExpDiv);

    const titleInput = expDiv.querySelector('.exp-title-input');
    const durationInput = expDiv.querySelector('.exp-duration-input');
    const descInput = expDiv.querySelector('.exp-desc-input');
    const removeBtn = expDiv.querySelector('.remove-exp-btn');

    titleInput.addEventListener('input', () => {
      previewExpDiv.querySelector('.preview-exp-title').textContent = titleInput.value.trim() || 'Start-up (Software Engineer Intern)';
    });

    durationInput.addEventListener('input', () => {
      previewExpDiv.querySelector('.preview-exp-duration').textContent = durationInput.value.trim() || 'Nov 2024 – May 2025';
    });

    descInput.addEventListener('input', () => {
      const lines = descInput.value.split('\n').filter(line => line.trim() !== '');
      const bulletsList = previewExpDiv.querySelector('.preview-exp-desc');
      bulletsList.innerHTML = '';

      if (lines.length === 0) {
        bulletsList.innerHTML = '<li>Key achievement or responsibilities description...</li>';
        return;
      }

      lines.forEach(line => {
        const li = document.createElement('li');
        li.textContent = line.trim();
        bulletsList.appendChild(li);
      });
    });

    removeBtn.addEventListener('click', () => {
      expDiv.remove();
      previewExpDiv.remove();
    });
  }

  // ================= 3. DYNAMIC PROJECTS MANAGEMENT =================
  let projCount = 0;

  function createProjItem() {
    projCount++;
    const id = `proj-${projCount}`;

    const projDiv = document.createElement('div');
    projDiv.className = 'proj-item';
    projDiv.dataset.id = id;
    projDiv.innerHTML = `
      <div class="form-group">
        <label>Project Title</label>
        <input type="text" class="proj-title-input" placeholder="e.g. Tetris on a Custom Kernel" />
      </div>
      <div class="form-group">
        <label>Tech Stack / Role</label>
        <input type="text" class="proj-tech-input" placeholder="e.g. Rust, x86 Assembly" />
      </div>
      <div class="form-group">
        <label>Description (Newlines for bullet points)</label>
        <textarea class="proj-desc-input" rows="3" placeholder="Created a bootable kernel in Rust...\nImplemented memory management..."></textarea>
      </div>
      <button type="button" class="btn btn-danger remove-proj-btn">Remove Project</button>
    `;

    const previewProjDiv = document.createElement('div');
    previewProjDiv.className = 'proj-preview-item';
    previewProjDiv.dataset.id = id;
    previewProjDiv.innerHTML = `
      <div class="exp-header-row">
        <h4 class="preview-proj-title">Tetris on a Custom Kernel</h4>
        <span class="proj-tech preview-proj-tech">Rust, x86 Assembly</span>
      </div>
      <ul class="proj-bullets preview-proj-desc">
        <li>Created a bootable kernel in Rust using GRUB.</li>
      </ul>
    `;

    projectList.appendChild(projDiv);
    previewProjects.appendChild(previewProjDiv);

    const titleInput = projDiv.querySelector('.proj-title-input');
    const techInput = projDiv.querySelector('.proj-tech-input');
    const descInput = projDiv.querySelector('.proj-desc-input');
    const removeBtn = projDiv.querySelector('.remove-proj-btn');

    titleInput.addEventListener('input', () => {
      previewProjDiv.querySelector('.preview-proj-title').textContent = titleInput.value.trim() || 'Project Title';
    });

    techInput.addEventListener('input', () => {
      previewProjDiv.querySelector('.preview-proj-tech').textContent = techInput.value.trim() || 'Tech Stack';
    });

    descInput.addEventListener('input', () => {
      const lines = descInput.value.split('\n').filter(line => line.trim() !== '');
      const bulletsList = previewProjDiv.querySelector('.preview-proj-desc');
      bulletsList.innerHTML = '';

      if (lines.length === 0) {
        bulletsList.innerHTML = '<li>Key features or project highlights...</li>';
        return;
      }

      lines.forEach(line => {
        const li = document.createElement('li');
        li.textContent = line.trim();
        bulletsList.appendChild(li);
      });
    });

    removeBtn.addEventListener('click', () => {
      projDiv.remove();
      previewProjDiv.remove();
    });
  }

  // Initialize Default Items
  addEduBtn.addEventListener('click', createEduItem);
  addExpBtn.addEventListener('click', createExpItem);
  addProjBtn.addEventListener('click', createProjItem);

  createEduItem();
  createExpItem();
  createProjItem();

  // High Quality PDF Export
  downloadPdfBtn.addEventListener('click', () => {
    const element = document.getElementById('resumePreview');
    const name = inputName.value.trim() || 'Resume';

    const elementWidth = 8.5;
    const elementHeight = (element.offsetHeight / 96) + 0.2;

    const opt = {
      margin:0.3,
      filename:`${name}_Resume.pdf`,
      image:{ type: 'jpeg', quality: 1.0 },
      html2canvas:{
        scale: 3,
        useCORS: true,
        letterRendering: true,
        logging: false,
        scrollY: 0
      },
      jsPDF:{ unit: 'in', format: [elementWidth, elementHeight], orientation: 'portrait', compress: true }
    };

    html2pdf().set(opt).from(element).save();
  });
});