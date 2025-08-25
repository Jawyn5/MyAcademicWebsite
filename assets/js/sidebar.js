// Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const body = document.body;

  // Toggle sidebar function
  function toggleSidebar() {
    body.classList.toggle('sidebar-open');
    
    // Update aria-expanded attribute for accessibility
    const isOpen = body.classList.contains('sidebar-open');
    sidebarToggle.setAttribute('aria-expanded', isOpen);
    
    // Save state
    localStorage.setItem('sidebar-open', isOpen.toString());
  }

  // Close sidebar function
  function closeSidebar() {
    body.classList.remove('sidebar-open');
    sidebarToggle.setAttribute('aria-expanded', 'false');
    localStorage.setItem('sidebar-open', 'false');
  }

  // Open sidebar function
  function openSidebar() {
    body.classList.add('sidebar-open');
    sidebarToggle.setAttribute('aria-expanded', 'true');
    localStorage.setItem('sidebar-open', 'true');
  }

  // Event listeners
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Escape to close sidebar
    if (e.key === 'Escape' && body.classList.contains('sidebar-open')) {
      closeSidebar();
    }
    
    // Alt + S to toggle sidebar
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      toggleSidebar();
    }
  });

  // Prevent sidebar close when clicking inside sidebar
  if (sidebar) {
    sidebar.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    // Close sidebar on mobile when resizing
    if (window.innerWidth <= 768 && body.classList.contains('sidebar-open')) {
      closeSidebar();
    }
  });

  // Initialize ARIA attributes
  if (sidebarToggle) {
    sidebarToggle.setAttribute('aria-expanded', 'false');
    sidebarToggle.setAttribute('aria-controls', 'sidebar');
  }
  
  // Restore previous state (optional - you can enable this)
  // const sidebarState = localStorage.getItem('sidebar-open');
  // if (sidebarState === 'true') {
  //   openSidebar();
  // }
});
