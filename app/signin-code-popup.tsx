import React, { useEffect, useState } from 'react';
import './signup-code-popup.css';
import { Input } from '@/components/ui/input';
import { setBlockTimestamp } from '@/data/getSignupCodes';
import { RotateCcw, Mail, Twitch } from 'lucide-react';
import { generateSigninCode, hideContactInfo } from '@/lib/utils';
import { sendEmail2, sendtext } from '@/lib/notifications';
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

export default function SignInCodePopup({ phone, email, show, handleClose }: {
  phone: string;
  email: string;
  show: boolean;
  handleClose: () => void;
}) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const initialTimeInSeconds = 5 * 60; // 5 minutes
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  const [hasError, setHasError] = useState(false);
  const [expectedCode, setExpectedCode] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('Email');
  const [tries, setTries] = useState(3);
  const {signOut} = useClerk();


  useEffect(() => {
    if (type?.length) {
      setHasError(false);
      const c = generateSigninCode();
      setExpectedCode(c);
      if (type === 'Email') {
        sendtext(`Your God's Child Id sign-in verification code is ${c}.`, phone);
      } else {
        sendEmail2(email, `God's Child Id Signin Code`, `Your God's Child Id sign-in verification code is ${c}.`);
      }
    }
  }, [type]);

  useEffect(() => {
    if (!show) {
      setCode('');
      setType('');
    } else {
      setTries(3);
      setType('Email');
      setTimeLeft(initialTimeInSeconds);
    }
  }, [show]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return; 
    }
    const interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const resendCode = async () => {
    setTimeLeft(initialTimeInSeconds);
    setHasError(false);
    const c = generateSigninCode();
    setExpectedCode(c);
    if (type === 'Email') {
      sendtext(`Your God's Child Id sign-in verification code is ${c}.`, phone);
    } else {
      sendEmail2(email, `God's Child Id Signin Code`, `Your God's Child Id sign-in verification code is ${c}.`);
    }
  };

  const formatTime = (totalSeconds: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // const toClose = () => {
  //   handleClose();
  // }

  const switchType = () => {
    setType(type === 'Text' ? 'Email' : 'Text');
  }

  const inputChange = async (e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const v = e.target.value;
    setCode(v);
    if (v?.length === 6) {
      console.log('v: ' + v);
      console.log('code: ' + expectedCode);
      if (v === expectedCode) {
        setCode('');
        sessionStorage.setItem('signIn', '');
        toast.success('Signin Complete!', {style: {backgroundColor: "green", color: 'yellowgreen'}});
        handleClose();
        // sign in
      } else {
        setTimeLeft(initialTimeInSeconds);
        setHasError(true);
        setTries(tries - 1);
        if (tries - 1 === 0) {
          setCode('');
          await setBlockTimestamp();
          sessionStorage.setItem('signIn', '');
          toast.error('User blocked for an hour', {style: {backgroundColor: "red"}});
          signOut({ redirectUrl: '/' });
          handleClose();
          // sign out
        }
      }
    } else {
      setHasError(false);
    }
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{ display: 'inline-flex', width: '100%', borderBottom: 'thin solid slateblue' }}>
          <h1 style={{ padding: '10px 1px', flex: 1, color: 'midnightblue', fontWeight: 700 }}>
            SIGN-IN VERIFICATION
          </h1>
          {/* <Button size="icon" style={{ background: 'transparent', color: 'black' }}
            onClick={toClose}><X /></Button> */}
        </div>
        <br /><br />
        <h2 style={{ color: 'black' }}>Please enter the 6-digit code sent to &nbsp;
          {type === 'Text' ? hideContactInfo('Email', email) : hideContactInfo('Text', phone)}.</h2>
        <h2 style={{ color: 'black', fontStyle: 'italic' }}>This code expires in {formatTime(timeLeft)} minutes.</h2>
        <br />
        {hasError && <span style={{ color: 'red' }}>Code invalid. You have {tries} tries left for an hour.</span>}
        <Input className='w-100' style={{ color: 'black' }} type="text" value={code} onChange={inputChange} disabled={timeLeft < 1} autoFocus={true} />
        <br />
        <div style={{ display: 'inline-flex', cursor: 'pointer', paddingBottom: '10px' }} onClick={switchType}>
          {type === 'Text' ? <Twitch color={'black'} size={20} /> : <Mail color={'black'} size={20} />}&nbsp;&nbsp;
          <h3 style={{ fontWeight: 100, fontStyle: 'italic', color: 'blue', textDecoration: 'underline' }}>
            {type} new code
          </h3></div>
        <br />
        <div style={{ display: 'inline-flex', cursor: 'pointer' }} onClick={resendCode}>
          <RotateCcw color={'black'} size={20} />&nbsp;&nbsp;
          <h3 style={{ fontWeight: 100, fontStyle: 'italic', color: 'blue', textDecoration: 'underline' }}>
            Send new code
          </h3></div>
      </section>
    </div>
  );
}
