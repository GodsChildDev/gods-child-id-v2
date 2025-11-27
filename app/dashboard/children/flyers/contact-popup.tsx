import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { X } from "lucide-react";
import './contact-popup.css';
import { Input } from '@/components/ui/input';
import Link from '@/node_modules/next/link';

export default function ContactPopup({ show, handleClose, type, value }: {
  show: boolean;
  handleClose: (type: 'email' | 'text' | undefined, value: string | undefined) => void;
  type: 'email' | 'text';
  value: string;
}) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [sendValue, setSendValue] = useState(value);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (show) {
        setSendValue(value);
        if (type === 'email') {
          setHasChecked(true);
        }
      }
    }
    fetchData();
  }, [show, hasChecked]);

  const yes = () => {
    setHasChecked(false);
    handleClose(type, sendValue);
  }

  const no = () => {
    setHasChecked(false);
    handleClose(undefined, undefined);
  }

  const toClose = () => {
    setHasChecked(false);
    handleClose(undefined, undefined);
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{ display: 'inline-flex', width: '100%', borderBottom: 'thin solid slateblue' }}>
          <h1 style={{ padding: '10px 1px', flex: 1, color: 'midnightblue', fontWeight: 700 }}>
            {type === 'email' ? "EMAIL FLYER" : "TEXT FLYER"}
          </h1>
          <Button size="icon" style={{ background: 'transparent', color: 'black' }}
            onClick={toClose}><X /></Button>
        </div>
        <br /><br />
        <Input className='w-100' type="text" value={sendValue} onChange={(e) => setSendValue(e.target.value)} />
        {type === 'text' &&
          <div>
            <h3 style={{ color: 'black', fontWeight: 100, fontStyle: 'italic' }}>You are requesting a link of the generated flyer of your child or loved one to be texted to the entered recipient above from God&apos;s Child Id <b>(984) 230-9387</b>. 
              Message and data rates may apply. This is a one time message. Do you agree with these conditions? See our
              &nbsp;<Link href="https://gods-child-id.vercel.app/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                Terms of Service
              </Link> &nbsp; and &nbsp;
              <Link href="https://gods-child-id.vercel.app/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
              &nbsp;.</h3>
            <br />
            <div style={{ display: 'inline-flex', textAlign: 'left', width: '100%' }}>
              <Input type={"checkbox"} style={{ marginTop: '-5px', transform: 'scale(0.65)', width: '30px', marginRight: '10px', cursor: 'pointer' }}
                checked={hasChecked} onChange={e => setHasChecked(e.target.checked)} />
              <label style={{ color: 'black', flex: 1 }}>I agree</label>
            </div>
          </div>
        }
        <br /><br />
        <div style={{ float: 'right', display: 'flex', gap: '5px' }}>
          <Button variant="outline" onClick={yes} disabled={!hasChecked}
          style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
            Send
          </Button>
          <Button variant="outline" onClick={no} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
            Cancel
          </Button>
        </div>
      </section>
    </div>
  );
}