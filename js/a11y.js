(function () {
  'use strict';

  var html = document.documentElement;

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { }
  }

  function setTextSize(level) {
    html.classList.remove('text-size-2', 'text-size-3');
    if (level !== '1') html.classList.add('text-size-' + level);
    document.querySelectorAll('[data-text-size]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-text-size') === level));
    });
  }

  function setHighContrast(enabled) {
    html.classList.toggle('high-contrast', enabled);
    document.querySelectorAll('[data-contrast-toggle]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(enabled));
    });
  }

  setTextSize(html.classList.contains('text-size-3') ? '3' : html.classList.contains('text-size-2') ? '2' : '1');
  setHighContrast(html.classList.contains('high-contrast'));

  document.addEventListener('click', function (e) {
    var sizeButton = e.target.closest('[data-text-size]');
    if (sizeButton) {
      var level = sizeButton.getAttribute('data-text-size');
      setTextSize(level);
      save('as-text-size', level);
      return;
    }
    if (e.target.closest('[data-contrast-toggle]')) {
      var enabled = !html.classList.contains('high-contrast');
      setHighContrast(enabled);
      save('as-high-contrast', enabled ? '1' : '0');
    }
  });
})();
