"use client";
import Image from "next/image";
import useState from "react-usestateref";
// import userPic from'../public/user.webp';
// import botPic from '../public/bot.png';
import styles from "./page.module.css";

enum Creator {
  Me = 0,
  Bot = 1,
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

const ChatMessage = ({ text, from }: MessageProps) => {
  return (
    <>
      {from == Creator.Me && (
        <div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          {/* <Image src={userPic} alt="User" width={40} /> */}
          <p className="text-gray-700">{text}</p>
        </div>
      )}
      {from == Creator.Bot && (
        <div className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </>
  );
};
//chat input field
const ChatInput = ({ onSend, disabled }: InputProps) => {
  const [input, setInput] = useState("");

  const sendInput = () => {
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      sendInput();
    }
  };

  return (
    <div className="bg-white border-2 p-2 rounded-lg flex justify-center">
      <input
        value={input}
        onChange={(ev: any) => setInput(ev.target.value)}
        className="w-full py-2 px-3 text-gray-800 rounded-lg focus:outline-none"
        type="text"
        placeholder="ask me anything"
        disabled={disabled}
        onKeyDown={(ev) => handleKeyDown(ev)}
      />
    </div>
  );
};

export default function Home() {
  const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (input: string) => {
    setLoading(true);

    const myMessage: MessageProps = {
      text: input,
      from: Creator.Me,
      key: new Date().getTime()
    };

    setMessages([...messagesRef.current, myMessage])
    const response = await fetch('/api/generate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        prompt:input
      })
    }).then((response) => response.json());
    setLoading(false);

    if (response.text) {
      const botMessage: MessageProps = {
        text: response.text,
        from: Creator.Bot,
        key: new Date().getTime()
      };
      setMessages([...messagesRef.current, botMessage]);
    } else {
      //show error
    }
  }

  return (
    <main className="relative max-w-2xl mx-auto">
      <div className="sticky top-0 w-full pt-10 px-4">
        <ChatInput onSend={(input)=> callApi(input)} disabled={loading}/>
      </div>
      <div className="mt-10 px-4">
        {messages.map((mesg: MessageProps)=> (
          <ChatMessage key={mesg.key} text={mesg.text} from={mesg.from} />
        ))}
        {messages.length == 0 && <p className="text-center text-gray-400">I am at your service</p>}
      </div>
    </main>

    )
}
