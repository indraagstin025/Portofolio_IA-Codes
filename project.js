const githubUsername = 'indraagstin025';

const selectedRepos = [
  "Sistem-Manajemen-Karyawan_Frontend",
  "Sistem-Manajemen-Karyawan_Backend"
];

async function fetchGithubProjects() {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';

  try {
    for (const repoName of selectedRepos) {
      const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}`);
      const project = await response.json();

      if (project && project.name) {
        const projectCard = document.createElement('div');
        projectCard.className =
          'bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1';

        projectCard.innerHTML = `
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            <a href="${project.html_url}" target="_blank"
              class="hover:text-[#3b82f6] transition-colors duration-200">${project.name}</a>
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            ${project.description || 'Deskripsi tidak tersedia.'}
          </p>
          
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-300">
            ${project.language ? `<span class="flex items-center"><i class="fa-solid fa-code mr-2"></i>${project.language}</span>` : ''}
            <span class="flex items-center"><i class="fa-solid fa-star mr-2"></i>${project.stargazers_count}</span>
          </div>

          <a href="${project.html_url}" target="_blank"
            class="mt-4 inline-block text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors duration-200">
            Lihat di GitHub &rarr;
          </a>

          <!-- Tombol lihat foto -->
          <button onclick="openModal('${project.name}')"
            class="mt-2 block text-green-500 hover:text-green-600 font-medium transition-colors duration-200">
            Lihat Foto
          </button>
        `;

        projectList.appendChild(projectCard);
      }
    }

    if (projectList.innerHTML === '') {
      projectList.innerHTML = `<p class="text-center text-gray-500">Tidak ada proyek yang ditemukan di GitHub.</p>`;
    }
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    projectList.innerHTML = `<p class="text-center text-red-500">Gagal memuat proyek.</p>`;
  }
}

function openModal(projectName) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');

  const projectImages = {
    "Sistem-Manajemen-Karyawan_Frontend": "assets/images/frontend.png",
    "Sistem-Manajemen-Karyawan_Backend": "assets/images/backend.png"
  };

  modalTitle.textContent = projectName;
  modalImage.src = projectImages[projectName] || "assets/images/default.png";

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById('project-modal').classList.add("hidden");
}

document.addEventListener('DOMContentLoaded', fetchGithubProjects);
