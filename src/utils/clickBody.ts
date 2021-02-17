export default function clickBody(e: MouseEvent) {
  document.body.dispatchEvent(
    new MouseEvent('click', {
      clientX: e.clientX,
      clientY: e.clientY,
      bubbles: true,
    })
  );
}
