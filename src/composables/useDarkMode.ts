// src/composables/useDarkMode.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('dark', isDarkMode.value);
    localStorage.setItem('dark-mode', isDarkMode.value.toString());
  };

  const updateDarkMode = (e?: MediaQueryListEvent) => {
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode) {
      isDarkMode.value = savedMode === 'true';
    } else {
      isDarkMode.value = e ? e.matches : window.matchMedia('(prefers-color-scheme: dark)').matches;
      localStorage.setItem('dark-mode', isDarkMode.value.toString());
    }
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  };

  onMounted(() => {
    // Initial check
    updateDarkMode();

    // Add media query listener
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', updateDarkMode);
  });

  onUnmounted(() => {
    // Clean up listener
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.removeEventListener('change', updateDarkMode);
  });

  return { isDarkMode, toggleDarkMode };
}