import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { X } from "lucide-react";
import './signup-code-popup.css';
import { Input } from '@/components/ui/input';
import { isValidSignupCode } from '@/data/getSignupCodes';
import Link from '@/node_modules/next/link';

export default function SignupCodePopup({ show, complete, handleClose }: {
  show: boolean;
  complete: () => void;
  handleClose: () => void;
}) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [hasError, setHasError] = useState(false);
  const [code, setCode] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => { }, [show, hasChecked]);

  const yes = async () => {
    const isValid = await isValidSignupCode(code);
    setHasError(!isValid);
    setCode(isValid ? 'true' : '');
    if (isValid) {
      sessionStorage.setItem('signupCode', code);
      complete();
      setHasChecked(false);
      handleClose();
    }
  }

  const no = () => {
    setHasError(false);
    setHasChecked(false);
    handleClose();
  }

  const toClose = () => {
    setHasChecked(false);
    handleClose();
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{ display: 'inline-flex', width: '100%', borderBottom: 'thin solid slateblue' }}>
          <h1 style={{ padding: '10px 1px', flex: 1, color: 'midnightblue', fontWeight: 700 }}>
            SIGNUP CODE
          </h1>
          <Button size="icon" style={{ background: 'transparent', color: 'black' }}
            onClick={toClose}><X /></Button>
        </div>
        <br /><br />
        <h2 style={{ color: 'black' }}>Please enter your signup code. Once verified, you may continue signing up</h2>
        <br />
        {hasError && <span style={{ color: 'red' }}>Code invalid</span>}
        <Input className='w-100' style={{ color: 'black' }} type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        <br />
        <h3 style={{ color: 'black', fontWeight: 100, fontStyle: 'italic' }}>By submitting this form, you agree to receive one-time passcodes via SMS from God&apos;s Child Id for authentication purposes. Message and data rates may apply. Message frequency varies. Reply STOP to opt out. See our 
        &nbsp;<Link href="https://gods-child-id.vercel.app/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline'}}>
          Terms of Service
        </Link> &nbsp; and &nbsp;
        <Link href="https://gods-child-id.vercel.app/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline'}}>
          Privacy Policy
        </Link>
        &nbsp;.</h3>
        <br />
        <div style={{display: 'inline-flex', textAlign: 'left', width: '100%'}}>
          <Input type={"checkbox"} style={{ marginTop: '-5px', transform: 'scale(0.65)', width: '30px', marginRight: '10px', cursor: 'pointer' }}
            checked={hasChecked} onChange={e => setHasChecked(e.target.checked)} />
          <label style={{ color: 'black', flex: 1 }}>I agree</label>
        </div>
        <br /><br />
        <div style={{ float: 'right', display: 'flex', gap: '5px' }}>
          <Button variant="outline" onClick={yes} disabled={!hasChecked}
            style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
            Verify
          </Button>
          <Button variant="outline" onClick={no} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
            Close
          </Button>
        </div>
      </section>
    </div>
  );
}
