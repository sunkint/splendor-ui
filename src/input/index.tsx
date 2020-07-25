import { defineComponent, FunctionalComponent } from 'vue';
import './index.scss';

export interface InputProps {
  type?: string;
  maxlength?: number;
  placeholder?: string;
  hasError?: boolean;
}

const Input: FunctionalComponent<InputProps> = defineComponent((props) => {
  const { hasError = false, type = 'text', maxlength, placeholder } = props;
  return () => (
    <div class="sk-input-wrapper">
      <input
        class={['sk-input', { 'has-error': hasError }]}
        type={type}
        maxlength={maxlength}
        placeholder={placeholder}
      />
    </div>
  );
});

export default Input;
