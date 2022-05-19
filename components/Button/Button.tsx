import Link from 'next/link';

interface ButtonProps {
  link: string;
  text: string;
}

const Button = (props: ButtonProps) => {
  return (
    <Link href={props.link}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        {props.text}
      </button>
    </Link>
  );
};

export default Button;
