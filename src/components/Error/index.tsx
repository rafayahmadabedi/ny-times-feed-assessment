import './styles.css';

export type ErrorProps = {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="error">
      <p className="error__message">{message}</p>
    </div>
  );
};

export default Error;