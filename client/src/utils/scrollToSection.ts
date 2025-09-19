/**
 * Smoothly scrolls to a section on the page
 * @param sectionId The ID of the section to scroll to (without the #)
 * @param behavior Scroll behavior ('auto' | 'smooth')
 */
export const scrollToSection = (sectionId: string, behavior: ScrollBehavior = 'smooth') => {
  // If we're not on the homepage, navigate there first
  if (window.location.pathname !== '/') {
    // Store the section ID to scroll to after navigation
    sessionStorage.setItem('scrollToSection', sectionId);
    window.location.href = `/#${sectionId}`;
    return;
  }

  // If we're already on the homepage, just scroll to the section
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior,
      block: 'start'
    });
  }
};

// Check for a stored section to scroll to after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const sectionId = sessionStorage.getItem('scrollToSection');
    if (sectionId) {
      // Use setTimeout to ensure the page has fully rendered
      setTimeout(() => {
        scrollToSection(sectionId, 'smooth');
        sessionStorage.removeItem('scrollToSection');
      }, 100);
    }
  });
}
