import { defineComponent, renderSlot } from 'vue';
import Clipboard from 'clipboard';
import './index.scss';

const CopyLink = defineComponent({
  name: 'sk-copy-link',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    copy() {
      const e = document.createElement('button');
      const clipboard = new Clipboard(e, {
        text: () => this.text,
      });
      clipboard.on('success', () => {
        this.$emit('success');
      });
      clipboard.on('error', () => {
        this.$emit('error');
      });
      e.click();
    },
  },
  render() {
    const { $slots, text, copy } = this;
    if ($slots.default) {
      return renderSlot($slots, 'default', { copy });
    }
    return (
      <a class="sk-copy-link" data-copy={text} onClick={copy}>
        复制
      </a>
    );
  },
});

export default CopyLink;
