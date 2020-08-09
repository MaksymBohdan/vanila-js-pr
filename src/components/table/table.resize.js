import { $ } from '@core/dom';

export function resizeHandler(event, $root) {
  return new Promise((resolve) => {
    const resize = event.target.dataset.resize;

    const $resizer = $(event.target);
    /* bad in case of html structure changing
     const $parent = $resizer.$el.parentNode;
    */
    const $parent = $resizer.closest('[data-type="resizable"]');
    const parentCoords = $parent.getCoords();

    let newWidthValue;
    let newHeightValue;

    const sideProp = resize === 'col' ? 'bottom' : 'right';
    $resizer.css({ opacity: 1, [sideProp]: '-2000px' });

    document.onmousemove = (e) => {
      e.preventDefault();

      if (resize === 'col') {
        const delta = e.pageX - parentCoords.right;
        newWidthValue = parentCoords.width + delta;

        $resizer.css({ right: -delta + 'px' });
      }

      if (resize === 'row') {
        const delta = e.pageY - parentCoords.bottom;
        newHeightValue = parentCoords.height + delta;

        $resizer.css({ bottom: -delta + 'px' });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (resize === 'col') {
        $root
          .findAll(`[data-col="${$parent.dataset.col}"]`)
          .forEach((col) => (col.style.width = newWidthValue + 'px'));

        $parent.css({ width: newWidthValue + 'px' });
      }

      if (resize === 'row') {
        $parent.css({ height: newHeightValue + 'px' });
      }

      $resizer.css({ opacity: 0, bottom: '0', right: '0' });

      resolve({
        id: resize === 'col' ? $parent.dataset.col : '',
        value: newWidthValue,
      });
    };
  });
}
