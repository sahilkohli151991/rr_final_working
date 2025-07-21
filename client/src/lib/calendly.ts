export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/kohlisahil151991";

export function openCalendlyPopup() {
  // This would integrate with Calendly's popup widget
  // For now, we'll open in a new tab
  window.open(CALENDLY_URL, '_blank');
}

export function embedCalendlyWidget(elementId: string) {
  // This would embed the Calendly widget
  // For now, we'll create a simple iframe
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = `
      <iframe 
        src="${CALENDLY_URL}" 
        width="100%" 
        height="600" 
        frameborder="0"
        title="Schedule a call with RoleRaise"
      ></iframe>
    `;
  }
}
