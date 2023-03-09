'use client'
import Image from 'next/image'
import useState from 'react-usestateref'
// import userPic from'../public/user.webp';
// import botPic from '../public/bot.png';
import styles from './page.module.css';

enum Creator {
  Me = 0,
  Bot = 1
}

interface MessageProps {
  text: string;
  from: Creator;
  key: number;
}

interface InputProps {
  onSend: (input: string) => void;
  disabled: boolean;
}

const ChatMessage = ({ text, from}: MessageProps) => {
  return (
    <>
    {from == Creator.Me && (
      <div className='bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap'>
        {/* <Image src={userPic} alt="User" width={40} /> */}
        <p className='text-gray-700'>{text}</p>
      </div>
    )}
    {from == Creator.Bot && (
      <div className='bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap'>
        <p className='text-gray-700'>{text}</p>
      </div>
    )}
    </>
  )
}
//chat input field
const ChatInput = ({ onSend, disabled }: InputProps) => {
  const [input, setInput] = useState('');

  const sendInput = () => {
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (event:any) => {
    if (event.keyCode === 13) {
      sendInput();
    }
  };

  return (
    
  )
}

export default function Home() {
  return (
    <main className='styles.main'>
      
    </main>
  )
}
