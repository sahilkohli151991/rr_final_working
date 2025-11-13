// Add blinking animations for the dot and arrow, slower for dot, slower and bigger for arrow
const style = document.createElement('style');
style.innerHTML = `
@keyframes blink-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
.animate-blink-slow { animation: blink-slow 1.8s infinite; }
@keyframes arrow-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.animate-arrow-blink { animation: arrow-blink 1.5s infinite; }
`;
if (!document.head.querySelector('style[data-referral-badge]')) {
  style.setAttribute('data-referral-badge', 'true');
  document.head.appendChild(style);
}
