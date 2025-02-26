document.addEventListener('DOMContentLoaded', function() {
  // Toggle nav menu (existing behavior)
  const toggleNavBtn = document.getElementById('toggleNavBtn');
  const navMenu = document.getElementById('collapsibleNav');
  toggleNavBtn.addEventListener('click', function() {
    navMenu.classList.toggle('open');
  });

  // Category click behavior
  const categories = document.querySelectorAll('.category');
  const detailsSection = document.getElementById('category-details');

  // Define custom grid content for each category
  const categoryContent = {
    blog: `
      <h2>Blog Projects</h2>
      <div class="projects-grid">
        <a href="44225.html" class="project">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
            <text x="50" y="55" font-size="10" text-anchor="middle">26/02/25</text>
          </svg>
        </a>
        <a href="54225.html" class="project">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
            <text x="50" y="55" font-size="10" text-anchor="middle">27/02/25</text>
          </svg>
        </a>
        <!-- Add more blog projects as needed -->
      </div>
    `,
    unity: `
      <h2>Unity Projects</h2>
      <div class="projects-grid">
        <a href="#" class="project">
          <svg viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80"></rect>
            <text x="50" y="55" font-size="12" text-anchor="middle">Unity Item 1</text>
          </svg>
        </a>
        <!-- Add more Unity projects as needed -->
      </div>
    `,
    unreal: `
      <h2>Unreal Projects</h2>
      <div class="projects-grid">
        <a href="#" class="project">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
            <text x="50" y="55" font-size="12" text-anchor="middle">Unreal Item 1</text>
          </svg>
        </a>
        <!-- Add more Unreal projects as needed -->
      </div>
    `,
    modelling: `
      <h2>Modelling Projects</h2>
      <div class="projects-grid">
        <a href="#" class="project">
          <svg viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80"></rect>
            <text x="50" y="55" font-size="12" text-anchor="middle">Modelling Item 1</text>
          </svg>
        </a>
        <!-- Add more Modelling projects as needed -->
      </div>
    `,
    misc: `
      <h2>Miscellaneous Projects</h2>
      <div class="projects-grid">
        <a href="#" class="project">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
            <text x="50" y="55" font-size="12" text-anchor="middle">Misc Item 1</text>
          </svg>
        </a>
        <!-- Add more Misc projects as needed -->
      </div>
    `
  };

  // Method to recalc the dimensions of the SVG boxes
  function recalcCategoryLayout() {
    const categoryMenuSvg = document.querySelector('.category-menu svg');
    const totalWidth = categoryMenuSvg.viewBox.baseVal.width || 400; // fallback width
    const categoryEls = document.querySelectorAll('.category-menu .category');
    const n = categoryEls.length;
    const activeCategory = document.querySelector('.category.active');

    // Define active box to take 50% of the total width; adjust as desired.
    let activeWidth, otherWidth;
    if (activeCategory) {
      activeWidth = totalWidth * 0.5;
      otherWidth = (totalWidth - activeWidth) / (n - 1);
    } else {
      activeWidth = otherWidth = totalWidth / n;
    }

    let currentX = 0;
    categoryEls.forEach(cat => {
      // Determine width based on active state
      let boxWidth = (cat === activeCategory) ? activeWidth : otherWidth;
      // Set rect attributes
      const rect = cat.querySelector('.category-rect');
      rect.setAttribute('x', currentX);
      rect.setAttribute('width', boxWidth);
      // Adjust text position to be centered within the rect
      const text = cat.querySelector('.category-text');
      text.setAttribute('x', currentX + boxWidth / 2);
      currentX += boxWidth;
    });
  }

  // Initial layout for the category menu
  recalcCategoryLayout();

  categories.forEach(function(categoryEl) {
    categoryEl.addEventListener('click', function() {
      // Remove active state from all categories, add from clicked one
      categories.forEach(el => el.classList.remove('active'));
      categoryEl.classList.add('active');
      
      // Get the custom content for the selected category
      const catId = categoryEl.getAttribute('data-category');
      detailsSection.innerHTML = categoryContent[catId] || `<p>No projects available for ${catId}.</p>`;

      // Recalculate layout on selection change
      recalcCategoryLayout();
    });
  });

  // Recalculate if the SVG container is resized (optional)
  window.addEventListener('resize', recalcCategoryLayout);
});