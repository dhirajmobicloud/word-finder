function Button({ icon, text, ...rest }) {
  return (
    <button {...rest}>
      {icon}
      {text}
    </button>
  );
}

export default Button;
