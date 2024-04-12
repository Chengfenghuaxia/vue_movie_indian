import { onUnmounted } from 'vue';

export default {
  mounted(el, binding) {
    const handler = (event) => {
      if (!el.contains(event.target)) {
        binding.value();
      }
    };

    document.addEventListener('click', handler);

    onUnmounted(() => {
      document.removeEventListener('click', handler);
    });
  }
};