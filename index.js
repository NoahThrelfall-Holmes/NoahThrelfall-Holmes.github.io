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
    <div class="blog-container">
      <div class="projects-grid">
        <a href="blog/44225.html" class="project">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
            <text x="50" y="55" font-size="10" text-anchor="middle">26/02/25</text>
          </svg>
        </a>
        <a href="blog/54225.html" class="project">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
            <text x="50" y="55" font-size="10" text-anchor="middle">27/02/25</text>
          </svg>
        </a>
        <!-- Add more blog projects as needed -->
      </div>
      <div class="blog-content">
        <p>Select a bubble to view its content.</p>
      </div>
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

  // Additional behavior for blog projects
  if (catId === 'blog') {
  const blogProjects = detailsSection.querySelectorAll('.project');
  blogProjects.forEach(project => {
    project.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find the dedicated blog content container
      const blogContentDiv = detailsSection.querySelector('.blog-content');
      const currentHref = this.getAttribute('href');

      // If the same project is clicked again, clear the blog content
      if (blogContentDiv.dataset.active === currentHref) {
        blogContentDiv.innerHTML = '';
        blogContentDiv.dataset.active = '';
        return;
      }

      // Set the active project href
      blogContentDiv.dataset.active = currentHref;

      // Derive the text file path (e.g., "44225.html" becomes "44225.txt")
      const textFile = currentHref.replace('.html', '.txt');

      fetch(textFile)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(text => {
          // Update the blog content container
          blogContentDiv.innerHTML = `<pre>${text}</pre>`;
        })
        .catch(err => {
          console.error('Error fetching blog post:', err);
          blogContentDiv.innerHTML = `<p>Error loading blog post.</p>`;
        });
    });
  });
}

  // Recalculate layout on selection change
  recalcCategoryLayout();
});
  });

  // Recalculate if the SVG container is resized (optional)
    window.addEventListener('resize', recalcCategoryLayout);
    
    
});
