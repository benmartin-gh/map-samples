import Link from 'next/link';

type ButtonType = 'red' | 'blue';

interface ButtonProps {
  link: string;
  text: string;
  type?: ButtonType;
  data?: any;
}

const Button = ({ type = 'blue', link, text, data = '' }: ButtonProps) => {
  return (
    <Link
      href={{
        pathname: link,
        query: data,
      }}>
      <button className={`button-style-${type}`}>{text}</button>
    </Link>
  );
};

export default Button;
