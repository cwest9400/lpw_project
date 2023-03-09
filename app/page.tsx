'use client'
import Image from 'next/image'
import useState from 'react-usestateref'
import userPic from'../public/user.webp';
import botPic from '../public/bot.png';
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


export default function Home() {
  return (
    <main className='styles.main'>
      
    </main>
  )
}
