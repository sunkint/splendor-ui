export default function clickBody(e?: MouseEvent) {
  document.body.dispatchEvent(
    new MouseEvent('click', {
      clientX: e?.clientX || 0,
      clientY: e?.clientY || 0,
      bubbles: true,
    })
  );
}
